<template>
  <div class='components-contrl-bar'>
    <div style='display: flex;align-items: center'>
      <div style='width: 100px'>文件名称:</div>
      <input :value='value' @input='inputEv' class='el-input__inner' style='height: 28px'></input>
    </div>

    <div>
      <div class='button-item scale-wrappper'>
      <span class='scale-btn' @click="updateScale('reduce')">
        <i class='el-icon-zoom-out'></i>
      </span>
        <span class='scale-input'>{{ parseFloat(scaleValue * 100).toFixed(0) }}%</span>
        <span class='scale-btn' @click="updateScale('plus')">
        <i class='el-icon-zoom-in'></i>
      </span>
      </div>
      <div class='button-item' :class='{disabled: !canUndo}' @click='editorUndo'>
        <i class='iconfont iconundo1'></i>
        <p>撤销</p>
      </div>
      <div class='button-item' :class='{disabled: !canRedo}' @click='editorRedo'>
        <i class='iconfont iconredo1'></i>
        <p>重做</p>
      </div>
    </div>
    <div class='action-menu'>

      <el-button style='width: 100px' @click='showPreview'>预览</el-button>
      <el-dropdown split-button  @click="save" @command='onSaveCommand' style='margin: 0 12px'>
        保&nbsp;存
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command='saveAndShare'>保存并分享</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button style='width: 100px' @click='cancelFn'>退出</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UploadPsd from '@client/components/upload-psd'

/**
 * 控制按钮
 */
export default {
  components: {
    UploadPsd
  },
  props: {
    // 是否loading
    loading: {
      type: Boolean,
      default: false
    },
    scale: {
      type: Number,
      default: 1
    },
    value: {
      type: String
    }
  },
  data () {
    return {
      // 画板缩放
      scaleValue: 1,
      hasSave: false
    }
  },

  computed: {
    ...mapGetters([
      'canUndo',
      'canRedo'
    ])
  },
  // created () {
  //   this.scaleValue = this.scale
  // },
  watch: {
    fileName(newVal) {
      this.$emit('change', newVal)
    },
    scale: {
      immediate: true,
      handler(val) {
        this.scaleValue = val
      },
    }
  },
  methods: {
    inputEv(e) {
      let val = e.target.value;
      this.$emit("input", val);
    },

    ...mapActions([
      'editorUndo',
      'editorRedo'
    ]),
    /**
			 * 更新画板大小
			 */
    updateScale (type, value) {
      if (type === 'plus') {
        this.scaleValue = this.scaleValue + (value || 0.1) > 2 ? 2 : this.scaleValue + (value || 0.1)
      } else if (type === 'reduce') {
        this.scaleValue = this.scaleValue - (value || 0.1) > 0.2 ? this.scaleValue - (value || 0.1) : 0.2
      } else if (type === 'reset') {
        this.scaleValue = value || 1
      }

      this.$emit('update:scale', this.scaleValue)
    },

    /**
			 * 点击保存按钮
			 */
    save () {
      this.$emit('save')
      this.hasSave = true
    },

    onSaveCommand(cmd) {
      if (cmd === 'saveAndShare') {
        this.$emit('saveAndShare')
      }
    },

    /**
       * 显示预览
			 */
    showPreview () {
      this.$emit('showPreview')
    },

    // shareFn () {
    //   this.$http.IsShare({
    //     userId: localStorage.getItem('id'),
    //     type: '1'
    //   }).then(res => {
    //     if (res.data.isCheck == 2) {
    //       this.$alert('你是否愿意将本素材分享至经销商销素材库？', '提示', {
    //         confirmButtonText: '确定',
    //         callback: action => {
    //           this.$emit('shareFun')
    //         }
    //       })
    //     }
    //   })
    //
    // },
    cancelFn () {
      this.$emit('cancel')
    }
  },
}
</script>

<style lang="scss" scoped>
  .components-contrl-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 3;
    padding: 2px 30px;
    height: 50px;
    .button-item {
      display: inline-block;
      width: 60px;
      cursor: pointer;
      text-align: center;
      vertical-align: bottom;
      font-size: 14px;
      transition: color 0.28s, transform 0.28s;
      user-select: none;
      &.scale-wrappper {
        width: 110px;
        margin-right: 10px;
        &:hover {
          color: inherit;
          transform: none;
        }
        & > .scale-btn {
          display: inline-block;
          vertical-align: middle;
          padding: 6px 2px;
          font-size: 20px;
          transition: all 0.28s;
          &:hover {
            color: $primary;
          }
        }
      }
      &:hover {
        color: $primary;
        transform: scale(1.02);
        font-weight: bold;
      }
      &.disabled {
        cursor: not-allowed;
        color: $gray !important;
      }
      & > i {
        font-size: 18px;
        display: inline-block;
        transition: all 0.28s;
      }
      & > p {
        font-size: 14px;
      }
    }
  }

  .scale-input {
    display: inline-block;
    position: relative;
    padding: 7px 0;
    width: 46px;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    white-space: nowrap;
    border-radius: 17px;
    margin: 0 4px;
    &:hover {
      background: #dfdfdf;
    }
  }
  .action-menu{

  }
  .menu-item-item{
    width: 96px;
    height: 31px;
    background: #ECF5FF;
    border: 1px solid #A3D0FD;
    border-radius: 3px;
    color: #1989FA;
    font-size: 14px;;
    line-height: 31px;
    text-align:center;
  }
  .menu-item-item-gray{
    width: 96px;
    height: 31px;
    background: #EEEEEE;
    border: 1px solid #BEBEBE;
    border-radius: 3px;
    color: #606266;
    font-size: 14px;;
    line-height: 31px;
    text-align:center;
  }
</style>
