<template>
  <div class="video-editor-components-video" v-loading="isLoading">
    <el-tabs v-model="current_picture_wrp">
      <el-tab-pane label="个人中心" name="user">
        <div class="search-box">
          <el-radio-group v-model='userVideosForm.type' @change='serchUser' style='margin: 12px 0'>
            <el-radio-button label='1'>历史上传</el-radio-button>
            <el-radio-button label='2'>历史收藏</el-radio-button>
          </el-radio-group>
          <el-input
            class="search-input"
            placeholder="关键字搜索素材"
            prefix-icon="el-icon-search"
            v-model="userVideosForm.search"
            @keyup.enter.native="serchUser"
            @clear="serchUser"
            clearable
          ></el-input>
        </div>

        <div class="wrapper">
          <el-scrollbar v-if="userVideoList.length" style="height: 100%">
            <div class="wrapper-content-scroll">
              <MaterialItem
                v-for="item in userVideoList"
                :key="item.id"
                :filename="item.fileName"
                :video="item.sourceUrl"
                can-remove
                @click="itemClick(item)"
                @remove="deleteVideo(item)"
              />
            </div>
          </el-scrollbar>

          <div v-if="!userVideoList.length" style="padding: 50px 0;text-align: center;color: #999;width: 100%">
            暂无数据
          </div>
        </div>

        <div class="bottom-box">
          <el-pagination
            :page-size="userVideosForm.pageSize"
            :current-page.sync="userVideosForm.pageIndex"
            style="text-align: center;padding-top: 19px"
            background
            small
            layout="prev, pager, next"
            :total="userVideoTotal"
            @current-change="serchUser"
          ></el-pagination>

          <div class="upload-button" style="clear: both">
            <div class="button-text" @click="$refs.upload.dialogVisible = true">
              上传文件
            </div>
            <div class="button-des">
              支持格式：MP4
            </div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="公共素材" name="public">
        <div class="search-box">
          <el-radio-group v-model='commonVideosForm.type' @change='getCommonVideo' style='margin: 12px 0'>
            <el-radio-button label='1'>总部</el-radio-button>
            <el-radio-button label='2'>区域</el-radio-button>
          </el-radio-group>
          <el-input
            class="search-input"
            placeholder="关键字搜索素材"
            prefix-icon="el-icon-search"
            v-model="commonVideosForm.search"
            @keyup.enter.native="getCommonVideo"
            @clear="getCommonVideo"
            clearable
          ></el-input>
        </div>
        <div class="wrapper">
          <el-scrollbar v-if="commonVideoList.length" style="height: 100%">
            <div class="wrapper-content-scroll">
              <MaterialItem
                v-for="item in commonVideoList"
                :key="item.id"
                :filename="item.fileName"
                :video="item.sourceUrl"
                @click="itemClick(item)"
              />
            </div>
          </el-scrollbar>

          <div v-if="!commonVideoList.length" style="padding: 50px 0;text-align: center;color: #999;width: 100%">
            暂无数据
          </div>
        </div>

        <div class="bottom-box">
          <el-pagination
            :page-size="commonVideosForm.pageSize"
            :current-page.sync="commonVideosForm.pageIndex"
            style="text-align: center;padding-top: 19px"
            background
            small
            layout="prev, pager, next"
            :total="commonVideosTotal"
            @current-change="getCommonVideo"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>

    <Upload ref="upload" uploadType="video" @saveSuccess="getVideoListUser"></Upload>
  </div>
</template>

<script>
import Upload from '@/components/DistributorUpload/index'
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

      userVideosForm: {
        userId: localStorage.getItem('id'),
        status: '2',
        pageIndex: 1,
        search: null,
        pageSize: 10,
        type: '1',
      },
      userVideoList: [],
      userVideoTotal: 0,

      search: null,
      commonVideosForm: {
        userId: localStorage.getItem('id'),
        status: '2', // 2 为视频
        search: null,
        pageIndex: 1,
        pageSize: 10,
        type: '1',
      },
      commonVideosTotal: 0,
      commonVideoList: [],
    }
  },
  created() {
    this.getVideoListUser();
    this.getCommonVideo();
  },
  methods: {
    serchUser(){
      this.getVideoListUser();
    },
    getVideoListUser(){
      this.isLoading = true
      this.$http.VideoGetVideoList(this.userVideosForm).then(res => {
        this.isLoading = false
        if(res.data.list && res.data.list.length) {
          res.data.list.forEach(item => {
            item.value = item.absolutelyUrl
          })
        }
        this.userVideoList =res.data.list
        this.userVideoTotal = res.data.total
      })
    },
    getCommonVideo() {
      this.isLoading = true
      this.$http.getPublicVideos(this.commonVideosForm).then(res => {
        this.isLoading = false
        if(res.data.list && res.data.list.length) {
          res.data.list.forEach(item => {
            item.value = item.absolutelyUrl
          })
        }
        this.commonVideoList = res.data.list
        this.commonVideosTotal = res.data.total
      })
    },
    // 公共图片分页
    pageChange(res) {
      this.userVideosForm.pageIndex = res
      this.getCommonVideo()
    },

    itemClick(item) {
      this.$emit('onEditVideoClip', {
        fileName: item.fileName,
        source: item.sourceUrl,
        path: item.absolutelyUrl,
        originalWidth: +item.pictureWidth,
        originalHeight: +item.pictureHeight,
      })
    },
    deleteVideo(item) {
      this.$http.DelteUserInfo({ id: item.id }).then(res => {
        if (res.status === 200) {
          this.$message.success('删除成功')
          this.getVideoListUser()
        } else {
          this.$message.error(res.message)
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
.upload-button {
  width: 250px;
  position: absolute;
  top: 0;
}

.search-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search-input {
  width: 200px;
  margin-bottom: 10px;
}

.bottom-box {
  position: relative;
  height: 64px;
  margin-top: 30px;
}

.button-text {
  background: #d3d4d6;
  width: 98px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  color: #909399;
  font-size: 14px;
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
<style lang="less" scoped>
@import '../css/components.less';
</style>

<style lang="less">
@import '../css/tab.less';
</style>
