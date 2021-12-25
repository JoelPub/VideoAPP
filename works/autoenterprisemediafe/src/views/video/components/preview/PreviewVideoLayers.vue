<template>
  <div ref="previewVideoLayers" class="preview-video-layers">
    <video
      v-for="item in videos"
      :key="item.uuid"
      :ref="`video-${item.uuid}`"
      :class="{'is-active': currentVideo && item.uuid === currentVideo.uuid}"
      :src="item.source"
      type="video/mp4"
      preload="auto"
      @timeupdate="onVideoTimeUpdate($event, item)"
    ></video>
  </div>
</template>

<script>
  export default {
    name: "PreviewVideoLayers",
    props: {
      currentPlaybackPosition: Number,
      availableVideos: Array,
    },
    computed: {
      videos() {
        return this.$store.state.video.videoData.videos
      },
      // 当前时间有多个可用的视频时，返回最后一个视频
      currentVideo() {
        if (this.availableVideos.length > 0) {
          return this.availableVideos[this.availableVideos.length - 1]
        }
        return null
      },
      isPlaying() {
        return this.$store.state.video.isPlaying
      },
    },
    watch: {
      videos: {
        immediate: true,
        deep: true,
        handler(videos) {
          // 当视频变化时，计算视频播放相关的属性，并赋值
          this.$nextTick(() => {
            videos.forEach(video => {
              let $video = this.$refs['video-' + video.uuid]
              if ($video && $video.length) {
                $video = $video[0]
              }
              if ($video) {
                const clipDuration = video.clipEndTime - video.clipStartTime
                const realDuration = video.endTime - video.startTime
                $video.playbackRate = clipDuration / realDuration
                $video.muted = video.mute
              }
            })
          })
        },
      },
      currentVideo(video) {
        if (this.isPlaying) {
          if (video ) {
            const $video = this.$refs['video-' + video.uuid][0]
            if ($video) {
              $video.play()
            }
          }
        }
      },
      currentPlaybackPosition() {
        this.setVideoCurrentTime()
      },
      isPlaying(value) {
        if (this.currentVideo) {
          const $video = this.$refs['video-' + this.currentVideo.uuid][0]
          if (value) {
            $video.play()
          } else {
            $video.pause()
          }
        }
      },
    },
    methods: {
      setVideoCurrentTime() {
        if (this.isPlaying || !this.currentVideo) {
          return
        }

        let $video = this.$refs['video-' + this.currentVideo.uuid]
        if ($video.length) {
          $video = $video[0]
        }
        const startTime = this.currentVideo.startTime - this.currentVideo.clipStartTime
        $video.currentTime = (this.currentPlaybackPosition - startTime) * $video.playbackRate
      },
      onVideoTimeUpdate(event, item) {
        if (this.currentPlaybackPosition > item.endTime) {
          event.target.pause()
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .preview-video-layers {
    height: 100%;
  }

  video {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0;

    &.is-active {
      opacity: 1;
      z-index: 1;
    }
  }
</style>
