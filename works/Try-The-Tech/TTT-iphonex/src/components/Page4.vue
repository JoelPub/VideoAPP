<template>
    <div class="page4">
        <div class="picture">
            <Carousel autoplay class="x" v-model="value" loop :autoplay-speed="3500">
                <CarouselItem>
                    <div class="demo-carousel">
                        <img src="@/assets/p1.png" class="" alt="图片无法加载">
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div class="demo-carousel">
                        <img src="@/assets/p2.png" class="" alt="图片无法加载">
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div class="demo-carousel">
                        <img src="@/assets/p3.png" class="" alt="图片无法加载">
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div class="demo-carousel">
                        <img src="@/assets/p4.png" class="" alt="图片无法加载">
                    </div>
                </CarouselItem>
            </Carousel>
            
            <img src="@/assets/more.png" class="more" alt="图片无法加载" @click="showMap">
        </div>

        <div class="map" :style="{display: show ? 'block' : 'none'}" id="map">
            <img :src="require(`@/assets/map${influenceNum + 1}.png`)" class="more" alt="图片无法加载">
            <img :src="require(`@/assets/map-info.png`)" class="a absolute" alt="图片无法加载">
            <img :src="require(`@/assets/map-highspeed-${influence1 ? 'A' : 'B'}.png`)" class="b absolute" @click="putInfluence(1)" alt="图片无法加载">
            <img :src="require(`@/assets/map-badWether-${influence2 ? 'A' : 'B'}.png`)" class="c absolute" @click="putInfluence(2)" alt="图片无法加载">
            <img :src="require(`@/assets/map-temp-${influence3 ? 'A' : 'B'}.png`)" class="d absolute" @click="putInfluence(3)" alt="图片无法加载">
        </div>
        
        <!-- <img src="@/assets/banner2.png" class="" alt="图片无法加载"> -->
    </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0, //轮播图计数器
      show: false, // 控制地图的显示隐藏,
      influenceNum: 0,
      influence1: false,
      influence2: false,
      influence3: false
    }
  },
  methods: {
    showMap() {
      this.show = true
      setTimeout(() => {
        document.getElementById('map').scrollIntoView()
      }, 200)
    },

    putInfluence(payload) {
      this.influenceNum = this['influence' + payload]
        ? this.influenceNum - 1
        : this.influenceNum + 1
      this['influence' + payload] = !this['influence' + payload]
    }
  }
}
</script>


<style lang="less" scoped>
.page4 {
  width: 100%;
  height: 1612px;
  //   overflow: hidden;

  .picture {
    position: relative;

    .more {
      position: absolute;
      left: 37px;
      bottom: 100px;
    }
  }

  .map {
    position: relative;
    margin-top: -5px;

    .absolute {
      position: absolute;
    }

    .a {
      top: 50px;
      right: 0;
    }

    .b {
      top: 90px;
      right: 0;
    }

    .c {
      top: 160px;
      right: 0;
    }

    .d {
      top: 230px;
      right: 0;
    }
  }
}
</style>

