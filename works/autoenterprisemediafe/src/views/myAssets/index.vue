<template>
  <div class="page-assets">
    <!--  -->
    <attr-play
      v-if="ifPlayAttr"
      :preCard="preCard"
      :ifShowPeriodOfUse="false"
      :ifBtnFavorite="false"
      @pauseVideo="pauseVideo()"
    >
      <template v-slot:attr>
        <video-attr
          v-if="preCard.typeName == '视频'"
          :width="600"
          :source="{ src: preCard.sourceUrl || preCard.coverUrl }"
          :controls="true"
        ></video-attr>
        <img v-else :src="preCard.coverUrl || preCard.sourceUrl" alt="loading" class="click-area img-pre" />
      </template>
    </attr-play>
    <create-attr v-if="openCreateDialog" @closeCreateDialog="openCreateDialog = false" />
    <multiple-file-upload
      v-if="openMultipleFileUploadDialog"
      @closeMultipleFileUploadDialog="closeMultipleFileUploadDialog()"
    />
    <div class="page-assets-content-scroll">
      <div class="page-assets-content">
        <div class="assets-header">
          <el-tabs v-model="activeName" class="assets-switch" @tab-click="handleClick">
            <el-tab-pane label="海报专区" name="mypost"></el-tab-pane>
            <el-tab-pane label="KV专区" name="mykv"></el-tab-pane>
            <el-tab-pane label="视频专区" name="myvideo"></el-tab-pane>
          </el-tabs>
          <div class="assets-filter">
            <el-input
              placeholder="请输入素材关键词"
              prefix-icon="el-icon-search"
              v-model="filterInput"
              class="search-input"
              @input="resetSearch()"
              @keyup.enter.native="searchTemplate()"
            >
            </el-input>
            <el-button class="filter-btn" v-if="clickFlag != 1" @click="openMultipleFileUploadDialog = true"
              >上传素材
            </el-button>
            <el-button class="filter-btn" v-if="clickFlag != 1" @click="openCreateDialog = true">创建空白页</el-button>
          </div>
        </div>
        <div class="assets-panel">
          <!-- 历史模板 -->
          <template-list :typeName="typeName" @playVideo="playVideo" @pauseVideo="pauseVideo"></template-list>
          <!-- 历史收藏 -->
          <collection-list :typeName="typeName" @playVideo="playVideo" @pauseVideo="pauseVideo"></collection-list>
          <!-- 素材 -->
          <attr-list ref="myAttrList" @playVideo="playVideo"></attr-list>
        </div>
        <div style="flex: 0 0 40px"></div>
      </div>
    </div>
  </div>
</template>
<script>
// import myPoster from './components/myPoster'
// import myVideo from './components/myVideo'
// import myKV from './components/myKV'
import createAttr from '../../components/components/createAttr'
import multipleFileUpload from '../../components/components/multipleFileUpload'
import templateList from './components/templateList'
import collectionList from './components/collectionList'
import attrList from './components/attrList'
import attrPlay from '../../components/components/attrplay'
import videoAttr from '../../components/components/videoAttr'
import { downLoadAttr } from '../../tools'
export default {
  // components: { myPoster, myVideo, myKV, createAttr, multipleFileUpload, templateList, attrList },
  components: { createAttr, multipleFileUpload, templateList, attrList, attrPlay, videoAttr, collectionList },
  data() {
    return {
      activeName: 'mypost',
      clickFlag: 0,
      filterInput: '',
      uploadFileDialog: false,
      openCreateDialog: false,
      openMultipleFileUploadDialog: false,
      typeName: '海报',
      posterData: [],
      ifPlayAttr: false,
      preCard: {}
    }
  },
  watch: {
    filterInput(val) {
      // console.log(val)
    }
  },
  methods: {
    playVideo(res) {
      console.log(res)
      if (!this.ifPlayAttr) {
        this.ifPlayAttr = true
        this.videoSource = res.source
        this.preCard = res
      }
    },
    pauseVideo() {
      if (this.ifPlayAttr) {
        this.ifPlayAttr = false
        this.$nextTick(() => {
          const node = document.querySelector('.page-attr')
          if (node) node.style.overflow = 'scroll'
        })
      }
    },
    handleClick(tab) {
      this.clickFlag = tab.index
      this.filterInput = ''
      this.typeName = tab.label.replace(/\u4e13\u533a/, '')
    },
    // 输入框
    searchTemplate() {
      if (this.filterInput) this.$bus.$emit('searchUserTemplate', this.filterInput)
    },
    resetSearch() {
      console.log('uuu')
      if (!this.filterInput) this.$bus.$emit('searchUserTemplate', this.filterInput)
    },
    closeMultipleFileUploadDialog() {
      this.openMultipleFileUploadDialog = false
      this.$refs.myAttrList.refreshComponentData('myassetsList')
    }
  }
}
</script>
<style lang="less" scoped>
.page-assets {
  background: url('../../assets/imgs/content_bg.png') no-repeat;
  background-size: cover;
  flex: 0 0 auto;
  height: calc(100vh - 56px - 66px);
  position: relative;
}
.page-assets-content-scroll {
  height: 100%;
  padding: 30px 40px 0;
  overflow: scroll;
}
.page-assets-content {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 0 auto;
  max-width: 1200px;
  min-width: 900px;
}
.assets-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.assets-filter {
  display: flex;
  justify-content: flex-end;
  .search-input {
    width: 324px;
    .el-input--small .el-input__inner {
      height: 35px;
      line-height: 35px;
    }
  }
  .filter-btn {
    display: block;
    width: 96px;
    height: 33px;
    border: 1px solid #a3d0fd;
    font-size: 14px;
    color: #1989fa;
    border-radius: 3px;
    background: #ecf5ff;
    margin-left: 30px;
  }
}
.mask {
  z-index: 999;
}
.dialog-contain {
  background: #ffffff;
  box-shadow: 0px 6px 10px rgba(14, 40, 56, 0.16);
  padding: 48px 0 87px;
  border-radius: 14px;
  position: fixed;
  left: 50%;
  top: 50%;
  height: 600px;
  transform: translate(-50%, -50%);
}
.dialog-title {
  position: fixed;
  left: 0px;
  top: 0;
  width: 100%;
  height: 47px;
  line-height: 47px;
  font-size: 14px;
  color: #606266;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 0;
  p {
    position: absolute;
    left: 30px;
    top: 20px;
    height: 20px;
    line-height: 20px;
  }
  .img-close {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 30px;
    top: 20px;
    cursor: pointer;
  }
}
</style>
<style lang="less">
.personal-pagination {
  flex: 1 0 100%;
  margin-top: 10px;
  text-align: center;
}
.assets-switch {
  .el-tabs__item {
    font-size: 16px;
    color: #ffffff;
    opacity: 0.65;
    height: 33px;
    line-height: 33px;
  }
  #tab-mypost {
    position: relative;
    &:before {
      position: absolute;
      content: '';
      width: 1px;
      height: 16px;
      background: #ffffff;
      top: 9px;
      right: 0px;
    }
  }
  #tab-myvideo {
    position: relative;
    &:before {
      position: absolute;
      content: '';
      width: 1px;
      height: 16px;
      background: #ffffff;
      top: 9px;
      left: 0px;
    }
  }
  .el-tabs__header {
    margin-bottom: 0px;
  }
  .el-tabs__active-bar {
    background: #ffffff;
  }
  .el-tabs__nav-wrap::after {
    background: transparent;
  }
  .el-tabs__item.is-active {
    font-size: 18px;
    opacity: 1;
  }
}
.no-data {
  text-align: center;
  font-size: 14px;
}
</style>
