<template>
  <div class="video_page">
    <div class="top_control">
      <controlBar v-model="fileName" @save="saveVideo" @saveAndShare="saveAndShare" @exportVideo="mergeVideo(true)"></controlBar>
    </div>
    <div class="b_top_wrapper">
      <div class="left_menu">
        <div class="left">
          <div class="item_menu" :class="{ active: active_menu === 'picture' }" @click="changeActiveMenu('picture')">
            <i class="el-icon-picture"></i>
            <div>图片</div>
          </div>
          <div class="item_menu" :class="{ active: active_menu === 'video' }" @click="changeActiveMenu('video')">
            <i class="el-icon-video-camera"></i>
            <div>视频</div>
          </div>
          <div class="item_menu" :class="{ active: active_menu === 'music' }" @click="changeActiveMenu('music')">
            <i class="iconfont iconyinlemusic217"></i>
            <div>音乐</div>
          </div>
          <div class="item_menu" :class="{ active: active_menu === 'text' }" @click="changeActiveMenu('text')">
            <i class="iconfont iconwenben"></i>
            <div>字幕</div>
          </div>
        </div>
        <div class="right">
          <Picture v-if="active_menu === 'picture'" ref="picture"></Picture>
          <text-wrapper v-if="active_menu === 'text'" ref="text"></text-wrapper>
          <Video v-if="active_menu === 'video'" ref="video" @onEditVideoClip="editVideoClip"></Video>
          <Music v-if="active_menu === 'music'" ref="music" @onEditAudioClip="editAudioClip"></Music>
        </div>
      </div>

      <PreviewContainer />

    </div>

    <TimelineContainer
      @onEditVideoClip="editVideoClip"
      @onEditAudioClip="editAudioClip"
    />

    <!-- 视频剪切对话框 -->
    <VideoClipDialog :visible.sync="isShowVideoClipDialog" :videoClipData="videoClipData" />
    <!-- 音频剪切对话框 -->
    <AudioClipDialog :visible.sync="isShowAudioClipDialog" :audioClipData="audioClipData" />
  </div>
</template>
<script>
import controlBar from './components/control-bar'
import _ from 'lodash'
import Music from './components/music'
import Video from './components/video'
import Picture from './components/picture'
import TextWrapper from './components/text.vue'
import {formatDateString} from '@/utils'
import TimelineContainer from '@/views/video/components/timeline/TimelineContainer'
import PreviewContainer from "@/views/video/components/preview/PreviewContainer"
import VideoClipDialog from "@/views/video/components/VideoClipDialog"
import AudioClipDialog from "@/views/video/components/AudioClipDialog"
import {formatVideoData} from "@/tools/videoUtils"
import {downLoadAttr} from "@/tools"

