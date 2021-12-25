<template>
  <div class="page-init">
    <div class="page-init-bg">
      <div class="page-init-bg-logo"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Init',
  mounted () {
    setTimeout(() => {
      this.$router.replace('/login')
    }, 3000)
  }
}
</script>

<style lang="less" scoped>
.page-init-bg {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url('../assets/imgs/init-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.page-init-bg-logo {
  width: 536px;
  height: 175px;
  position: absolute;
  top: 50%;
  left: 56%;
  transform: translate(0,-50%);
  background: url('../assets/imgs/init-logo-bg.png') no-repeat;
  background-size: 100%;
}
</style>
