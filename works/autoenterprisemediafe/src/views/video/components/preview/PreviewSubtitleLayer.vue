<template>
  <div class="preview-subtitle-layer"
       :class="{
         'is-selected': isSelected,
         'is-editing': isEditing,
       }"
       :style="position"
       @click.stop="selectItem"
       @mousedown='onLayerMove'
       @dblclick="startEdit"
  >
    <div
      v-if="isSelected && !isPlaying"
      class='edit-shape-point'
      v-for='item in pointList'
      :key='item'
      @mousedown='handleMouseDownOnPoint(item, $event)'
      :style='getPointStyle(item)'
    ></div>

    <div v-if="!isEditing" ref="textContainer" class="text-container" :style="subtitleStyle">{{ subtitle.text }}</div>
    <input v-if="isEditing" class="editing-input"
           ref="textInput"
           :value="subtitle.text"
           :style="subtitleStyle"
           type="text"
           @input="onTextChange"
    />
  </div>
</template>

<script>
  export default {
    name: "PreviewSubtitleLayer",
    props: {
      subtitle: {
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
        isEditing: false,
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
          left: this.subtitle.left / this.zoomRatio + 'px',
          top: this.subtitle.top / this.zoomRatio + 'px',
          width: this.subtitle.width / this.zoomRatio + 'px',
          height: this.subtitle.height / this.zoomRatio + 'px',
        }
      },
      isSelected() {
        return this.selectedItemUUID === this.subtitle.uuid
      },
      subtitleStyle() {
        return {
          fontSize: this.subtitle.fontSize / this.zoomRatio + 'px',
          fontWeight: this.subtitle.fontWeight,
          color: this.subtitle.color,
          textAlign: this.subtitle.textAlign,
          lineHeight: this.subtitle.height / this.zoomRatio + 'px',
        }
      },
    },
    mounted() {
      document.addEventListener('click', this.stopEdit, false)
    },
    beforeDestroy() {
      document.removeEventListener('click', this.stopEdit, false)
    },
    methods: {
      startEdit() {
        this.isEditing = true
        this.$nextTick(() => {
          this.$refs.textInput.focus()
        })
      },
      stopEdit() {
        this.isEditing = false
      },
      onTextChange(e) {
        this.subtitle.text = e.target.value
      },
      selectItem() {
        this.$store.commit('SET_SELECTED_ITEM', this.subtitle)
      },
      getPointStyle(point) {
        const width = this.subtitle.width / this.zoomRatio
        const height = this.subtitle.height / this.zoomRatio
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

        const {left, top, width, height} = this.subtitle
        const {clientX: startX, clientY: startY} = downEvent

        let move = moveEvent => {
          let currX = moveEvent.clientX
          let currY = moveEvent.clientY
          let disY = (currY - startY) * this.zoomRatio
          let disX = (currX - startX) * this.zoomRatio

          let hasT = /t/.test(point)
          let hasB = /b/.test(point)
          let hasL = /l/.test(point)
          let hasR = /r/.test(point)

          this.subtitle.top = +top + (hasT ? disY : 0)
          this.subtitle.height = +height + (hasT ? -disY : hasB ? disY : 0)
          this.subtitle.left = +left + (hasL ? disX : 0)
          this.subtitle.width = +width + (hasL ? -disX : hasR ? disX : 0)
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
        if (!this.isSelected || this.isEditing) {
          return
        }

        event.stopPropagation()
        event.preventDefault()

        const {left: oldLeft, top: oldTop} = this.subtitle
        const {clientX: startX, clientY: startY} = event

        let move = moveEvent => {
          this.subtitle.top = oldTop + (moveEvent.clientY - startY) * this.zoomRatio
          this.subtitle.left = oldLeft + (moveEvent.clientX - startX) * this.zoomRatio
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
  .preview-subtitle-layer {
    position: absolute;
    cursor: pointer;
    z-index: 3;

    &.is-selected {
      outline: 2px dashed #25A589;
      cursor: move;
    }

    &.is-editing {
      cursor: text;
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

  .is-editing .edit-shape-point {
    display: none;
  }

  .editing-input {
    width: 100%;
    height: 100%;
    color: #333 !important;
  }

  .text-container {
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
