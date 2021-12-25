<template>
  <div class="timeline-clip-item"
       :class="{selected: item.uuid === selectedItemUUID}"
       style='background: #b7ffb2'
       :style="style"
       :title="fileName"
       @click="onItemClick"
       @mousedown="onMouseDown"
  >
    <div class="preview" :style="`background-image: url(${previewImage})`">
      <i v-if="icon" :class="icon"></i>
    </div>
    <div class='file-name'>{{ fileName }}</div>

    <div class="left-edge" @mousedown.stop="onEdgeDrag($event, 'left')"></div>
    <div class="right-edge" @mousedown.stop="onEdgeDrag($event, 'right')"></div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "TimelineClipItem",
    props: {
      type: String, // 类型。可选值为 image / video / audio / subtitle
      secondGutter: Number, // 每秒之间相差的像素数
      fileName: String,
      previewImage: String, // 预览图
      icon: String, // 使用图标代替预览图
      /**
       * 当前剪辑对象的原始数据
       * @type {{uuid: String, startTime: Number, endTime: Number}}
       */
      item: Object,
    },
    data() {
      return {}
    },
    computed: {
      ...mapState({
        selectedItemUUID: state => state.video.selectedItemUUID,
      }),
      style() {
        return {
          left: this.item.startTime * this.secondGutter + 'px',
          width: (this.item.endTime - this.item.startTime) * this.secondGutter + 'px',
        }
      },
    },
    methods: {
      onItemClick() {
        this.$store.commit('SET_SELECTED_ITEM', this.item)
      },
      onMouseDown(event) {
        const startX = event.clientX
        const oldStartTime = this.item.startTime
        const duration = this.item.endTime - this.item.startTime

        const mouseMove = (event) => {
          const diffX = event.clientX - startX
          const timeDiff = diffX / this.secondGutter
          let newStartTime = oldStartTime + timeDiff

          if (newStartTime < 0) newStartTime = 0
          if (newStartTime > 150) newStartTime = 150

          this.item.startTime = newStartTime
          this.item.endTime = newStartTime + duration
        }

        const mouseUp = () => {
          document.removeEventListener('mousemove', mouseMove, false)
          document.removeEventListener('mouseup', mouseUp, false)
          this.$store.commit('ADD_HISTORY_CACHE')
        }

        document.addEventListener('mousemove', mouseMove, false)
        document.addEventListener('mouseup', mouseUp, false)
      },
      onEdgeDrag(e, direction) {
        const startX = e.clientX
        const oldStartTime = this.item.startTime
        const oldEndTime = this.item.endTime

        const mouseMove = (event) => {
          const diffX = event.clientX - startX
          const timeDiff = diffX / this.secondGutter

          switch (direction) {
            case 'left':
              let newStartTime = oldStartTime + timeDiff
              if (newStartTime < 0) newStartTime = 0
              if (newStartTime >= oldEndTime) newStartTime = oldEndTime - 0.5

              this.item.startTime = newStartTime
              break

            case 'right':
              let newEndTime = oldEndTime + timeDiff
              if (newEndTime > 150) newEndTime = 150
              if (newEndTime <= oldStartTime) newEndTime = oldStartTime + 0.5

              this.item.endTime = newEndTime
          }
        }

        const mouseUp = () => {
          document.removeEventListener('mousemove', mouseMove, false)
          document.removeEventListener('mouseup', mouseUp, false)
          this.$store.commit('ADD_HISTORY_CACHE')
        }

        document.addEventListener('mousemove', mouseMove, false)
        document.addEventListener('mouseup', mouseUp, false)
      },
    },
  }
</script>

<style scoped lang="scss">
  .timeline-clip-item {
    position: absolute;
    top: 0;
    height: 100%;
    padding: 0 2px;

    display: flex;
    align-items: center;

    border: 1px solid #FFF;
    box-sizing: border-box;
    overflow: hidden;
    cursor: move;
    z-index: 1;

    &.selected {
      border: 1px solid #ffbe02;
    }

    .left-edge,
    .right-edge {
      position: absolute;
      left: 0;
      top: 0;
      width: 2px;
      bottom: 0;
      background: #ffbe02;
      cursor: ew-resize;
      z-index: 2;

      &:hover {
        background: darken(#ffbe02, 20%);
      }
    }

    .right-edge {
      left: auto;
      right: 0;
    }

    .preview {
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 1;
      color: #666;
      width: 34px;
      height: 34px;
      background: no-repeat center / cover;
      margin-right: 4px;
    }

    .file-name {
      flex: 1;
      width: 1px;
      color: #666;
      line-height: 34px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
