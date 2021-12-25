<template>
  <div class='timeline-container'>
    <div class='control-bar flex-box'>
      <div class='button-item' @click='videoUndo'>
        <i class='iconfont iconundo1' :class='{ disabled: !isVideoCanUndo }'></i>
      </div>
      <div class='button-item' @click='videoRedo'>
        <i class='iconfont iconredo1' :class='{ disabled: !isVideoCanRedo }'></i>
      </div>
      <div class='button-item'  @click='deleteVideoData' style='font-size: 14px'>
        <i class='el-icon-delete'></i>
      </div>
      <div v-if='!isPlaying' class='button-item' @click='playPreview' style='font-size: 14px'>
        <i class='fa fa-play'></i>
      </div>
      <div v-if='isPlaying' class='button-item'  @click='stopPreview' style='font-size: 14px'>
        <i class='fa fa-pause'></i>
      </div>
      <el-tag size='medium'>当前插入元素时间节点：<span
        style='color: #085392'>{{ currentPlaybackPosition | formatSecondsToString(true) }}</span></el-tag>
    </div>
    <!-- 控制 -->
    <div class="control-wrapper">
      <div class="left">
        <div class="item_control_menu">
          <div class="top">
            <i class="fa fa-picture-o"></i>
          </div>
        </div>
        <div class="item_control_menu">
          <div class="top">
            <i class="fa fa-video-camera"></i>
            <el-tooltip v-if='selectedItem && selectedItem.type === "video" && !selectedItem.mute'
                        class="item" effect="dark" content="静音" placement="top">
              <i class="fa fa-volume-up" @click='toggleMuteVideoTrack'></i>
            </el-tooltip>
            <el-tooltip v-if='selectedItem && selectedItem.type === "video" && selectedItem.mute'
                        class="item" effect="dark" content="取消静音" placement="top">
              <i class="fa fa-volume-off" @click='toggleMuteVideoTrack'></i>
            </el-tooltip>
          </div>
        </div>
        <div class="item_control_menu">
          <div class="top">
            <i class="fa fa-music"></i>
          </div>
        </div>
        <div class="item_control_menu">
          <div class="top">
            <i class="iconfont iconwenben"></i>
          </div>
        </div>
      </div>
      <div class="right">
        <TimelineRuler :timeline-config='timelineConfig' />

        <div class='item_line'>
          <TimelineClipItem
            v-for='item in videoData.images'
            :key='item.uuid'
            :second-gutter="timelineConfig.gutter"
            type='image'
            :file-name='item.fileName'
            :preview-image='item.source'
            :item='item'
          />
        </div>
        <div class="item_line">
          <TimelineClipItem
            v-for='item in videoData.videos'
            :key='item.uuid'
            :second-gutter="timelineConfig.gutter"
            type='video'
            :file-name='item.fileName'
            icon='fa fa-video-camera'
            :item='item'
            @dblclick.native="$emit('onEditVideoClip', item)"
          />
        </div>
        <div class="item_line">
          <TimelineClipItem
            v-for='item in videoData.audios'
            :key='item.uuid'
            :second-gutter="timelineConfig.gutter"
            type='audio'
            :file-name='item.fileName'
            icon='fa fa-music'
            :item='item'
            @dblclick.native="$emit('onEditAudioClip', item)"
          />
        </div>
        <div class="item_line">
          <TimelineClipItem
            v-for='item in videoData.subtitles'
            :key='item.uuid'
            :second-gutter="timelineConfig.gutter"
            type='subtitle'
            :file-name='item.text'
            icon='iconfont iconwenben'
            :item='item'
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import TimelineClipItem from '@/views/video/components/timeline/TimelineClipItem'
import TimelineRuler from '@/views/video/components/timeline/TimelineRuler'
import { formatSecondsToString } from '@/utils'

