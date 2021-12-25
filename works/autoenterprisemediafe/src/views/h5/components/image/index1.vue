<template>
  <div style="padding: 20px 10px">
    <el-tabs v-model="activeName">
      <el-tab-pane label="个人中心" name="first">
        <div class="wrapper">
          <el-input placeholder="关键字搜索素材" prefix-icon="el-icon-search" v-model="queryForm1.search"
          @keyup.enter.native="serchImgs()"   clearable></el-input>
           <div v-for="items in imageList" class="item_wrapper" v-if="imageList.length">

                     <div class="img_item">
                      <img class="delect_icon" src="https://iit.axiwenhua.cn/gtb/files/posterPictureKV/2021/04/23/c5e1a5690d9d4eecaca88c6a659c65ea.png" style="width: 14px; height: 14px;"  @click="deleteImg(items)"/>
                       <img class="img_r" :src="items.sourceUrl" alt="" @click="handleClick(items, items.sourceUrl)" />
                     </div>

                   </div>
          <div v-if="!imageList.length" style="padding: 50px 0;text-align: center;color: #999;width: 100%">暂无数据</div>

          <el-pagination background small  layout="prev, pager, next"
                         @current-change="userpageChange"
            :page-size="queryForm1.pageSize" :total="total1">
          </el-pagination>
        </div>

                  <div class="upload-button" style="clear: both">
                    <div class="button-text" @click="upload">
                      上传文件
                    </div>
                    <div class="button-des">
                      文件拓展名：jpg，PNG
                    </div>
                  </div>
      </el-tab-pane>
      <el-tab-pane label="公共素材" name="second">
        <div class="wrapper">
          <el-input v-if="imageList1.length" placeholder="关键字搜索素材" prefix-icon="el-icon-search"></el-input>
          <div v-for="items in imageList1" class="item_wrapper" v-if="imageList1.length">
            <img :src="items.sourceUrl" alt="" @click="handleClick(items, items.sourceUrl)"
                 style="display: block;width: 100%;height: 100%">
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
    <Upload ref="upload" uploadType="picture"></Upload>
  </div>
</template>

<script>
import {
  getImageData
} from './image'
import {
  camelCase
} from 'lodash'
import {
  _qk_register_components_object
} from '@client/plugins/index'
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
        type: 1,
        status: 1,
        pageIndex: 1,
        pageSize: 10
      },
      search: null,
      queryForm1: {
        userId: localStorage.getItem('id'),
        search: null,
        pageIndex: 1,
        pageSize: 10
      },
      total: 100,
      total1: 100
    }
  },
  created() {
    this.getUserImgList()
    this.getCommonPic()
  },
  methods: {
    upload() {
      this.$refs.upload.dialogVisible = true
    },
    handleClick(item, imageSrc) {
      const props = this.getComponentProps(item.elName)
      const obj = {
        ...props,
        imageSrc: item.sourceUrl
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
      console.log('val:' + JSON.stringify(val))
      const data = { id: val.id }
      this.$http.DelteUserInfo({ data }).then(res => {
        this.getUserImgList()
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
        padding: 4px;
        width: 140px;
        height: 202px;
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
        margin-bottom: 20px;
      }
    }

  .item_wrapper1 {}

  .button-text {
    background: #D3D4D6;
    width: 98px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    color: #909399;
    font-size: 14px;
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
</style>
