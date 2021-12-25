<template>
  <div class="editor-pane" @click="handleClickCanvas" @keyup.esc="handleKeyup">
    <div class="editor-pane-inner">
      <div class="editor-main" :class="{'editor-transparent': projectData.background=='transparent'}"
           :style="{
              transform: 'scale('+scale+')',
              backgroundColor: projectData.background == 'transparent' ? '' : projectData.background,
              width: projectData.width + 'px',
              height: projectData.height + 'px'
      }"
      >

        <div class="page-preview-wrapper" ref="canvas-panel" id="canvas-panel" :style="getCommonStyle(activePage.commonStyle)">
          <!--页面组件列表展示-->
          <edit-shape
                  v-for="item in activePage.elements"
                  :key="item.uuid"
                  :uuid="item.uuid"
                  :defaultStyle="item.commonStyle"
                  :canvas-scale="scale"
                  :style="getCommonStyle(item.commonStyle)"
                  @handleElementClick="handleElementClick(item.uuid)"
                  @resize="handleElementResize"
                  :active="item.uuid === activeElementUUID">
            <component :is="item.elName" class="element-on-edit-pane" v-bind="{...item.propsValue, value: item.value}"/>
          </edit-shape>
        </div>
        <div class="page-wrapper-mask"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { _qk_register_components_object } from '@client/plugins/index'
import editShape from '@/components/edit-shape'
import editorProjectConfig from '@client/views/h5/DataModel'
import { mapState, mapGetters } from 'vuex'
import html2canvas from 'html2canvas'

// todo 测试用
window._qk_register_components_object = _qk_register_components_object
export default {
  props: {
    // canvas画板缩放
    scale: {
      type: Number,
      default: 1
    }
  },
  components: {
    // 批量注册qk组件
    ..._qk_register_components_object,
    // 画板组件
    EditShape: editShape
  },
  data() {
    return {
      getCommonStyle: editorProjectConfig.getCommonStyle,
    }
  },
  computed: {
    ...mapState({
      projectData: state => state.editor.projectData,
      activePageUUID: state => state.editor.activePageUUID,
      activeElementUUID: state => state.editor.activeElementUUID
    }),
    ...mapGetters([
      'currentPageIndex',
      'activeElementIndex',
      'activeElement',
      'activePage'
    ])
  },
  mounted() {
    document.addEventListener('keyup', this.onEditorKeypress, false)
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.onEditorKeypress, false)
  },
  methods: {
    /**
			 * 元素被点击
			 * @param uuid
			 */
    handleElementClick(uuid) {
      this.$store.dispatch('setActiveElementUUID', uuid)
    },
    /**
			 * 移动改变元素大小定位
			 * @param pos 当pos有值表示移动中需要实时同步样式变化，pos为undefind时则表示移动结束，记一次历史纪录
			 * 鼠标移动完成时才记入历史纪录
			 */
    handleElementResize(pos) {
      if (!pos) {
        this.$store.dispatch('addHistoryCache')
        return
      }
      this.projectData.pages[this.currentPageIndex].elements[this.activeElementIndex].commonStyle.left = pos.left
      // 更新元素commonStyle
      this.projectData.pages[this.currentPageIndex].elements[this.activeElementIndex].commonStyle = {
        ...pos
      }
      this.$emit('size-change', pos)
    },
    handleClickCanvas(e) {
      if (!e.target.classList.contains('element-on-edit-pane') && !e.target.classList.contains('menu-item-on-edit-panel')) {
        this.$store.dispatch('setActiveElementUUID', '')
      }
    },
    /**
			 * 对元素进行操作命令
			 */
    handleElementCommand(command) {
      this.$store.dispatch('elementCommand', command)
    },
    /**
			 * 监听键盘事件
			 * @param e
			 */
    handleKeyup(e) {
      console.log(1111, e)
    },
    /**
			 * 提供截屏作为项目主图
			 */
    screenshots() {
      const el = document.querySelector('#canvas-panel')
      html2canvas(el, {
        width: 375,
        height: 667,
        proxy: '/htmltocanvas/corsproxy' // 设置跨域接口
      }).then(canvas => {
        const url = canvas.toDataURL('image/jpeg')
        this.$store.commit('updateCoverImage', url)
      })
    },

    onEditorKeypress(event) {
      // 当前焦点元素为输入框时，忽略键盘事件
      const tagName = document.activeElement.tagName
      if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
        return
      }

      // 当前没有选中元素时，忽略键盘事件
      if (!this.activeElement) {
        return
      }

      const activeElement = this.activeElement

      // 按方向键移动当前元素位置
      if (event.keyCode >= 37 && event.keyCode <= 40) {
        event.preventDefault()
        event.stopPropagation()

        if (event.keyCode === 37) {
          // ArrowLeft
          activeElement.commonStyle.left -= 20
        } else if (event.keyCode === 38) {
          // ArrowUp
          activeElement.commonStyle.top -= 20
        } else if (event.keyCode === 39) {
          // ArrowRight
          activeElement.commonStyle.left += 20
        } else if (event.keyCode === 40) {
          // ArrowDown
          activeElement.commonStyle.top += 20
        }
        this.$nextTick(() => {
          this.$store.dispatch('addHistoryCache')
        })
        return
      }


      switch (event.keyCode) {
        case 8: // Backspace
        case 46: // Delete
          this.handleElementCommand('delete')
          break

        case 90: // Z
          const ctrl = event.ctrlKey || event.metaKey
          const shift = event.shiftKey
          if (!ctrl) {
            return
          }
          if (shift) {
            this.$store.dispatch('editorRedo')
          } else {
            this.$store.dispatch('editorUndo')
          }
      }

    },
  }
}
</script>

<style lang="scss" scoped>
  .editor-pane {
    height: 100%;
    width: 100%;
    border: 1px solid #f5f5f5;
    border-width: 0 1px;
    //background-image: linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0), linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0);
    background-position: 0 0, 13px 13px;
    background-size: 26px 26px;
    display: flex;
    justify-content: center;
  }

  .editor-pane-inner {
    height: 100%;
    width: 100%;
    overflow: auto;
    padding: 20px;
    &::-webkit-scrollbar {
      display: block;
      width: 10px;
      height: 10px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      box-shadow: inset 0 0 5px rgb(0, 0, 0 / 20%);
      background: #535353;
      width: 30px;
      display: block;
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background: #ccc;
    }
  }

  .editor-main {
    border-radius: 3px;
    box-shadow: 0 3px 10px #E7E8F1;
    margin: 25px auto;
    position: relative;
    background: white;
    transform-origin: center top;
  }

  .editor-transparent {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAgMAAAC5h23wAAAAAXNSR0IB2cksfwAAAAlQTFRF9fX18PDwAAAABQ8/pgAAAAN0Uk5T/yIA41y2EwAAABhJREFUeJxjYIAC0VAQcGCQWgUCDUONBgDH8Fwzu33LswAAAABJRU5ErkJggg==");

  }

  .page-preview-wrapper {
    height: 100%;
    position: relative;
  }

  .page-wrapper-mask {
    height: 100%;
    width: 100%;
    z-index: 1000;
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    outline: rgba(236, 238, 240, 0.77) solid 10000px;
  }

  .element-on-edit-pane {
    height: 100%;
    width: 100%;
    // overflow: hidden;
  }
</style>
