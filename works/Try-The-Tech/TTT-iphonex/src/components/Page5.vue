<template>
    <div class="page5" v-touch:left="onTapLeft" v-touch:right="onTapRight">
        <img src="@/assets/c5-1.png" class="fullScreen" alt="图片无法加载">  
        
        <div class="iconGroups">
            <img :src="require(`@/assets/icon1-${icon1 ? 'A' : 'B'}.png`)" class="x" :style="{marginLeft: left + 'px'}" alt="图片无法加载">  
            <img :src="require(`@/assets/icon2-${icon2 ? 'A' : 'B'}.png`)" class="" alt="图片无法加载">  
            <img :src="require(`@/assets/icon3-${icon3 ? 'A' : 'B'}.png`)" class="" alt="图片无法加载">             
        </div>   

        <img :src="require(`@/assets/c5-2-${flag}.png`)" class="fullScreen" alt="图片无法加载">  
    </div>
</template>

<script>
export default {
  data() {
    return {
      flag: 1,
      left: 0,
      icon1: true,
      icon2: false,
      icon3: false
    }
  },

  methods: {
    onTapLeft(e) {
      let { flag } = this
      if (flag < 3) {
        this.flag += 1
        this.left -= 160
        this['icon' + flag] = false
        this['icon' + (flag + 1)] = true
      }
    },

    onTapRight(e) {
      let { flag } = this
      if (flag > 1) {
        this.left += 160
        this.flag -= 1
        this['icon' + flag] = false
        this['icon' + (flag - 1)] = true
      }
    }
  }
}
</script>


<style lang="less">
.page5 {
  padding-bottom: 100px;
  position: relative;

  .iconGroups {
    position: relative;
    width: 375px;
    padding-left: 25px;
    padding-bottom: 80px;
    display: flex;
    overflow: hidden;

    > img {
      width: 140px;
      height: 140px;
      margin-right: 20px;
    }
  }
}
</style>

