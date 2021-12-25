<template>
  <div class="video-editor-components-picture" v-loading="isLoading">
    <el-tabs v-model="current_picture_wrp">
      <el-tab-pane label="个人中心" name="user">
        <div class="search-box">
          <el-radio-group v-model='queryForm1.type' @change='getVideoImgList' style='margin: 12px 0'>
            <el-radio-button label='1'>历史上传</el-radio-button>
            <el-radio-button label='2'>历史收藏</el-radio-button>
          </el-radio-group>
          <el-input
            class="search-input"
            placeholder="关键字搜索素材"
            prefix-icon="el-icon-search"
            v-model="queryForm1.search"
            @keyup.enter.native="getVideoImgList"
            @clear="getVideoImgList"
            clearable
          ></el-input>
        </div>
        <div class="wrapper">
          <template v-if="imageData.length">
            <el-scrollbar style="height: 100%">
              <div class="wrapper-content-scroll">
                <MaterialItem
                  v-for="item in imageData"
                  :key="item.id"
                  :filename="item.fileName"
                  :thumbnail="item.coverUrl || item.sourceUrl"
                  can-remove
                  @click="insertData(item)"
                  @remove="removeImage(item)"
                />
              </div>
            </el-scrollbar>
          </template>
          <div v-if="!imageData.length" style="padding: 50px 0;text-align: center;color: #999;width: 100%">
            暂无数据
          </div>
        </div>

        <div class="bottom-box">
          <el-pagination
            :page-size="queryForm1.pageSize"
            :current-page.sync="queryForm1.pageIndex"
            :total="total1"
            style="text-align: center;padding-top: 19px" background small
            layout="prev, pager, next"
            @current-change="getVideoImgList"
          ></el-pagination>

          <div class="upload-button" style="clear: both">
            <div class="button-text" @click="upload">
              上传文件
            </div>
            <div class="button-des">
              支持格式：JPG、PNG
            </div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="公共素材" name="public">
        <div class="search-box">
          <el-radio-group v-model='queryForm.type' @change='getCommonPic' style='margin: 12px 0'>
            <el-radio-button label='1'>总部海报</el-radio-button>
            <el-radio-button label='2'>总部KV</el-radio-button>
          </el-radio-group>
          <el-input
            class="search-input"
            placeholder="关键字搜索素材"
            prefix-icon="el-icon-search"
            v-model="queryForm.search"
            @keyup.enter.native="getCommonPic"
            @clear="getCommonPic"
            clearable
          ></el-input>
        </div>
        <div class="wrapper">
          <template v-if="publicResources.length">
            <el-scrollbar style="height: 100%">
              <div class="wrapper-content-scroll">
                <MaterialItem
                  v-for="item in publicResources"
                  :key="item.id"
                  :filename="item.fileName"
                  :thumbnail="item.coverUrl || item.sourceUrl"
                  @click="insertData(item)"
                />
              </div>
            </el-scrollbar>
          </template>
          <div v-if="!publicResources.length" style="padding: 50px 0;text-align: center;color: #999;width: 100%">
            暂无数据
          </div>
        </div>

        <div class="bottom-box">
          <el-pagination
            :page-size="queryForm.pageSize"
            :current-page.sync="queryForm.pageIndex"
            :total="total"
            style="text-align: center;padding-top: 19px" background small
            layout="prev, pager, next"
            @current-change="getCommonPic"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    <Upload ref="upload" uploadType="picture" @saveSuccess='getVideoImgList'></Upload>
  </div>
</template>

<script>
import Upload from '@/components/DistributorUpload/index'
import {createUUID} from "@/utils"
import MaterialItem from "@/views/video/components/MaterialItem"

export default {
  components: {
    Upload,
    MaterialItem,
  },
  data() {
    return {
      isLoading: false,
      current_picture_wrp: 'user',
      imageData: [],
      publicResources: [],
      queryForm: {
        type: '1',
        status: 1,
        pageIndex: 1,
        search: '',
        pageSize: 10
      },
      search: null,
      queryForm1: {
        userId: localStorage.getItem('id'),
        search: null,
        pageIndex: 1,
        pageSize: 10,
        type: '1',
      },
      total: 0,
      total1: 0
    }
  },
  created() {
    this.getVideoImgList()
    this.getCommonPic()
  },

  methods: {
    upload() {
      this.$refs.upload.dialogVisible = true
    },
    getVideoImgList() {
      this.isLoading = true
      this.$http.H5GetImgListUser(this.queryForm1).then(res => {
        this.isLoading = false
        if (res.status === 200) {
          this.imageData = res.data.list
          this.total1 = res.data.total
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },

    // 获取公共图片
    getCommonPic() {
      this.isLoading = true
      this.$http.H5GetImgListCommon(this.queryForm).then(res => {
        this.isLoading = false
        this.publicResources = res.data.list
        this.total = res.data.total
      })
    },

    insertData(imageData) {
      // 若图片大小大于视频尺寸，需要进行缩放
      let width = +imageData.pictureWidth
      let height = +imageData.pictureHeight
      const videoWidth = this.$store.state.video.width
      if (width > videoWidth) {
        height = videoWidth * height / width
        width = videoWidth
      }

      this.$store.dispatch('INSERT_MEDIA', {
        type: 'image',
        data: {
          uuid: createUUID(),
          fileName: imageData.fileName,
          source: imageData.coverUrl || imageData.sourceUrl,
          path: imageData.absolutelyUrl,
          startTime: this.$store.state.video.currentPlaybackPosition,
          endTime: this.$store.state.video.currentPlaybackPosition + 10,
          // 图片在视频中显示的位置及大小
          left: 0,
          top: 0,
          width: width,
          height: height,
        },
      })
    },

    removeImage(image) {
      this.$http.DelteUserInfo({ id: image.id }).then(res => {
        if (res.status === 200) {
          this.$message.success('删除成功')
          this.getVideoImgList()
        } else {
          this.$message.error(res.message)
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
.search-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search-input {
  width: 200px;
}

.wrapper {
  height: calc(100% - 144px);
  .wrapper-content-scroll {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    //overflow-y: scroll;
  }
}

.wrapper:after {
  content: '';
  flex: auto;
}

.bottom-box {
  position: relative;
  height: 64px;
  margin-top: 30px;
  padding-bottom: 18px;
}

.upload-button {
  width: 250px;
  position: absolute;
  top: 0;
}

.button-text {
  background: #ecf5ff;
  width: 98px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  color: #1989fa;
  font-size: 14px;
  border: 1px solid #a3d0fd;
  border-radius: 3px;
}

.button-des {
  margin-top: 10px;
  font-size: 12px;
  font-weight: 500;
  line-height: 22px;
  color: #bababa;
  opacity: 1;
}
</style>

<style lang="less">
@import '../css/tab.less';
</style>
