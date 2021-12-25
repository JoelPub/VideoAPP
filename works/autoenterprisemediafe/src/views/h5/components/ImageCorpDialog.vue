<template>
  <el-dialog title='图片截切' width='1000px'
             :visible='isShowImageCorpDialog'
             :close-on-click-modal='false'
             destroy-on-close
             @update:visible='onVisibleChange'
             @opened='onDialogOpened'
             @closed='onDialogClosed'
  >
    <div v-loading='isLoading' ref='cropContainer' class='crop-container'
         :style='{width: `${originImageWidth + 2}px`, height: `${originImageHeight + 2}px`}'>
      <div class='crop-area-shape'
           :style='{left: `${cropStyle.left}px`, top: `${cropStyle.top}px`, width: `${cropStyle.width}px`, height: `${cropStyle.height}px`}'
           @mousedown='onCropAreaMove'
      >
        <div
          class='edit-shape-point'
          v-for='item in pointList'
          :key='item'
          @mousedown='handleMouseDownOnPoint(item, $event)'
          :style='getPointStyle(item)'
        ></div>
      </div>

      <img :src='originImageSrc' alt='original image' crossorigin="anonymous" />
    </div>

    <div class='canvas-container'>
      <canvas ref='canvas'></canvas>
    </div>

    <div slot='footer'>
      <el-button @click='onVisibleChange(false)'>取消</el-button>
      <el-button type='primary' :loading='isLoading' @click='confirmCrop'>确认裁切</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'ImageCorpDialog',
  data() {
    return {
      pointList: ['lt', 'rt', 'lb', 'rb', 'l', 'r', 't', 'b'],
      // 上下左右 对应的 东南西北
      directionKey: {
        t: 'n',
        b: 's',
        l: 'w',
        r: 'e'
      },
      // 剪切后样式，该尺寸为视图尺寸，非实际图片尺寸
      cropStyle: {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      },
      isLoading: false,
    }
  },
  computed: {
    ...mapState({
      isShowImageCorpDialog: state => state.editor.isShowImageCorpDialog,
    }),
    ...mapGetters([
      'activeElement',
    ]),
    originImageSrc() {
      return this.activeElement && this.activeElement.propsValue.imageSrc || ''
    },
    originImageWidth() {
      return this.activeElement && this.activeElement.commonStyle.width || 0
    },
    originImageHeight() {
      return this.activeElement && this.activeElement.commonStyle.height || 0
    },
  },
  methods: {
    onDialogOpened() {
      const cropContainer = this.$refs.cropContainer
      if (cropContainer) {
        this.cropStyle = {
          left: 0,
          top: 0,
          width: cropContainer.offsetWidth,
          height: cropContainer.offsetHeight,
        }
      }
    },
    onDialogClosed() {
      this.onDialogOpened()
      this.isLoading = false
    },
    onVisibleChange(visible) {
      this.$store.commit('updateImageCorpDialogVisible', visible)
    },
    confirmCrop() {
      const cropStyle = this.cropStyle
      const activeElement = this.activeElement

      this.isLoading = true

      const imageObj = new Image()
      imageObj.setAttribute('crossorigin', 'anonymous')
      imageObj.onload = () => {
        const imageWidth = imageObj.width
        const zoomRatio = imageWidth / this.$refs.cropContainer.offsetWidth

        const $canvas = this.$refs.canvas
        $canvas.width = this.cropStyle.width * zoomRatio
        $canvas.height = this.cropStyle.height * zoomRatio
        $canvas.style.border = '1px solid #000'
        const context = $canvas.getContext('2d')

        context.drawImage(imageObj, cropStyle.left * zoomRatio, cropStyle.top * zoomRatio,
          cropStyle.width * zoomRatio, cropStyle.height * zoomRatio, 0, 0, $canvas.width, $canvas.height)
        $canvas.toBlob(blob => {
          const form = new FormData()
          form.append('file', blob, 'upload.png')
          this.$http.upLoadFile(form)
            .then(resp => {
              if (resp.status === 200) {
                activeElement.propsValue.imageSrc = resp.data[0].sourceUrl
                activeElement.commonStyle.width = cropStyle.width
                activeElement.commonStyle.height = cropStyle.height

                this.isLoading = false

                this.$store.dispatch('addHistoryCache')

                this.$nextTick(() => {
                  this.onVisibleChange(false)
                })

              } else {
                this.$message.error(resp.message)
              }
            })
        })
      }
      imageObj.src = this.originImageSrc
  },
    /**
     * 获取point计算后样式
     * @param point
     * @returns {{}}
     */
    getPointStyle(point) {
      const pos = this.cropStyle
      const {width, height} = pos
      let hasT = /t/.test(point)
      let hasB = /b/.test(point)
      let hasL = /l/.test(point)
      let hasR = /r/.test(point)
      let newLeft = 0
      let newTop = 0
      if (point.length === 2) {
        newLeft = hasL ? 0 : width
        newTop = hasT ? 0 : height
      } else {
        // !#zh 上下点，宽度固定在中间
        if (hasT || hasB) {
          newLeft = width / 2
          newTop = hasT ? 0 : height
        }
        // !#zh 左右点，高度固定在中间
        if (hasL || hasR) {
          newLeft = hasL ? 0 : width
          newTop = height / 2
        }
      }
      return {
        marginLeft: (hasL || hasR) ? '-5px' : 0,
        marginTop: (hasT || hasB) ? '-5px' : 0,
        left: `${newLeft}px`,
        top: `${newTop}px`,
        cursor: point.split('').reverse().map(m => this.directionKey[m]).join('') + '-resize'
      }
    },
    /**
     * 鼠标点击可以的按钮resize事件
     */
    handleMouseDownOnPoint(point, downEvent) {
      downEvent.stopPropagation()
      downEvent.preventDefault()
      const pos = this.cropStyle
      let height = pos.height
      let width = pos.width
      let top = pos.top
      let left = pos.left
      let startX = downEvent.clientX
      let startY = downEvent.clientY

      let move = moveEvent => {
        let currX = moveEvent.clientX
        let currY = moveEvent.clientY
        let disY = currY - startY
        let disX = currX - startX

        let hasT = /t/.test(point)
        let hasB = /b/.test(point)
        let hasL = /l/.test(point)
        let hasR = /r/.test(point)

        pos.top = +top + (hasT ? disY : 0)
        pos.height = +height + (hasT ? -disY : hasB ? disY : 0)
        pos.left = +left + (hasL ? disX : 0)
        pos.width = +width + (hasL ? -disX : hasR ? disX : 0)

        if (pos.left < 0) pos.left = 0
        if (pos.top < 0) pos.top = 0
        if (pos.width + pos.left > this.originImageWidth) pos.width = this.originImageWidth - pos.left
        if (pos.height + pos.top > this.originImageHeight) pos.height = this.originImageHeight - pos.top
      }
      let up = () => {
        this.$emit('resize')
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
        document.removeEventListener('mouseleave', up)
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
      document.addEventListener('mouseleave', up)
    },
    onCropAreaMove(event) {
      event.stopPropagation()
      event.preventDefault()
      const pos = this.cropStyle
      const {left, top} = pos
      let startX = event.clientX
      let startY = event.clientY

      let move = moveEvent => {
        let currX = moveEvent.clientX
        let currY = moveEvent.clientY
        let disY = currY - startY
        let disX = currX - startX

        pos.top = +top + disY
        pos.left = +left + disX
      }
      let up = () => {
        this.$emit('resize')
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
        document.removeEventListener('mouseleave', up)
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
      document.addEventListener('mouseleave', up)
    },
  }
}
</script>

<style scoped lang='scss'>
  .crop-container {
    position: relative;
    border: 1px solid #DDD;
    margin: 0 auto;
    max-width: 100%;
  }

  .crop-area-shape {
    position: absolute;
    background: rgba(213, 250, 219, .2);
    outline: 2px dashed #25A589;
    max-width: 100%;
    cursor: move;
  }

  .edit-shape-point {
    width: 10px;
    height: 10px;
    background-color: #fff;
    border: 1px solid #59c7f9;
    border-radius: 10px;
    position: absolute;
    z-index: 1001;
  }

  .canvas-container {
    position: fixed;
    left: 99999px;
    top: 99999px;
    opacity: 0;
  }
</style>
