<template>
  <div class="page-wrapper-menu-operation menu-item-on-edit-panel" :class="{active: activeElementUUID}">
    <el-tooltip v-for="(item, index) in menuOptions" :key="index" effect="dark" :content="item.title"
                placement="right">
      <div class="menu-item menu-item-on-edit-panel" @click="handleElementCommand(item.value)">
        <i class="menu-item-on-edit-panel" :class="[item.icon]"></i>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ElementOperationMenu',
  data() {
    return {
      menuOptions: [{
        title: '复制',
        icon: 'iconfont iconfuzhi',
        value: 'copy'
      }, {
        title: '删除',
        icon: 'iconfont iconshanchu',
        value: 'delete'
      }, {
        title: '字体放大',
        icon: 'iconfont iconzitifangda',
        value: 'fontA+'
      }, {
        title: '字体缩小',
        icon: 'iconfont iconzitisuoxiao',
        value: 'fontA-'
      }, {
        title: '字体加粗',
        icon: 'iconfont iconzitijiacu',
        value: 'fontB'
      }, {
        title: '图层上移',
        icon: 'iconfont iconziyuan1',
        value: 'layerUp'
      }, {
        title: '图层下移',
        icon: 'iconfont iconxiayiyiceng',
        value: 'layerDown'
      }, {
        title: '图层置顶',
        icon: 'iconfont iconcontrol-top',
        value: 'layerTop'
      }, {
        title: '图层置底',
        icon: 'iconfont iconcontrol-bottom',
        value: 'layerBottom'
      }, {
        title: '图片裁切',
        icon: 'el-icon-scissors',
        value: 'imageCrop',
      }]
    }
  },
  computed: {
    ...mapState({
      activeElementUUID: state => state.editor.activeElementUUID
    }),
  },
  methods: {
    /**
     * 对元素进行操作命令
     */
    handleElementCommand(command) {
      this.$store.dispatch('elementCommand', command)
    },
  }
}
</script>

<style scoped lang='scss'>
.page-wrapper-menu-operation {
  position: fixed;
  right: 340px;
  top: 150px;
  background: white;
  color: #333;
  text-align: center;
  z-index: 1002;
  border-radius: 4px;
  display: none;
  transition: all 0.28s;
  opacity: 0;
  transform-origin: center top;
  .menu-item {
    padding: 10px;
    cursor: pointer;
    &.i {
      font-size: 24px;
      line-height: 30px;
    }
    &:hover {
      background: rgba(37, 165, 137, 0.09);
      color: $primary;
      &.i {
        font-weight: bold;
        font-size: 26px;
      }
    }
  }
  &.active {
    display: block;
    width: 60px;
    opacity: 1;
  }
}
</style>
