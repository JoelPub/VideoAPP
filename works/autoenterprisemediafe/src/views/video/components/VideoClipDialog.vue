<template>
  <el-dialog
    title="视频编辑"
    top="5vh"
    center
    :visible="visible"
    width="850px"
    @update:visible="$emit('update:visible', $event)"
    @closed="onDialogClosed"
  >
    <el-form ref="form" label-width="90px" size="mini">
      <el-form-item label="视频预览：">
        <video v-if="videoClipData" ref="video" class="preview-video"
               :src="videoClipData.source" controls
               @durationchange="durationChange"
               @timeupdate="onTimeUpdate"
               @pause="isPlayingClip = false"
        ></video>
      </el-form-item>
      <el-form-item label="选取范围：">
        <el-slider
          v-model="clipRange"
          :min="0"
          :max="duration"
          :step="0.1"
          range
          :format-tooltip="formatTooltip"
        ></el-slider>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="previewClip">预览剪辑</el-button>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:visible', false)">取 消</el-button>
        <el-button type="primary" @click="insertData">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
  import {createUUID, formatSecondsToString} from "@/utils"

  export default {
    name: "VideoClipDialog",
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      videoClipData: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        clipRange: [0, 0],
        duration: 0,
        isPlayingClip: false,
      }
    },
    methods: {
      durationChange(event) {
        this.duration = event.target.duration
        this.clipRange = [0, this.duration]
      },
      insertData() {
        if (this.videoClipData.uuid) {
          this.videoClipData.clipStartTime = this.clipRange[0]
          this.videoClipData.clipEndTime = this.clipRange[1]
          this.videoClipData.endTime = this.videoClipData.startTime + (this.clipRange[1] - this.clipRange[0])

        } else {
          this.$store.dispatch('INSERT_MEDIA', {
            type: 'video',
            data: {
              uuid: createUUID(),
              fileName: this.videoClipData.fileName,
              source: this.videoClipData.source,
              path: this.videoClipData.path,
              originalWidth: this.videoClipData.originalWidth,
              originalHeight: this.videoClipData.originalHeight,
              clipStartTime: this.clipRange[0],
              clipEndTime: this.clipRange[1],
              startTime: this.$store.state.video.currentPlaybackPosition,
              endTime: this.$store.state.video.currentPlaybackPosition + (this.clipRange[1] - this.clipRange[0]),
              mute: true,
            },
          })
        }

        this.$emit('update:visible', false)
      },
      formatTooltip(value) {
        if (isNaN(value)) {
          return 0
        }
        return formatSecondsToString(value, true)
      },
      previewClip() {
        const $video = this.$refs.video
        $video.currentTime = this.clipRange[0]
        $video.play()
        this.isPlayingClip = true
      },
      onTimeUpdate(event) {
        if (this.isPlayingClip && event.target.currentTime >= this.clipRange[1]) {
          event.target.pause()
        }
      },
      onDialogClosed() {
        this.$refs.video && this.$refs.video.pause()
        this.isPlayingClip = false
      },
    },
  }
</script>

<style scoped lang="scss">
  .preview-video {
    width: 700px;
    height: 500px;
  }
</style>
