<template>
  <div class="timeline-ruler">
    <div class="control-line"
         :style="{left: currentPlaybackPosition * timelineConfig.gutter + 'px'}"
         @mousedown="onMouseDown"
    ></div>

    <canvas id="canvas" ref='timelineCanvas'
            :style='{width: `${canvasWidth}px`, height: `50px`}'
    ></canvas>
  </div>
</template>

<script>
  import {formatSecondsToString} from "@/utils"

  export default {
    name: "TimelineRuler",
    props: {
      timelineConfig: Object,
    },
    data() {
      return {
        canvasWidth: 6000,
        startX: 0,
        startTimePos: 0,
      }
    },
    computed: {
      currentPlaybackPosition() {
        return this.$store.state.video.currentPlaybackPosition
      },
    },
    mounted() {
      this.drawTimeline()
    },
    methods: {
      onMouseDown(event) {
        this.startX = event.clientX
        this.startTimePos = this.currentPlaybackPosition

        const mouseMove = (event) => {
          const diffX = event.clientX - this.startX
          const timeDiff = diffX / this.timelineConfig.gutter
          let targetPos = this.startTimePos + timeDiff

          if (targetPos < 0) targetPos = 0
          if (targetPos > 180) targetPos = 180

          this.$store.state.video.currentPlaybackPosition = targetPos
        }

        const mouseUp = () => {
          document.removeEventListener('mousemove', mouseMove, false)
          document.removeEventListener('mouseup', mouseUp, false)
        }

        document.addEventListener('mousemove', mouseMove, false)
        document.addEventListener('mouseup', mouseUp, false)
      },
      // 绘制时间线
      drawTimeline() {
        const gutter = this.timelineConfig.gutter
        const maxTimeInSeconds = this.timelineConfig.maxTimeInSeconds
        const startOffsetX = this.timelineConfig.startOffsetX
        const lineLengthShort = 10 // 秒线长度
        const lineLengthMiddle = 15 // 5 秒线长度
        const lineLengthLong = 20 // 10 秒线长度
        const fontSize = 12 // 文本标签的文字大小

        this.canvasWidth = maxTimeInSeconds * gutter + startOffsetX * 2

        const width = this.canvasWidth
        const height = this.timelineConfig.canvasHeight

        const $timelineCanvas = this.$refs.timelineCanvas
        const pixRatio = window.devicePixelRatio || 1
        $timelineCanvas.width = width * pixRatio
        $timelineCanvas.height = height * pixRatio

        const ctx = $timelineCanvas.getContext('2d')

        // 画之前清空画布
        ctx.clearRect(0, 0, width * pixRatio, height * pixRatio)
        // 设置画笔属性
        ctx.strokeStyle = 'rgb(148 148 148)'
        ctx.fillStyle = 'rgb(148 148 148)'
        ctx.lineWidth = pixRatio
        ctx.font = (fontSize * pixRatio) + 'px sans-serif'

        for (let i = 0; i <= maxTimeInSeconds; i++) {
          const left = i * gutter * pixRatio + startOffsetX * pixRatio
          const lineLength = i % 10 === 0
            ? lineLengthLong
            : (i % 5 === 0 ? lineLengthMiddle : lineLengthShort)

          // 绘制线条
          ctx.beginPath()
          ctx.moveTo(left, (height - lineLength) * pixRatio)
          ctx.lineTo(left, height * pixRatio)
          ctx.stroke()

          // 绘制文字
          if (i % 10 === 0) {
            const text = formatSecondsToString(i)
            const textRect = ctx.measureText(text)
            ctx.fillText(text, left - textRect.width / 2, (height - lineLength - fontSize + 5) * pixRatio)
          }
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .control-line {
    width: 1px;
    background: #606266;
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 100;
    transform: translate(20px);
    &:after {
      content: " ";
      position: absolute;
      right: -6px;
      top: 0;
      width: 12px;
      height: 16px;
      background: #606266;
      cursor: ew-resize;
    }
  }
</style>
