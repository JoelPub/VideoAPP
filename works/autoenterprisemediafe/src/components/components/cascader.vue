<template>
  <div>
    <div class="d-contain">
      <!-- 大区 -->
      <el-select class="select-item" :disabled="disabled" v-model="current1" @change="getNext($event, 'D2')" placeholder="请选择大区">
        <el-option v-for="(item, i) in D1" :key="i" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <!-- 小区 -->
      <el-select class="select-item" :disabled="disabled" v-model="current2" @change="getNext($event, 'pros')" placeholder="请选择小区">
        <el-option v-for="(item, i) in D2" :key="i" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </div>
    <div class="d-contain">
      <!-- 省 -->
      <el-select class="select-item" :disabled="disabled" v-model="currentP" @change="getNext($event, 'citys')" placeholder="请选择省份">
        <el-option v-for="(item, i) in pros" :key="i" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <!-- 市 -->
      <el-select class="select-item" :disabled="disabled" v-model="currentC" @change="getNext($event, 'mers')" placeholder="请选择城市">
        <el-option v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <!-- 经销商 -->
      <el-select class="addMHide select-item" :disabled="disabled" v-model="currentM" @change="getNext($event)" placeholder="请选择经销商">
        <el-option v-for="(item, i) in mers" :key="i" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disabled: Boolean
  },
  data () {
    return {
      current1: '',
      current2: '',
      currentP: '',
      currentC: '',
      currentM: '',
      D1: [],
      D2: [],
      pros: [],
      citys: [],
      mers: [],
      userInfo1: ''
    }
  },
  created () {
    this.$bus.$on('getInfo', res => {
      this.userInfo1 = res
      this.initD1()
    })
  },
  mounted () {
    this.initD1()
  },
  methods: {
    initD1 () {
      this.$http.getDisInfo().then(res => {
        this.D1 = res.data || []
        if (this.userInfo1) {
          for (const item of this.D1) {
            if (item.name === this.userInfo1.region) this.getNext(item.id, 'D2', this.userInfo1.region)
          }
        }
      })
    },
    getNext (value, type, next) {
      let _id = ''
      if (next) {
        _id = this.getId(type, next)
        if (type === 'D2') this.current1 = _id
        else if (type === 'pros') this.current2 = _id
        else if (type === 'citys') this.currentP = _id
        else if (type === 'mers') this.currentC = _id
        else {
          this.currentM = _id
          return
        }
      }
      const params = {
        D2: { mainId: _id || this.current1 },
        pros: { smallId: _id || this.current2 },
        citys: { provinceId: _id || this.currentP },
        mers: { cityId: _id || this.currentC }
      }[type]
      console.log(this.current1, this.current2)
      localStorage.setItem('addMId', this.currentC)
      if (type === 'D2') {
        this.current2 = ''
        this.currentP = ''
        this.currentC = ''
        this.currentM = ''
      } else if (type === 'pros') {
        this.currentP = ''
        this.currentC = ''
        this.currentM = ''
      } else if (type === 'citys') {
        this.currentC = ''
        this.currentM = ''
      } else if (type === 'mers') this.currentM = ''
      this.$http.getDisInfo(params || {}).then(res => {
        this.$data[type] = res.data || []
        if (next) {
          const _value = ''
          const _type = {
            D2: 'pros',
            pros: 'citys',
            citys: 'mers',
            mers: ''
          }[type]
          const _next = {
            D2: this.userInfo1.village,
            pros: this.userInfo1.province,
            citys: this.userInfo1.city,
            mers: this.userInfo1.distrName
          }[type]
          this.getNext(_value, _type, _next)
        }
        console.log('hhhh')
        // if (!type) {
        this.$emit('setDis', { region: this.getName('D2', this.current1), village: this.getName('pros', this.current2), province: this.getName('citys', this.currentP), city: this.getName('mers', this.currentC), distrName: this.getName('', this.currentM), disCode: this.getCode(this.currentM) })
        // }
      })
    },
    getCode (id) {
      for (const item of this.mers) {
        if (item.id === id) return item.code
      }
    },
    getName (type, selectId) {
      if (!selectId) return ''
      const arr = {
        D2: this.D1,
        pros: this.D2,
        citys: this.pros,
        mers: this.citys,
        '': this.mers
      }[type]
      for (const item of arr) {
        if (selectId === item.id) return item.name
      }
    },
    getId (type, selectName) {
      const arr = {
        D2: this.D1,
        pros: this.D2,
        citys: this.pros,
        mers: this.citys,
        '': this.mers
      }[type]
      for (const item of arr) {
        if (selectName === item.name) return item.id
      }
    }
  }
}
</script>

<style lang="less" scoped>
.d-contain {
  width: 100%;
  display: flex;
  justify-content: space-between;
  &:nth-of-type(1) {
    margin-bottom: 24px;
  }
  .select-item {
    flex: 1 1 auto;
    &:nth-of-type(2) {
      margin-left: 12px;
    }
    &:nth-of-type(3) {
      margin-left: 12px;
    }
  }
}
</style>
