<template>
    <div class="page6">
      
        <img src="@/assets/c6-1.png" class="fullScreen" alt="图片无法加载"> 

        <div class="slide-container">
            <Slider v-model="value" show-tip="always" :tip-format="format" :max="1000"></Slider> <!-- <el-slider v-model="value" :show-tooltip="true" :format-tooltip="formatTooltip"></el-slider> -->
        </div>

        <div class="panel">
          <ul class="fuel">
            <li class="row1">燃油费</li>
            <li>百公里油耗：<InputNumber :max="10" :min="1" v-model="value1"/> 升</li>
            <li><InputNumber :max="10" :min="1" v-model="value2" :formatter="inputFormat" :parser="inputParse"/> /升</li>
            <li>燃油成本</li>
            <li>¥ {{fuelCost}}</li>
          </ul>
          <ul class="ev">
            <li class="row1">电费</li>
            <li>百公里电耗：15.9 kWh</li>
            <li><InputNumber :max="10" :min="1" v-model="value4" :formatter="inputFormat" :parser="inputParse"/> /kWh</li>
            <li>电的成本</li>
            <li>¥ {{elecCost}}</li>
          </ul>
        </div>

        <img src="@/assets/c6-2.png" class="fullScreen x" alt="图片无法加载"> 
        
    </div>
</template>

<script>
export default {
  data() {
    return {
      value: 700,
      value1: 10,
      value2: 7.0,
      value3: 15.9,
      value4: 0.49
      // fuelCost: 90000,
      // elecCost: 1700
    }
  },

  computed: {
    fuelCost() {
      const { value, value1, value2 } = this
      return Math.round(value * value1 * value2)
    },
    elecCost() {
      const { value, value3, value4 } = this
      return Math.round(value * value3 * value4)
    }
  },

  methods: {
    format(value) {
      return `行驶公里数 : ${value * 100}`
    },
    inputFormat(value) {
      return `¥ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')
    },
    inputParse(value) {
      return value.replace(/¥s?|(,*)/g, '')
    }
  }
}
</script>


<style lang="less">
.page6 {
  width: 375px;
  height: 842px;
  background-color: #bbbec3;

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
    // left: -17px !important;
  }

  .x {
    margin-top: -5px;
  }

  .slide-container {
    width: 70%;
    margin: 60px auto;
  }

  .panel {
    color: #000;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-around;

    > ul {
      font-size: 9px;

      > li {
        // margin-bottom: 10px;
        height: 40px;
        line-height: 40px;
      }

      > li:nth-child(1) {
        font-size: 16px;
        font-weight: bold;
      }

      > li:nth-child(4) {
        font-size: 16px;
        font-weight: bold;
        margin-top: 50px;
      }
      > li:nth-child(5) {
        font-size: 30px;
      }
    }

    input {
      // width: 40px;
      background-color: #bbbec3;
      color: #000;
    }

    a {
      background-color: #bbbec3;
    }

    .ivu-input-number {
      width: 70px;
      height: 30px;
      border: 1px solid black;
    }
  }

  .cost {
    display: flex;
    justify-content: space-around;
    color: #000;

    > ul {
      > li:nth-child(1) {
        font-size: 14px;
      }
      > li:nth-child(2) {
        font-size: 30px;
      }
    }
  }
}
</style>

