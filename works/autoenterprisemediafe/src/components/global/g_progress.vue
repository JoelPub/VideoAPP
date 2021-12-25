<template>
  <div class="g-progress">
    <el-progress type="circle" :percentage="percentage"></el-progress>
  </div>
</template>

<script>
export default {
  props: ['ifEndUp', 'ifInterrupt'],
  data() {
    return {
      percentage: 0
    }
  },
  created() {
    let interval1 = 0
    let interval2 = 1
    interval1 = setInterval(() => {
      console.log(this.ifEndUp)
      if (this.ifInterrupt) {
        clearInterval(interval1)
        this.$emit('closeProgressDialog')
      } else if (this.ifEndUp) {
        this.percentage = 100
        clearInterval(interval1)
      } else if (this.percentage >= 90) {
        clearInterval(interval1)
        interval2 = setInterval(() => {
          if (this.ifInterrupt) {
            clearInterval(interval2)
            this.$emit('closeProgressDialog')
          } else if (this.ifEndUp) {
            this.percentage = 100
            clearInterval(interval2)
          } else if (this.percentage >= 98) {
            // clearInterval(interval2)
          } else this.percentage += 2
          if (this.percentage >= 100) {
            this.$emit('closeProgressDialog', true)
          }
        }, 500)
      } else {
        this.percentage += 2
      }
      if (this.percentage >= 100) {
        this.$emit('closeProgressDialog', true)
      }
    }, 100)
  }
}
</script>

<style lang="less" scoped>
.g-progress {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(51, 51, 51, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<style lang="less">
.g-progress {
  .el-progress__text {
    color: #fff;
  }
}
</style>