export default {
  components: {
    controlBar,
    Music,
    Video,
    Picture,
    TextWrapper,
    TimelineContainer,
    PreviewContainer,
    VideoClipDialog,
    AudioClipDialog,
  },
  data() {
    return {
      active_menu: 'picture',
      fileName: this.$route.query.fileName,
      videoId: this.$route.query.id || '',
      ifCreateEmptyTemplate: !!+this.$route.query.ifCreateEmptyTemplate, // true 保存；false 更新
      ifPublicAttr: !!+this.$route.query.ifPublicAttr, // true 总部；false 经销商
      videoInfo: {},
      videoUrl: null,

      isShowVideoClipDialog: false,
      videoClipData: null,
      isShowAudioClipDialog: false,
      audioClipData: null,
    }
  },
  computed: {
    videoData() {
      return this.$store.state.video.videoData
    },
  },
  created() {
    this.$store.commit('RESET_DATA')
  },
  mounted() {
    this.$store.dispatch('setIfAsideNav', false)

    if (this.videoId) {
      this.getInfo()
    } else {
      // 视频尺寸仅需支持 1280x720 和 720x1280
      let width = parseInt(this.$route.query.width || '1280')
      let height = parseInt(this.$route.query.height || '720')
      if (width > height) {
        this.$store.commit('SET_VIDEO_SIZE', {width: 1280, height: 720})
      } else {
        this.$store.commit('SET_VIDEO_SIZE', {width: 720, height: 1280})
      }
      this.$store.commit('ADD_HISTORY_CACHE')
    }

    // 添加键盘事件
    document.addEventListener('keyup', this.keyboardHandler, false)
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.keyboardHandler, false)
  },
  methods: {
    // 获取视频信息
    getInfo() {
      // 总部
      if (this.ifPublicAttr) {
        this.$http.findByIdTemplateInfo({ id: this.videoId }).then(res => {
          this._initVideoData(res.data)
          this.videoInfo = res.data
          this.fileName = res.data.fileName
        })
      } else {
        this.$http.findByIdWorksInfo({ id: this.videoId }).then(res => {
          this._initVideoData(res.data)
          this.videoInfo = res.data
          this.fileName = res.data.fileName
        })
      }
    },
    _initVideoData(data) {
      // 视频尺寸仅需支持 1280x720 和 720x1280
      let width = parseInt(data.width || data.pictureWidth)
      let height = parseInt(data.height || data.pictureHeight)
      if (width > height) {
        this.$store.commit('SET_VIDEO_SIZE', {width: 1280, height: 720})
      } else {
        this.$store.commit('SET_VIDEO_SIZE', {width: 720, height: 1280})
      }
      this.$store.dispatch('INIT_VIDEO_DATA', data.templateJson ? JSON.parse(data.templateJson) : {})
    },
    // 合成视频
    mergeVideo(downloadPrompt = false) {
      let videoData = _.cloneDeep(this.videoData)
      videoData.metadata = {
        width: this.$store.state.video.width,
        height: this.$store.state.video.height,
        duration: this.$store.getters.videoDuration,
      }

      videoData = formatVideoData(videoData)

      const loader = this.$loading({
        lock: true,
        text: '正在合成视频，请稍候',
        fullscreen: true,
      })

      return this.$http.videoMerge(videoData)
        .then(resp => {
          loader.close()
          if (resp.status === 200) {
            this.$message.success('合成成功')

            if (downloadPrompt) {
              downLoadAttr({
                typeName: '视频',
                sourceUrl: resp.data.sourceUrl,
              })
            }

            return resp.data

          } else {
            this.$message.error(resp.message)
            return null
          }
        })
        .catch(() => {
          loader.close()
          return null
        })
    },
    saveAndShare() {
      this.saveVideo(true)
    },
    // 保存视频
    saveVideo(isShare = false) {
      this.mergeVideo()
        .then(resp => {
          if (!resp) {
            return
          }

          const videoDataCopy = formatVideoData(_.cloneDeep(this.videoData))

          const postData = {
            id: this.videoId || undefined,
            fileName: this.fileName,
            width: this.$store.state.video.width,
            height: this.$store.state.video.height,
            typeName: '视频',
            userId: localStorage.getItem('id'),
            accountNumber: localStorage.getItem('accountNumber'),
            coverUrl: '',
            templateJson: JSON.stringify(videoDataCopy),
            sourceUrl: resp.sourceUrl,
            role: localStorage.getItem('role'),
            uploadData: formatDateString(new Date()),
            absolutelyUrl: resp.absolutelyUrl,
            pictureHeight: this.$store.state.video.height,
            pictureWidth: this.$store.state.video.width,
            videoTime: this.$store.getters.videoDuration,
          }

          let resultPromise
          let isCreate = this.ifCreateEmptyTemplate, isPublic = this.ifPublicAttr
          let role = +postData.role

          if (!this.videoId) {
            isCreate = true
            isPublic = role !== 1  // 1 是经销商
          }

          if (isPublic && isCreate && role !== 1) {
            // 总部，创建
            postData.isEdit = this.videoInfo.isEdit
            postData.startTime = this.videoInfo.startTime
            postData.endTime = this.videoInfo.endTime
            postData.carModelName = this.videoInfo.carModelName
            postData.categoryName = this.videoInfo.categoryName
            postData.materialType = { '1': '3', '2': '2', '3': '1' }[postData.role]

            resultPromise = this.$http.SavePosters(postData)

          } else if ((!isPublic && isCreate) || (isPublic && isCreate && role === 1)) {
            // 经销商，创建
            postData.isShare = (isShare & 1) + ''
            resultPromise = this.$http.SaveWorksInfo(postData)

          } else if (isPublic && !isCreate && role !== 1) {
            // 总部，更新
            postData.isEdit = this.videoInfo.isEdit
            postData.startTime = this.videoInfo.startTime
            postData.endTime = this.videoInfo.endTime
            postData.carModelName = this.videoInfo.carModelName
            postData.categoryName = this.videoInfo.categoryName
            postData.materialType = { '1': '3', '2': '2', '3': '1' }[postData.role]
            resultPromise = this.$http.UpdatePoster(postData)

          } else {
            // 经销商，更新
            postData.isShare = (isShare & 1) + ''
            resultPromise = this.$http.UpdateWorksInfo(postData)
          }

          resultPromise.then((resp) => {
            if (resp.status === 200) {
              this.$message.success('保存成功')
              this._gotoListPage()

            } else {
              this.$message.error(resp.message)
            }
          })
        })
    },
    // 保存成功后用于跳转到列表页面
    _gotoListPage() {
      const role = +localStorage.getItem('role')
      if (role === 1) {
        this.$router.replace('/myAssets')
      } else {
        this.$router.replace('/publicAssets')
      }
    },
    changeActiveMenu(type) {
      this.active_menu = type
    },

    editVideoClip(videoObj) {
      this.isShowVideoClipDialog = true
      this.videoClipData = videoObj
    },
    editAudioClip(audioObj) {
      this.isShowAudioClipDialog = true
      this.audioClipData = audioObj
    },
    keyboardHandler(event) {
      // 当前焦点元素为输入框时，忽略键盘事件
      const tagName = document.activeElement.tagName
      if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
        return
      }

      const selectedItem = this.$store.getters.selectedItem

      // 当前没有选中元素时，忽略键盘事件
      if (!selectedItem) {
        return
      }

      const ctrl = event.ctrlKey || event.metaKey
      const shift = event.shiftKey

      switch (event.keyCode) {
        case 8: // Backspace
        case 46: // Delete
          this.$confirm('是否确认删除当前元素？', {
            title: '提示',
            type: 'warning',
          })
            .then(() => {
              this.$store.dispatch('DELETE_VIDEO_ITEM', selectedItem.uuid)
            })
            .catch(() => {})
          break

        case 90: // Z
          if (!ctrl) {
            return
          }
          if (shift) {
            this.$store.dispatch('videoUndo')
          } else {
            this.$store.dispatch('videoRedo')
          }
          break

        case 37: // Left
        case 39: // Right
          // 默认左/右移 1 秒，按住 Shift 键左/右移 0.1 秒
          event.preventDefault()
          event.stopPropagation()

          const duration = selectedItem.endTime - selectedItem.startTime

          selectedItem.startTime += (shift ? 0.1 : 1) * (event.keyCode === 37 ? -1 : 1)
          if (selectedItem.startTime < 0) selectedItem.startTime = 0
          if (selectedItem.startTime > 120) selectedItem.startTime = 120
          selectedItem.endTime = selectedItem.startTime + duration
          break
      }



    },
  }
}
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.video_page {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 1px;

  .top_control {
    padding: 10px 20px;
    z-index: 1;
    border-top: 1px solid #dcdfe6;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  }

  .b_top_wrapper {
    display: flex;
    flex: 1;
    height: 1px;

    .left_menu {
      flex: 1;
      display: flex;

      .left {
        width: 163px;
        background: #e8e8e8;
        height: 100%;

        .item_menu {
          display: flex;
          text-align: center;
          justify-content: center;
          align-items: center;
          height: 44px;
          line-height: 44px;
          cursor: pointer;

          i {
            margin-right: 5px;
          }
        }

        .active {
          background: #d6d6d6;
        }
      }

      .right {
        flex: 1;
        height: 100%;
        overflow: hidden;
        display: flex;
      }
    }
  }
}
</style>
<style lang="less">
.right > div {
  flex: 1 1 auto;
}
</style>
