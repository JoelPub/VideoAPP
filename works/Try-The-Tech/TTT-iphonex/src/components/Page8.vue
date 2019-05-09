<template>
    <div class="page8">

        <div class="btn">
            <button class="outer" @click="outer" :class="{ styleA : flag, styleB : !flag}">探索外部维修</button>
            <button class="inner" @click="inner" :class="{ styleA : !flag, styleB: flag}">探索内部维修</button>
        </div>

        <img src="@/assets/c8.png" class="fullScreen" alt="图片无法加载">
        
        <div class="info">
            <div class="elec">
                <span class="col1">{{ info.elec[0] }}</span>
                <span class="col2">{{ info.elec[1] }}</span>
                <span class="col3">{{ info.elec[2] }}</span>
            </div>
            <div class="tyre">
                <span class="col1">{{ info.tyre[0] }}</span>
                <span class="col2">{{ info.tyre[1] }}</span>
                <span class="col3">{{ info.tyre[2] }}</span>
            </div>
        </div>
    </div>
</template>

<script>
const outerInfo = {
  elec: ['电池', '续航里程300公里', '超过240,000公里后电池性能退化10%'],
  tyre: ['轮胎换位和检查', '建议：每20,000公里', '预估费用：¥200']
}

const innerInfo = {
  elec: ['制动液更换', '建议：每50,000公里', '预估费用：¥300'],
  tyre: ['充电端口', '240伏／110伏充电能力', '*查看家用充电选项']
}

export default {
  data() {
    return {
      info: outerInfo,
      flag: true
    }
  },

  methods: {
    outer() {
      this.info = outerInfo
      this.flag = !this.flag
    },

    inner() {
      this.info = innerInfo
      this.flag = !this.flag
    }
  }
}
</script>


<style lang="less">
.styleA {
  background-color: #5a5a5a;
  color: #fff;
}

.styleB {
  background-color: #fff;
  color: #000;
}

.page8 {
  .btn {
    width: 72%;
    display: flex;
    justify-content: space-between;
    margin: 50px auto;

    > button {
      width: 123px;
      height: 50px;
      border: 1px solid #5a5a5a;
      //   background-color: #fff;
      cursor: pointer;
    }
  }

  .info {
    margin-left: 30px;

    > div {
      margin: 60px 0;
      display: flex;
      flex-direction: column;
      color: #4f4f4f;

      > span {
        margin: 5px 0;
      }

      .col1 {
        font-size: 36px;
        font-weight: bold;
      }

      .col2,
      .col3 {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
}
</style>

