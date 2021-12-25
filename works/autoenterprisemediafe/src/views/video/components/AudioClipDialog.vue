<template>
  <el-dialog
    title="音频编辑"
    center
    :visible="visible"
    width="650px"
    @update:visible="$emit('update:visible', $event)"
    @closed="onDialogClosed"
  >
    <el-form ref="form" label-width="90px" size="mini">
      <el-form-item label="插入音乐：">
        <div>{{ audioClipData && audioClipData.fileName }}</div>
        <audio
          v-if="audioClipData"
          :src="audioClipData.source"
          ref="audio"
          controls
          style="width: 100%"
          @timeupdate="onTimeUpdate"
          @pause="isPlayingClip = false"
          @durationchange="durationChange"
        >
          您的浏览器不支持 audio 标签。
        </audio>
      </el-form-item>
      <el-form-item label="音乐时长：">
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
        <el-button type="primary" @click="previewClip">试听片段</el-button>
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
    name: "AudioClipDialog",
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      audioClipData: {
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
        if (this.audioClipData.uuid) {
          this.audioClipData.clipStartTime = this.clipRange[0]
          this.audioClipData.clipEndTime = this.clipRange[1]
          this.audioClipData.endTime = this.audioClipData.startTime + (this.clipRange[1] - this.clipRange[0])

        } else {
          this.$store.dispatch('INSERT_MEDIA', {
            type: 'audio',
            data: {
              uuid: createUUID(),
              fileName: this.audioClipData.fileName,
              source: this.audioClipData.source,
              path: this.audioClipData.path,
              clipStartTime: this.clipRange[0],
              clipEndTime: this.clipRange[1],
              startTime: this.$store.state.video.currentPlaybackPosition,
              endTime: this.$store.state.video.currentPlaybackPosition + (this.clipRange[1] - this.clipRange[0]),
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
        const $audio = this.$refs.audio
        $audio.currentTime = this.clipRange[0]
        $audio.play()
        this.isPlayingClip = true
      },
      onTimeUpdate(event) {
        if (this.isPlayingClip && event.target.currentTime >= this.clipRange[1]) {
          event.target.pause()
        }
      },
      onDialogClosed() {
        this.$refs.audio && this.$refs.audio.pause()
        this.isPlayingClip = false
      },
    },
  }
</script>
