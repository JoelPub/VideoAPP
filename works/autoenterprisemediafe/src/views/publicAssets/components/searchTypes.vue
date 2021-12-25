<template>
  <div>
    <!-- 时间 -->
    <div class="date-picker">
      <span>时间：</span>
      <el-date-picker
        v-model="param1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        @change="setDates()"
      ></el-date-picker>
    </div>
    <!-- 品类 -->
    <!-- 海报无素材类型 -->
    <div class="type-picker" v-if="typeName != '海报' && categoryMap.length">
      <span>素材类型：</span>
      <!-- <div class="btn-box"> -->
      <el-button
        type="text"
        v-for="(v, i) in categoryMap"
        :key="i"
        :class="{ 'button-active': v.id == categoryName }"
        @click="setParam('categoryMap', v)"
      >
        {{ v.name }}
      </el-button>
      <!-- </div> -->
    </div>
    <!-- 车型 -->
    <div class="model-picker" v-if="carModelMap.length">
      <span>车型：</span>
      <el-button
        type="text"
        v-for="(v, i) in carModelMap"
        :key="i"
        :class="{ 'button-active': v.id == carModelName }"
        @click="setParam('carModelMap', v)"
      >
        {{ v.name }}
      </el-button>
    </div>
    <!-- 视频时长 -->
    <div class="time-picker" v-if="typeName == '视频'">
      <span>视频时长：</span>
      <el-button
        type="text"
        v-for="(v, i) in videoTimeMap"
        :key="i"
        :class="{ 'button-active': v.value == videoTime }"
        @click="setVideoTime(v.value)"
      >
        {{ v.name }}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['materialType', 'typeName'],
  created() {
    // 获取车型列表
    this.$bus.$on('setCarMap', res => {
      if (!this.carModelMap.length) {
        res.map(item => this.carModelMap.push(item))
        this.carModelName = this.carModelMap[0].id
      }
    })
    // 获取素材类型列表
    if (this.typeName !== '海报') {
      this.$http.getCategoryInfoList({ typeName: this.typeName }).then(res => {
        if (res.status === 200) {
          if (Array.isArray(res.data)) {
            this.categoryMap = res.data.map(item => item)
            if (this.categoryMap.length) this.categoryName = this.categoryMap[0].id
          }
        }
      })
    }
  },
  data() {
    return {
      param1: '',
      carModelMap: [],
      categoryMap: [],
      videoTimeMap: [
        { name: '全部', value: null },
        { name: '15s', value: 15 },
        { name: '30s', value: 30 },
        { name: '45s', value: 45 },
        { name: '60s', value: 60 },
        { name: '120s', value: 120 },
        { name: '其他', value: '其他' }
      ],
      categoryName: '',
      carModelName: '',
      videoTime: null
    }
  },
  methods: {
    // 时间日期更改
    setDates() {
      if (this.param1) {
        this.$bus.$emit('setSearchParam', {
          sTime: this.param1[0],
          eTime: this.param1[1]
        })
      } else {
        this.$bus.$emit('setSearchParam', {
          sTime: '',
          eTime: ''
        })
      }
    },
    setVideoTime(value) {
      this.videoTime = value
      this.$bus.$emit('setSearchParam', {
        videoTime: this.videoTime
      })
    },
    // 查询项更改
    setParam(paramLabel, value) {
      // 非日期选择器
      const label = paramLabel.replace('Map', 'Name')
      this.$data[label] = value.id || value.value
      const querys = {}
      querys[paramLabel.replace('Map', 'Name')] = value.name
      this.$bus.$emit('setSearchParam', querys)
    },
    resetParams(typeName) {
      this.videoTime = null
      this.param1 = ''
      this.carModelName = this.carModelMap.length ? this.carModelMap[0].id : ''
      this.categoryName = this.categoryMap.length ? this.categoryMap[0].id : ''
      this.$bus.$emit('setSearchParam', {
        carModelName: this.carModelMap.some(item => item.id === this.carModelName)
          ? this.carModelMap.find(item => item.id === this.carModelName).name
          : '',
        categoryName: this.categoryMap.some(item => item.id === this.categoryName)
          ? this.categoryMap.find(item => item.id === this.categoryName).name
          : '',
        videoTime: this.videoTime,
        sTime: '',
        eTime: '',
        typeName
      })
    }
  }
}
</script>

<style lang="less" scoped>
.date-picker,
.type-picker,
.model-picker,
.time-picker {
  font-size: 14px;
  padding: 15px 0 0;
  border-bottom: 1px solid #ebeef5;
  position: relative;
  padding-left: 80px;
  span {
    position: absolute;
    left: 0;
    top: 17px;
  }
}
.date-picker {
  padding-bottom: 15px;
  span {
    top: 20px;
  }
}
.time-picker {
  padding-bottom: 15px;
}
</style>

<style lang="less">
.el-date-table td.prev-month,
.el-date-table td.next-month {
  div {
    color: #d0d0d0;
  }
}
.el-input__inner {
  border-color: #dcdfe6;
  &:hover,
  &:active,
  &:focus {
    border-color: #dcdfe6;
  }
}
.el-range-editor.is-active {
  border-color: #dcdfe6;
  &:hover {
    border-color: #dcdfe6;
  }
}
.type-picker,
.model-picker {
  .el-button--text {
    // margin-left: 20px;
    margin-right: 20px;
    margin-left: 0;
    margin-bottom: 15px;
  }
}
.date-picker {
  .el-range-separator {
    width: 25px;
  }
}
</style>
