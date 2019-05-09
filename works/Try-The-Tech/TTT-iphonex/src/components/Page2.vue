<template>
    <div class="page2">
        <img src="@/assets/c2-1.png" class="fullScreen" alt="图片无法加载">
        <div class="slide">
            <img src="@/assets/home2.png" alt="图片无法加载">

            <div class="slide-container">
                <Slider v-model="value" show-tip="always" :tip-format="format"></Slider>
            </div>
            
            <img src="@/assets/company2.png" alt="图片无法加载">
        </div>

        <img src="@/assets/c2-2.png" class="fullScreen" alt="图片无法加载">

        <div class="times">
            <div class="trip">
                <span class="tripTimes a">{{tripTimes}}</span>
                <span class="tripInfo b">单程次数</span>
            </div>
            <div class="charge">
                <span class="chargeTimes a">{{chargeTimes}}</span>
                <span class="chargeInfo b">每周充电次数</span>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  data() {
    return {
      value: 30,
      left: 25,
      initPositionX: 0,
      is_beening_clicked: false
    }
  },

  computed: {
    tripTimes() {
      if (this.value === 0) return '9999+'
      return Math.floor(300 / this.value)
    },

    chargeTimes() {
      return Math.floor(7 / (150 / this.value))
    }
  },

  methods: {
    format(value) {
      return `${value} KM`
    }
  }
}
</script>


<style lang="less">
.page2 {
  width: 100%;

  .ivu-slider-bar {
    background-color: gray;
  }

  .ivu-slider-button {
    border: 0.125rem solid gray;
    width: 25px;
    height: 25px;
    position: relative;
    top: -7px;
  }

  .ivu-tooltip-popper {
    top: -55px !important;
    left: -17px !important;
  }

  .slide {
    display: flex;
    justify-content: space-around;
    margin: 20px 0;

    .slide-container {
      position: relative;
      width: 70%;
      margin: 0 10px;

      > div {
        margin-top: 22px;
      }

      .ivu-slider-button {
        // width: 1rem;
        // height: 1rem;
      }

      .track {
        position: absolute;
        width: 100%;
        height: 3px;
        background: #cec6c6;
        top: 25px;
        left: 0;
      }

      .block {
        width: 66px;
        height: 66px;
        border-radius: 50%;
        background: palevioletred;
        position: absolute;
        top: -35px;
        /* left: 1px; */
        cursor: pointer;
      }
    }
  }

  .times {
    display: flex;
    justify-content: center;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .a {
      font-size: 35px;
    }

    .b {
      font-size: 15px;
    }

    .trip {
      padding-right: 60px;
      border-right: 1px solid rgba(0, 0, 0, 0.507);
    }
    .charge {
      padding-left: 60px;
    }
  }
}
</style>

