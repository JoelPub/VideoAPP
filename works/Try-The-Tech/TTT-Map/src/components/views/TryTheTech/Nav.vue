<template>
    <div class="nav">

        <div class="filter" v-show="sign">
          
            <h1>您想去哪？</h1>
            <br>

            <!-- <el-input v-model="start" placeholder="起始点" prefix-icon="el-icon-location" @blur="handleStartBlur" clearable /> -->
            <el-autocomplete
                class="inline-input"
                prefix-icon="el-icon-location"
                v-model="start"
                :fetch-suggestions="querySearch"
                placeholder="出发地"
                @blur="handleStartBlur"
                clearable
            />
            <br>

            <!-- <el-input v-model="end" placeholder="目的地" prefix-icon="el-icon-location" @blur="handleEndBlur" clearable /> -->
            <el-autocomplete
                ref="endInput" 
                class="inline-input"
                prefix-icon="el-icon-location"
                v-model="end"
                :fetch-suggestions="querySearch"
                placeholder="目的地"
                @blur="handleEndBlur"
                @keyup.enter.native="handleBtnClick"
                clearable
            />
            <br>
            
            <el-button type="primary" @click="handleBtnClick">开始规划路线</el-button>
            <br>
        </div>

        <div class="ctrl">
            <img :src="ctrl" @click="handleCtrlClick" alt="">
        </div>

        <Amap />
        
    </div>
</template>

<script>
import Amap from "@/components/reusable/atom/Amap.vue"
import { mapState, mapMutations, mapActions } from "vuex"

export default {
  components: { Amap },

  mounted() {
    this.nameArray = this.loadAll()
    //   this.$refs.endInput.focus()
  },

  data() {
    return {
      nameArray: []
    }
  },

  computed: {
    ...mapState({
      TryTheTech: state => state.TryTheTech,
      map: state => state.TryTheTech.map,
      ctrl: state => state.TryTheTech.ctrl,
      sign: state => state.TryTheTech.sign
    }),

    start: {
      set(value) {
        this.SET_INPUT_VALUE({
          name: "start",
          value: value
        })
      },
      get() {
        return this.TryTheTech.start
      }
    },

    end: {
      set(value) {
        this.SET_INPUT_VALUE({
          name: "end",
          value: value
        })
      },
      get() {
        return this.TryTheTech.end
      }
    }
  },

  methods: {
    ...mapMutations(["SET_INPUT_VALUE", "CHANGE_CTRL_STATE"]),

    ...mapActions(["planTheRoute", "drawDrivingPath", "markerAndPoi"]),

    querySearch(queryString, cb) {
      const nameArray = this.nameArray
      const results = queryString
        ? nameArray.filter(this.createFilter(queryString))
        : nameArray
      // 调用 callback 返回建议列表的数据
      cb(results)
    },

    createFilter(queryString) {
      return e => e.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    },

    loadAll() {
      return [
        { value: "上海" },
        { value: "杭州" },
        { value: "广州" },
        { value: "天津" },
        { value: "苏州" },
        { value: "南京" },
        { value: "无锡" },
        { value: "成都" }
      ]
    },

    /* 事件处理函数 */

    handleBtnClick() {
      this.planTheRoute()
      // this.map.p()
    },

    handleStartBlur(e) {
      // this.map.addMarker(e.target.value)
      // this.map.clearPoi()
      console.log("失去焦点触发")
      this.markerAndPoi()
    },

    handleEndBlur() {
      // this.map.poi()
    },

    handleCtrlClick() {
      this.CHANGE_CTRL_STATE()
    }

    // handleSelect (item) {
    //     console.log('item =', item)
    // }
  }
}
</script>

<style lang="less">
.flex-mixin {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nav {
  width: 100%;

  .flex-mixin;

  .filter {
    width: 97%;

    .flex-mixin;

    div {
      width: 100%;
    }

    input {
      font-size: 22px;
      padding: 0 35px;
    }
    input::-ms-input-placeholder {
      text-align: center;
    }
    input::-webkit-input-placeholder {
      text-align: center;
    }

    button {
      width: 100%;
      cursor: pointer;
    }

    i {
      font-size: 22px;
    }
  }
}

.ctrl {
  .flex-mixin;

  img {
    cursor: pointer;
  }
}
</style>

