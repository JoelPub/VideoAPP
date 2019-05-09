<template>
    <div id="map-container" :style="{ height: height + 'px' }">
      <div class="influence">
        <h1>里程影响因素</h1>
        
        <div class="speed">
          <span class="name">
            行驶速度
          </span>
          <div class="mode">
            <div class="lowSpeed condition-unSelected" :class="{'condition-selected': lowSpeed}" @click="handleConditionChange('lowSpeed', true)">低速</div>
            <div class="highSpeed condition-unSelected" :class="{'condition-selected': !lowSpeed}" @click="handleConditionChange('lowSpeed', false)">高速</div>
          </div>
        </div>

        <div class="temp">
          <span class="name">
            室外温度
          </span>
          <div class="mode">
            <div class="lowTemp condition-unSelected" :class="{'condition-selected': temp === -1}" @click="handleConditionChange('temp', -1)">-10度</div>
            <div class="nomalTemp condition-unSelected" :class="{'condition-selected': temp === 0}" @click="handleConditionChange('temp', 0)">25度</div>
            <div class="highTemp condition-unSelected" :class="{'condition-selected': temp === 1}" @click="handleConditionChange('temp', 1)">35度</div>
          </div>
        </div>

        <div class="ac">
          <span class="name">
            空调
          </span>
          <div class="mode">
            <div class="open condition-unSelected" :class="{'condition-selected': !acClose}" @click="handleConditionChange('acClose', false)">开</div>
            <div class="close condition-unSelected" :class="{'condition-selected': acClose}" @click="handleConditionChange('acClose', true)">关</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import remoteLoad from '@/utils/remoteLoad.js'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  async mounted() {
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap && window.AMapUI) {
      this.initMap('map-container')
      // 未载入高德地图API，则先载入API再初始化
    } else {
      await remoteLoad(
        `https://webapi.amap.com/maps?v=1.4.8&key=ed11b5594bc7bfbafd53c3c1e04d7773`
      )
      await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
      this.initMap('map-container')
    }
  },

  beforeDestroy() {
    this.map && this.map.destroy()
  },

  data() {
    return {
      // lowSpeed: true, // true: 低速, false: 高速
      // temp: 0, // -1,0,1 分别代表‘低温’，‘常温’，‘高温’
      // acClose: true // true: 空调关了 false: 空调开了
    }
  },

  computed: {
    ...mapState({
      map: state => state.TryTheTech.map,
      height: state => state.TryTheTech.height,
      lowSpeed: state => state.TryTheTech.influence.lowSpeed,
      temp: state => state.TryTheTech.influence.temp,
      acClose: state => state.TryTheTech.influence.acClose
    })
  },

  methods: {
    ...mapActions(['initMap', 'changeInfluence', 'addBatterySign']),

    ...mapMutations(['CHANGE_INFLUENCE']),

    handleConditionChange(type, value) {
      this[type] !== value && this.changeInfluence({ type, value })
      this.addBatterySign()
    }
  }
}
</script>

<style lang="less" scoped>
#map-container {
  width: 100%;
  position: relative;

  .influence {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 100;
    width: 380px;
    height: 210px;
    top: 100px;
    right: 0;
    background-color: #f5f5f5;
    box-shadow: -1px 1px 10px -1px grey;

    > div {
      display: flex;
      text-align: left;
      margin-top: 20px;
      margin-left: 30px;

      .name {
        font-size: 18px;
        padding: 10px;
        line-height: 14px;
        width: 96px;
      }

      .mode {
        display: flex;

        > div {
          width: 70px;
          height: 30px;
          border: 1px solid #827d7d;
          // background-color: #a0afa9;
          font-size: 18px;
          text-align: center;
          // color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}

.condition-unSelected {
  background-color: #d6dad8;
}

.condition-selected {
  background-color: #76dab1;
}
</style>

