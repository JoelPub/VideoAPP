<template>
  <div v-show="!ifAsideNav && $route.meta.fillUser" class="g_aside-swith click-area" @click="switchAsideMenu()">
    <img src="../../assets/imgs/icon-menu.png">
    菜单
  </div>
</template>

<script>
export default {
  computed: {
    ifAsideNav () {
      this.$emit('ifAsideNav', this.$store.state.ifAsideNav)
      return this.$store.state.ifAsideNav
    },
    ifMenuSwitch () {
      return this.$store.state.ifMenuSwitch
    }
  },
  methods: {
    switchAsideMenu () {
      this.$bus.$emit('switchAsideMenu')
    }
  }
}
</script>
<style lang="less" scoped>
.g_aside-swith {
  display: flex;
  align-items: center;
  color: #005596;
  font-weight: bold;
  margin-left: 38px;
  margin-right: 40px;
  img {
    width: 26px;
    height: auto;
    margin-right: 14px;
  }
}
</style>
