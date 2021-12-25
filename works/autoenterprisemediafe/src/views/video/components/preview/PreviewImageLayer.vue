<template>
  <div class="preview-image-layer"
       :class="{'is-selected': isSelected}"
       :style="position"
       @click="selectItem"
       @mousedown='onLayerMove'
  >
    <div
      v-if="isSelected && !isPlaying"
      class='edit-shape-point'
      v-for='item in pointList'
      :key='item'
      @mousedown='handleMouseDownOnPoint(item, $event)'
      :style='getPointStyle(item)'
    ></div>

    <img :src="image.source" alt="" />
  </div>
</template>

<script>
  export default {
    name: "PreviewImageLayer",
    props: {
      image: {
        type: Object,
        required: true,
      },
      zoomRatio: {
        type: Number,
        default: 1,
      },
    },
    data() {
      return {
        pointList: ['lt', 'rt', 'lb', 'rb', 'l', 'r', 't', 'b'],
        directionKey: {
          t: 'n',
          b: 's',
          l: 'w',
          r: 'e'
        },
      }
    },
    computed: {
      selectedItemUUID() {
        return this.$store.state.video.selectedItemUUID
      },
      isPlaying() {
        return this.$store.state.video.isPlaying
      },
      position() {
        return {
          left: this.image.left / this.zoomRatio + 'px',
          top: this.image.top / this.zoomRatio + 'px',
          width: this.image.width / this.zoomRatio + 'px',
          height: this.image.height / this.zoomRatio + 'px',
        }
      },
      isSelected() {
        return this.selectedItemUUID === this.image.uuid
      },
    },
    methods: {
      selectItem() {
        this.$store.commit('SET_SELECTED_ITEM', this.image)
      },
      getPointStyle(point) {
        const width = this.image.width / this.zoomRatio
        const height = this.image.height / this.zoomRatio
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
      handleMouseDownOnPoint(point, downEvent) {
        downEvent.stopPropagation()
        downEvent.preventDefault()

        const {left, top, width, height} = this.image
        const {clientX: startX, clientY: startY} = downEvent
        const aspectRatio = width / height

        let move = moveEvent => {
          let currX = moveEvent.clientX
          let currY = moveEvent.clientY
          let disY = (currY - startY) * this.zoomRatio
          let disX = (currX - startX) * this.zoomRatio

          let hasT = /t/.test(point)
          let hasB = /b/.test(point)
          let hasL = /l/.test(point)
          let hasR = /r/.test(point)

          switch (point.length) {
            case 1:
              // 上下左右方向拖动
              this.image.top = +top + (hasT ? disY : 0)
              this.image.height = +height + (hasT ? -disY : hasB ? disY : 0)
              this.image.left = +left + (hasL ? disX : 0)
              this.image.width = +width + (hasL ? -disX : hasR ? disX : 0)
              break

            case 2:
              // 斜向拖动
              let newWidth = +width + (hasR ? disX : -disX)
              let newHeight = +height + (hasB ? disY : -disY)

              if (Math.abs(disX) > Math.abs(disY)) {
                newHeight = newWidth * (1 / aspectRatio)
              } else {
                newWidth = newHeight * aspectRatio
              }

              this.image.left = left + (hasL ? (width - newWidth) : 0)
              this.image.top = top + (hasT ? (height - newHeight) : 0)
              this.image.width = newWidth
              this.image.height = newHeight
          }
        }

        let up = () => {
          document.removeEventListener('mousemove', move, false)
          document.removeEventListener('mouseup', up, false)
          document.removeEventListener('mouseleave', up, false)
          this.$store.commit('ADD_HISTORY_CACHE')
        }
        document.addEventListener('mousemove', move, false)
        document.addEventListener('mouseup', up, false)
        document.addEventListener('mouseleave', up, false)
      },
      onLayerMove(event) {
        if (!this.isSelected) {
          return
        }

        event.stopPropagation()
        event.preventDefault()

        const {left: oldLeft, top: oldTop} = this.image
        const {clientX: startX, clientY: startY} = event

        let move = moveEvent => {
          this.image.top = oldTop + (moveEvent.clientY - startY) * this.zoomRatio
          this.image.left = oldLeft + (moveEvent.clientX - startX) * this.zoomRatio
        }

        let up = () => {
          document.removeEventListener('mousemove', move, false)
          document.removeEventListener('mouseup', up, false)
          document.removeEventListener('mouseleave', up, false)
          this.$store.commit('ADD_HISTORY_CACHE')
        }

        document.addEventListener('mousemove', move, false)
        document.addEventListener('mouseup', up, false)
        document.addEventListener('mouseleave', up, false)
      },
    },
  }
</script>

<style scoped lang="scss">
  .preview-image-layer {
    position: absolute;
    cursor: pointer;
    z-index: 2;

    &.is-selected {
      outline: 2px dashed #25A589;
      cursor: move;
    }

    img {
      width: 100%;
      height: 100%;
    }
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
</style>
