<template>
  <el-dialog
    title="内容选择"
    :visible.sync="dialogVisible"
    @closed='onDialogClosed'
    width="780px">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%;min-height: 450px">

      <el-table-column align="center" width="100">
        <template slot-scope="scope">
          <div class="img-prev">
            <video v-if="uploadType === 'video'" class="attr-column" :src="scope.row.sourceUrl" preload="metadata" type="video/mp4"></video>
            <img v-else class="attr-column" :src="scope.row.sourceUrl" alt='预览' />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="fileName"
        align="center" width="120"
        label="文件名">
          <template slot-scope="scope">
            <el-input  class="fileInput" v-model="scope.row.fileName" placeholder="文件名" ></el-input>
          </template>
      </el-table-column>

      <el-table-column
        prop="typeName"
        label="文件类型">
      </el-table-column>
      <el-table-column
        prop="accountNumber"
        label="上传账号">
      </el-table-column>
      <el-table-column
        prop="uploadData"
        label="上传时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <i class="el-icon-delete" @click="deleteItem(scope.$index)"></i>
        </template>
      </el-table-column>
    </el-table>
    <div
      style="text-align: center;padding-top: 20px;display: flex;justify-content: space-between">
      <div style="display: flex;">
        <el-upload
          v-if="uploadType === 'picture'"
          :action="`${baseUrl}gtb/api/uploadFile`"
          multiple
          :on-success="uploadSuccess"
          :auto-upload="true"
          :show-file-list="false"
          :limit="10">
          <el-button size="small" class="upload-btn-sty" type="primary">上传图片</el-button>
        </el-upload>
        <el-upload
          v-if="uploadType === 'music'"
          :action="`${baseUrl}gtb/api/uploadFile`"
          :on-success="uploadSuccess"
          :auto-upload="true"
          :show-file-list="false"
          :limit="10">
          <el-button type="primary" class="upload-btn-sty">上传音频</el-button>
        </el-upload>
        <el-upload
          v-if="uploadType === 'video'"
          :action="`${baseUrl}gtb/api/uploadFile`"
          :on-success="uploadSuccess"
          :auto-upload="true"
          :show-file-list="false"
          :limit="10">
          <el-button type="primary" class="upload-btn-sty">上传视频</el-button>
        </el-upload>
        <el-button class="upload-btn-sty" @click="tableData = []" :disabled="tableData.length > 0 ? false : true" style="margin-left: 10px">清空</el-button>
      </div>
      <div>
        <el-button class="upload-btn-sty" :disabled="tableData.length > 0 ? false : true" @click="save">开始上传</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import config from '../../ipconfig/index'
import {formatDateString} from '@/utils'
import {buildVideoTemplateFromMetadata} from "@/tools/videoUtils"

export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      baseUrl: config()
    }
  },

  props: {
    uploadType: {
      type: String
    }
  },

  methods: {
    typeName(value) {
      var obj = {
        music: '音频',
        picture: '图片',
        video: '视频'
      }
      return obj[value]
    },
    onDialogClosed() {
      this.tableData = []
    },
    uploadSuccess(res) {
      const data = res.data[0]
      this.tableData.push({
        fileName: null,
        sizeName: '',
        customSize: '',
        typeName: this.typeName(this.uploadType),
        userId: localStorage.getItem('id'),
        accountNumber: localStorage.getItem('accountNumber'),
        coverUrl: this.uploadType === 'picture' ? data.sourceUrl : '',
        templateJson: this.uploadType === 'video' ? buildVideoTemplateFromMetadata('', data.sourceUrl, data.absolutelyUrl, data.pictureWidth, data.pictureHeight, data.duration) : '',
        sourceUrl: data.sourceUrl,
        absolutelyUrl: data.absolutelyUrl,
        role: localStorage.getItem('role'),
        uploadData: formatDateString(new Date()),
        videoTime: this.uploadType === 'video' ? data.duration : '',
        pictureHeight: data.pictureHeight || '',
        pictureWidth: data.pictureWidth || '',
        width: '',
        height: '',
      })
    },
    deleteItem(index) {
      this.tableData.splice(index, 1)
    },

    // 保存
    save() {
      if (!this.tableData.length) {
        return
      }

      // 文件名必填
      const fileNameRequired = this.tableData.reduce((prev, current) => {
        return (!!current.fileName & 1) & prev
      }, 1)
      if (!fileNameRequired) {
        this.$message.error('文件名必填')
        return
      }

      // 文件名不能重复
      const fileNames = this.tableData.map(item => item.fileName)
      if ((new Set(fileNames)).size !== fileNames.length) {
        this.$message.error('文件名不能重复')
        return
      }

      this.$http.SaveWorksInfos({ userWorkJson: this.tableData }).then(resp => {
        console.log(resp)
        if (resp.status === 200) {
          this.$message.success('保存成功!')
          this.dialogVisible = false
          this.$emit('saveSuccess')

        } else {
          this.$message.error(resp.message)
        }
      })
    }
  }
}
</script>

<style scoped>
  /deep/ .el-dialog__body {
    padding-top: 0;
  }

  /deep/ .el-dialog__title {
    font-size: 14px;
  }

    /deep/  thead th {
      background-color: #f7f7f7;
    }

    .upload-btn-sty {
      color: #1989fa;
    background-color: #ecf5ff;
    border-color: #a3d0fd;
    }
    .upload-btn-sty.is-disabled, .upload-btn-sty.is-disabled:focus, .upload-btn-sty.is-disabled:hover {
      color: #D0D0D0;
      cursor: not-allowed;
      background-image: none;
      background-color: #FFF;
      border-color: #EBEEF5;
    }

    /deep/ .el-table__row {
      position: relative;
    }

    /deep/ .el-input__inner {
      background-color: #f6f6f6;
      border: none;
    }

    /deep/ .el-table__body-wrapper {
      height: 410px;
    }



    .img-prev {
      width: 45px;
      height: 45px;
      text-align: center;
      display: flex;
    justify-content: center;
    align-items: center;
    }

      .attr-column {
        width: 45px;
      }

      .attr-column:hover {
          position: absolute;
          top: 0;
          left: 10px;
          width: 200px;
          height: auto;
          z-index: 1;
      }
</style>
