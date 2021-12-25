<template>
  <div class="mask flex-box">
    <div class="dialog-contain">
      <p class="dialog-title">{{ dialogInfo.title }}</p>
      <div class="dialog-item" v-for="(item, i) in dialogInfo.content" :key="i">{{ item }}</div>
      <p class="dialog-remark">{{ dialogInfo.remark }}</p>
      <el-button class="dialog-btn" type="primary" @click="$bus.$emit('skip', {url: dialogInfo.path, eventTarget: 'g_dialog'})">{{ dialogInfo.btn }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogInfo: {}
    }
  },
  mounted () {
    this.$bus.$on('playDialog', (res) => {
      this.dialogInfo = res
    })
  }
}
</script>

<style lang="less">
.mask {
  background: rgba(51, 51, 51, .58);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 997;
  color: #333333;
}
.dialog-contain {
  background: #ffffff;
  box-shadow: 0px 6px 10px rgba(14, 40, 56, 0.16);
  padding: 66px 48px 44px;
  border-radius: 14px;
}
.dialog-title, .dialog-remark {
  text-align: center;
}
.dialog-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 36px;
}
.dialog-remark {
  margin: 46px 0 46px;
}
.dialog-btn {
  width: 330px;
  padding: 13px 0;
  font-size: 18px !important;
}
.dialog-item {
  margin: 20px 0 20px 12px;
}
</style>
