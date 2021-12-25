<template>
  <div class="page-wait">
    <div class="page-wait-mask flex-box">
      <img src="../../assets/imgs/deving.png" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.page-wait {
  flex: 1 0 auto;
  background: url('../../assets/imgs/data-bg.png');
  background-size: 100% auto;
  background-repeat: repeat-y;
  position: relative;
  .page-wait-mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    right: 0;
    img {
      width: 33%;
      height: auto;
    }
  }
}
</style>
