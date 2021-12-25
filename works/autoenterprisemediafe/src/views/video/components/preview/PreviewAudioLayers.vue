<template>
  <div ref="previewAudioLayers" class="preview-audio-layers">
    <audio
      v-for="item in audios"
      :key="item.uuid"
      :ref="`audio-${item.uuid}`"
      :src="item.source"
      type="audio/mp3"
      preload="auto"
      @timeupdate="onAudioTimeUpdate($event, item)"
    ></audio>
  </div>
</template>

<script>
  export default {
    name: "PreviewAudioLayers",
    props: {
      currentPlaybackPosition: Number,
      availableAudios: Array,
    },
    data() {
      return {
      }
    },

    computed: {
      audios() {
        return this.$store.state.video.videoData.audios
      },
      isPlaying() {
        return this.$store.state.video.isPlaying
      },
    },
    watch: {
      audios: {
        immediate: true,
        deep: true,
        handler(audios) {
          // 当音频变化时，计算播放相关的属性，并赋值
          this.$nextTick(() => {
            audios.forEach(audio => {
              let $audio = this.$refs['audio-' + audio.uuid]
              if ($audio && $audio.length) {
                $audio = $audio[0]
              }
              if ($audio) {
                const clipDuration = audio.clipEndTime - audio.clipStartTime
                const realDuration = audio.endTime - audio.startTime
                $audio.playbackRate = clipDuration / realDuration
                $audio.currentTime = audio.clipStartTime
              }
            })
          })
        },
      },
      availableAudios(audios) {
        if (this.isPlaying) {
          audios.forEach(audio => {
            const $audio = this.$refs['audio-' + audio.uuid][0]
            if ($audio.paused) {
              this.setAudioCurrentTime(true)
              $audio.play()
            }
          })
        }
      },
      currentPlaybackPosition() {
        this.setAudioCurrentTime()
      },
      isPlaying(value) {
        this.setAudioCurrentTime()
        this.availableAudios.forEach(audio => {
          const $audio = this.$refs['audio-' + audio.uuid][0]
          if (value) {
            $audio.play()
          } else {
            $audio.pause()
          }
        })
      },
    },
    methods: {
      setAudioCurrentTime(force = false) {
        if (!force && this.isPlaying) {
          return
        }

        this.availableAudios.forEach(audio => {
          const $audio = this.$refs['audio-' + audio.uuid][0]
          const startTime = audio.startTime - audio.clipStartTime
          $audio.currentTime = (this.currentPlaybackPosition - startTime) * $audio.playbackRate
        })
      },
      onAudioTimeUpdate(event, item) {
        if (this.currentPlaybackPosition > item.endTime) {
          event.target.pause()
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  audio {
    display: none;
  }
</style>
