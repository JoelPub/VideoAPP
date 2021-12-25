<template>
  <div class="g_header" :style="{ width: ifAsideNav1 ? 'calc(100% - 282px)' : '100%' }">
    <g-aside-swith v-on:ifAsideNav="ifAsideNav" />
    <div style="flex: 1 0 auto;">
      <g-user />
      <g-logo />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ifAsideNav1: false
    }
  },
  methods: {
    ifAsideNav: function(ifAsideNav) {
      this.ifAsideNav1 = ifAsideNav
    }
  }
}
</script>

<style lang="less" scoped>
.g_header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 56px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 998;
  font-size: 14px;
  & > div {
    display: flex;
    justify-content: space-between;
  }
}
</style>
