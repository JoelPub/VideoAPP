<template>
  <el-tabs v-model="typeName" @tab-click="handleClick">
    <el-tab-pane label="海报专区" name="hypo">
      <search-types ref="hypo" typeName="海报" :materialType="materialType" />
    </el-tab-pane>
    <el-tab-pane label="KV专区" name="kv">
      <search-types ref="kv" typeName="kv" :materialType="materialType" />
    </el-tab-pane>
    <el-tab-pane label="视频专区" name="video">
      <search-types ref="video" typeName="视频" :materialType="materialType" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import searchTypes from './searchTypes'
export default {
  components: { searchTypes },
  props: ['materialType'],
  data() {
    return {
      typeName: 'hypo'
    }
  },
  methods: {
    handleClick(tab) {
      this.$emit('switchTab', {
        label: tab.label,
        name: tab.name
      })
      // 通知列表组件
      this.$refs[tab.name].resetParams(tab.label.replace(/\u4e13\u533a/, ''))
    }
  }
}
</script>