export default {
  name: 'TimelineContainer',
  components: {
    TimelineClipItem,
    TimelineRuler,
  },
  filters: {
    formatSecondsToString
  },
  data() {
    return {
      number: 5,
      value1: 1,
      // 绘制时间线的参数
      timelineConfig: {
        canvasHeight: 50,
        gutter: 10, // 每秒之间相差的像素数
        maxTimeInSeconds: 150,  // 最大秒数
        startOffsetX: 20, // 0 秒线距离 canvas 最左侧的偏移距离
      }
    }
  },
  computed: {
    ...mapGetters([
      'isVideoCanUndo',
      'isVideoCanRedo',
      'selectedItem',
    ]),
    ...mapState({
      currentPlaybackPosition: state => state.video.currentPlaybackPosition,
      videoData: state => state.video.videoData,
    }),
    isPlaying: {
      get() {
        return this.$store.state.video.isPlaying
      },
      set(value) {
        this.$store.commit('SET_PLAY_STATUS', value)
      },
    }
  },
  methods: {
    ...mapActions([
      'videoUndo',
      'videoRedo',
    ]),
    deleteVideoData() {
      const uuid = this.$store.state.video.selectedItemUUID
      if (!uuid) {
        this.$message.warning('没有选择任何元素')
        return
      }

      this.$confirm('是否确认删除当前元素？', {
        title: '提示',
        type: 'warning',
      })
        .then(() => {
          this.$store.dispatch('DELETE_VIDEO_ITEM', uuid)
        })
        .catch(() => {})
    },
    playPreview() {
      const startTimestamp = window.performance.now()
      let startPosition = this.currentPlaybackPosition
      const videoDuration = this.$store.getters.videoDuration
      this.isPlaying = true

      if (this.currentPlaybackPosition >= videoDuration) {
        this.$store.state.video.currentPlaybackPosition = 0
        startPosition = 0
      }

      const i = setInterval(() => {
        const timeDiff = window.performance.now() - startTimestamp
        const position = startPosition + timeDiff / 1000
        this.$store.state.video.currentPlaybackPosition = position

        if (!this.isPlaying) {
          clearInterval(i)
        }
        if (position > videoDuration) {
          this.isPlaying = false
          clearInterval(i)
        }
      }, 100)

    },
    stopPreview() {
      this.isPlaying = false
    },
    toggleMuteVideoTrack() {
      if (this.selectedItem && this.selectedItem.type === 'video') {
        this.selectedItem.mute = !this.selectedItem.mute
      }
    },
  }
}
</script>

<style scoped lang='scss'>
.timeline-container {
  border-top: 2px solid #CCC
}

.control-bar {
  display: flex;
  justify-content: flex-start;
  padding-left: 165px;
  box-sizing: border-box;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(210, 210, 210);

  i {
    padding: 5px;
    margin-right: 20px;
    cursor: pointer;

    &:not(.disabled):hover {
      color: $primary;
      transform: scale(1.02);
      font-weight: bold;
    }

    &.disabled {
      cursor: not-allowed;
      color: $gray !important;
      opacity: .5;
    }
  }
}

.control-wrapper {
  display: flex;

  .left {
    width: 163px;
    height: 222px;
    position: relative;
    padding-top: 53px;
    border-right: 1px solid #606266;
    box-sizing: border-box;

    .item_control_menu {
      padding: 4px 20px;
      box-sizing: border-box;
      border-bottom: 1px solid rgb(210, 210, 210);
      color: #BEBEBE;

      i {
        font-size: 15px;
        padding: 5px;
        cursor: pointer;
      }
    }
  }

  .right {
    flex: 1;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    position: relative;

    .item_line {
      position: relative;
      height: 34px;
      margin-left: 20px;
      cursor: pointer;
    }

    &::-webkit-scrollbar {
      display: block;
      height: 10px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      box-shadow: inset 0 0 5px rgb(0, 0, 0 / 20%);
      background: #535353;
      width: 30px;
      display: block;
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background: #ccc;
    }
  }
}
</style>
