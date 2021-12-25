<template>
  <div style="padding: 20px 10px; height: 100%">
    <el-scrollbar style='height: 100%'>
      <el-tabs v-model="activeName">
        <el-tab-pane label="个人中心" name="first">
          <div class="wrapper">
            <el-radio-group v-model='queryForm1.type' @change='serchImgs' style='margin: 12px 0'>
              <el-radio-button label='1'>历史上传</el-radio-button>
              <el-radio-button label='2'>历史收藏</el-radio-button>
            </el-radio-group>
            <el-input placeholder="关键字搜索素材" prefix-icon="el-icon-search" v-model="queryForm1.search"
                      @keyup.enter.native="serchImgs" clearable @clear='serchImgs'
                      style='width: 248px;'
            ></el-input>
            <div v-for="items in imageList" class="item_wrapper" v-if="imageList.length">

              <div class="img_item">
                <img v-if="queryForm1.type === '1'" class="delect_icon" src="https://iit.axiwenhua.cn/gtb/files/posterPictureKV/2021/04/23/c5e1a5690d9d4eecaca88c6a659c65ea.png" style="width: 14px; height: 14px;"  @click="deleteImg(items)"/>
                <img class="img_r" :src="getImageUrl(items)" alt="" @click="handleClick(items)" />
              </div>
              <p class="text-center">{{items.fileName}}</p>
            </div>
            <div v-if="!imageList.length" style="padding: 50px 0;text-align: center;color: #999;width: 100%">暂无数据</div>

          </div>
          <div class="upload-button" style="clear: both">
            <el-pagination style="text-align: center;padding-top: 30px" background small  layout="prev, pager, next"
                           @current-change="userpageChange"
                           :page-size="queryForm1.pageSize" :total="total1">
            </el-pagination>

            <el-button type='primary' @click='upload' style='margin-top: 12px;'>上传图片</el-button>
            <div class="button-des">
              文件拓展名：jpg，png
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="公共素材" name="second">
          <div class="wrapper">
            <el-radio-group v-model='queryForm.type' @change='serchCommentImgs' style='margin: 12px 0'>
              <el-radio-button label='1'>总部海报</el-radio-button>
              <el-radio-button label='2'>总部KV</el-radio-button>
            </el-radio-group>
            <el-input  placeholder="关键字搜索素材" v-model="queryForm.search"
                       @keyup.enter.native="serchCommentImgs" prefix-icon="el-icon-search"
                       clearable @clear='serchCommentImgs' style='width: 248px'
            ></el-input>

            <div v-for="items in imageList1" class="item_wrapper" v-if="imageList1.length">
              <div class="img_item">
                <img class="img_r" :src="getImageUrl(items)" alt="" @click="handleClick(items)" />
              </div>
              <p class="text-center">{{items.fileName}}</p>
            </div>
          </div>
          <div v-if="!imageList1.length" style="padding: 50px 0;text-align: center;color: #999;width: 100%">暂无数据</div>
          <el-pagination style="text-align: center;padding-top: 30px" background small
                         layout="prev, pager, next" @current-change="pageChange"
                         :page-size="queryForm.pageSize" :total="total">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-scrollbar>

    <Upload ref="upload"
            uploadType="picture"
            @saveSuccess='getUserImgList'
    ></Upload>
  </div>
</template>

<script>
import { getImageData } from './image'
import { camelCase } from 'lodash'
import { _qk_register_components_object } from '@client/plugins/index'
import Upload from '@/components/DistributorUpload/index'

window._qk_register_components_object = _qk_register_components_object

