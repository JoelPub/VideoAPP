<template>
  <div class="preview-container">
    <div class="video-ratio-container" :class="{'is-portrait': isPortrait}">
      <div ref="videoContainer" class="video-container">
        <!-- 视频层 -->
        <PreviewVideoLayers
          :currentPlaybackPosition="currentPlaybackPosition"
          :availableVideos="availableVideos"
        />

        <!-- 图片层 -->
        <PreviewImageLayer
          v-for="image in availableImages"
          :key="image.uuid"
          :image="image"
          :zoom-ratio="zoomRatio"
        />

        <!-- 字幕层 -->
        <PreviewSubtitleLayer
          v-for="subtitle in availableSubtitles"
          :key="subtitle.uuid"
          :subtitle="subtitle"
          :zoom-ratio="zoomRatio"
        />

        <!-- 音频层 -->
        <PreviewAudioLayers
          :currentPlaybackPosition="currentPlaybackPosition"
          :availableAudios="availableAudios"
        />

      </div>
    </div>
  </div>
</template>

<script>
  import PreviewImageLayer from "@/views/video/components/preview/PreviewImageLayer"
  import PreviewVideoLayers from "@/views/video/components/preview/PreviewVideoLayers"
  import PreviewAudioLayers from "@/views/video/components/preview/PreviewAudioLayers"
  import PreviewSubtitleLayer from "@/views/video/components/preview/PreviewSubtitleLayer"

  export default {
    name: "PreviewContainer",
    components: {
      PreviewImageLayer,
      PreviewVideoLayers,
      PreviewAudioLayers,
      PreviewSubtitleLayer,
    },
    data() {
      return {
        zoomRatio: 1, // 视频预览区域的缩放比
      }
    },
    mounted() {
      setTimeout(() => {
        this.resetZoomRatio()
      }, 100)

      window.addEventListener('resize', this.resetZoomRatio, false)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resetZoomRatio, false)
    },
    computed: {
      // 是否是竖屏
      isPortrait() {
        return this.$store.state.video.height > this.$store.state.video.width
      },
      currentPlaybackPosition() {
        return this.$store.state.video.currentPlaybackPosition
      },
      // 当前时间点可见的图片列表
      availableImages() {
        return this.$store.state.video.videoData.images.filter(item => {
          return item.startTime <= this.currentPlaybackPosition && item.endTime >= this.currentPlaybackPosition
        })
      },
      // 当前时间点可见的视频列表
      availableVideos() {
        return this.$store.state.video.videoData.videos.filter(item => {
          return item.startTime <= this.currentPlaybackPosition && item.endTime >= this.currentPlaybackPosition
        })
      },
      // 当前时间点可见的音频列表
      availableAudios() {
        return this.$store.state.video.videoData.audios.filter(item => {
          return item.startTime <= this.currentPlaybackPosition && item.endTime >= this.currentPlaybackPosition
        })
      },
      // 当前时间点可见的字幕列表
      availableSubtitles() {
        return this.$store.state.video.videoData.subtitles.filter(item => {
          return item.startTime <= this.currentPlaybackPosition && item.endTime >= this.currentPlaybackPosition
        })
      },
    },
    methods: {
      resetZoomRatio() {
        this.$nextTick(() => {
          const containerWidth = this.$refs.videoContainer.offsetWidth
          this.zoomRatio = this.$store.state.video.width / containerWidth
          console.log('Preview zone zoom ratio is: ', this.zoomRatio)
        })
      },
    },
  }
</script>

<style scoped lang="scss">
  .preview-container {
    padding: 44px 20px 10px;
    background: #e7e8f1;
    width: 40%;
  }

  .video-ratio-container {
    position: relative;
    padding-bottom: 56.25%;
    margin: 0 auto;
    background: #000;
    outline: 1px solid #999;

    &.is-portrait {
      width: 36.7%;
      //height: 100%;
      padding-bottom: 65%;
    }
  }

  .video-container {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
</style>
