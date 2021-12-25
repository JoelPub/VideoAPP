<template>
  <div class="flex-betweens">
    <div style="display: flex;align-items: center">
      <div style="width: 100px">文件名称:</div>
      <input :value="value" @input="inputEv" class="el-input__inner" style="height: 28px" />
    </div>>
    <div class="flex-between">
      <el-dropdown split-button  @click="save" @command='onSaveCommand' style='margin: 0 12px'>
        保&nbsp;存
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command='saveAndShare'>保存并分享</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button style='width: 100px' @click='exportVideo'>导出视频</el-button>
      <el-button style='width: 100px' @click='cancelFn'>退出</el-button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import {formatVideoData} from "@/tools/videoUtils"

export default {
  props: {
    value: {
      type: String
    }
  },
  computed: {
    videoData() {
      return this.$store.state.video.videoData
    },
  },
  methods: {
    inputEv(e) {
      const val = e.target.value
      this.$emit('input', val)
    },

    save() {
      this.$emit('save')
    },
    exportVideo() {
      this.$emit('exportVideo')
    },
    onSaveCommand(cmd) {
      if (cmd === 'saveAndShare') {
        this.$emit('saveAndShare')
      }
    },
    cancelFn() {
      this.$confirm('确认退出编辑?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/publicAssets')
      }).catch(() => {})
    },
  }
}
</script>

<style scoped lang="scss">
.flex-betweens {
  display: flex;
  justify-content: space-between;
  .flex-between {
    display: flex;
    justify-content: center;
  }
}

</style>
