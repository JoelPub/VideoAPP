<template>
  <div class="g_aside-nav">
    <div class="nav-title">
      智互通运营系统
      <img @click="switchAsideMenu()" class="click-area" src="../../assets/imgs/icon-close.png" />
    </div>
    <!-- <router-link
      custom
      v-slot="{ navigate }"
      v-for="(item, i) in routeMap"
      :key="i"
      :to="item.path"
    >
      <div class="nav-item click-area" :class="{ 'nav-item-active': $route.path == item.path }" @click="navigate">
        <img class="nav-item-icon" :src="item.icon" />
        <p class="route-name">{{ item.name }}</p>
        <img class="icon-right" v-if="$route.path != item.path" src="../../assets/imgs/icon-right.png">
      </div> -->
    <div class="nav-item" :class="{ 'nav-item-active': $route.path == item.path }" v-for="(item, i) in routeMap" :key="i" @click="skip(item.path)">
      <img class="nav-item-icon" :src="item.icon" />
      <p class="route-name">{{ item.name }}</p>
      <img class="icon-right" v-if="$route.path != item.path" src="../../assets/imgs/icon-right.png" />
    </div>
    <!-- </router-link> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import routeMap from '../../data/routeConfigure'
export default {
  computed: {
    ...mapState({
      // ifAsideNav: (state) => state.ifAsideNav,
      role: state => state.user.type
    })
  },
  data() {
    return {
      routeMap: []
    }
  },
  methods: {
    initRoute() {
      const role = JSON.parse(localStorage.getItem('role'))
      routeMap.map(e => {
        // if (!e.meta) this.routeMap.push(e)
        // else if (e.meta && e.meta.role === role) this.routeMap.push(e)
        if (e.meta.role.some(item => item === role)) this.routeMap.push(e)
      })
    },
    switchAsideMenu() {
      this.$store.commit('MODIFY_ASIDE')
    },
    skip(path) {
      // if (path === '/manageMer' || path === '/publicAssets')
      this.$router.push(path)
    }
  },
  mounted() {
    this.initRoute()
  }
}
</script>

<style lang="less" scoped>
.g_aside-nav {
  font-size: 14px;
}
.icon-right {
  width: 16px;
  height: auto;
  margin-left: 20px;
}
.route-name {
  color: inherit;
  font-size: inherit;
  width: 100px;
}
</style>