export default {
  components: {
    Upload
  },
  data() {
    return {
      activeName: 'first',
      imageList: [],
      imageList1: [],
      queryForm: {
        type: '1',
        status: '1',
        pageIndex: 1,
        search: null,
        pageSize: 10,
      },
      search: null,
      queryForm1: {
        userId: localStorage.getItem('id'),
        type: '1',
        search: null,
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      total1: 0,
    }
  },
  created() {
    this.getUserImgList()
    this.getCommonPic()
  },
  computed: {
    projectData() {
      return this.$store.state.editor.projectData
    },
  },
  methods: {
    getImageUrl(item) {
      const ext = item.sourceUrl.split('.').pop().toLowerCase()
      if (ext === 'jpg' || ext === 'png') {
        return item.sourceUrl
      }
      return item.coverUrl
    },
    upload() {
      this.$refs.upload.dialogVisible = true
    },
    handleClick(item) {
      let imageWidth = +item.pictureWidth
      let imageHeight = +item.pictureHeight
      const canvasWidth = this.projectData.width

      if (imageWidth > canvasWidth) {
        imageHeight = canvasWidth * imageHeight / imageWidth
        imageWidth = canvasWidth
      }

      if (item.pictureHeight) {
        item.defaultStyle.height = imageHeight
      }
      if (item.pictureWidth) {
        item.defaultStyle.width = imageWidth
      }
      const props = this.getComponentProps(item.elName)
      const obj = {
        ...props,
        imageSrc: this.getImageUrl(item),
      }
      this.$store.dispatch('addElement', {
        ...item,
        needProps: obj
      })
    },
    /**
       * 网络请求图片列表
       */
    serchImgs() {
      this.getUserImgList()
    },

    serchCommentImgs() {
      this.getCommonPic()
    },
    getUserImgList() {
      this.$http.H5GetImgListUser(this.queryForm1).then(res => {
        if (res.status === 200) {
          this.imageList = getImageData(res.data.list)
          this.total1 = res.data.total
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    deleteImg(val) {
      const data = { id: val.id }
      this.$http.DelteUserInfo(data).then(res => {
        if (res.status === 200) {
          this.$message.success('删除成功')
          this.getUserImgList()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 个人图片分页
    userpageChange(res) {
      this.queryForm1.pageIndex = res
      this.getUserImgList()
    },

    // 获取公共图片
    getCommonPic() {
      this.$http.H5GetImgListCommon(this.queryForm).then(res => {
        this.imageList1 = getImageData(res.data.list)
        this.total = res.data.total
      })
    },

    // 公共图片分页
    pageChange(res) {
      this.queryForm.pageIndex = res
      this.getCommonPic()
    },

    /**
       * 根据elname获取组件默认props数据
       * @param elName
       */
    getComponentProps(elName) {
      let elComponentData
      for (const key in _qk_register_components_object) {
        if (key.toLowerCase() === camelCase(elName).toLowerCase()) {
          elComponentData = _qk_register_components_object[key]
          break
        }
      }
      console.log(elComponentData)
      if (!elComponentData) return {}

      const props = {}
      for (const key in elComponentData.props) {
        props[key] = [Object, Array].includes(elComponentData.props[key].type) ? elComponentData.props[key]
          .default() : elComponentData.props[key].default
      }
      return props
    }
  }
}
</script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    flex-wrap: wrap;

    .img_item {
      position: relative;
      border: 1px solid #F5F5F5;
      width: 120px;
      height: 190px;
    }

    .delect_icon {
      position: absolute;
      top: 6px;
      left: 6px;
      z-index: 2;
    }

    .img_r {
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);
    }

    .item_wrapper {
      margin-top: 10px;
      width: 50%;
    }
  }


  .button-des {
    margin-top: 20px;
    // color: #909399;

    font-size: 12px;
    font-family: MHeiPRC;
    font-weight: 500;
    line-height: 22px;
    color: #BABABA;
    opacity: 1;
  }
  .text-center{
    margin-top:10px;
    font-size: 12px;
    font-family: MHeiPRC;
    font-weight: 500;
    line-height: 22px;
    color: #606266;
    opacity: 1;
  }
  .upload-button{
    margin-top: 20px;
  }
</style>
