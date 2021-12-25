<template>
  <div id="app">
    <!-- 侧边栏 -->
    <transition name="asideAni">
      <g-aside v-if="ifAsideNav" />
    </transition>
    <!-- 内容区 -->
    <div class="g_content" :style="{ width: ifAsideNav ? 'calc(100% - 282px)' : '100%' }">
      <div class="g_header-contain" v-if="$route.path !== '/'">
        <g-header />
      </div>
      <!-- 弹窗 -->
      <router-view />
      <div class="g_bottom-contain" v-if="$route.path !== '/'">
        Copyright © 2021 上海蓝瀚广告有限公司 丨 沪ICP备2021008818号
        <span class="click-area" @click="$router.push('/statement')"> 丨 免责声明</span>
        <span class="click-area" @click="$router.push('/actionTutorial')"> 丨 操作手册</span>
      </div>
      <transition name="dialog">
        <g-dialog v-if="ifDialog" />
      </transition>
    </div>
    <g-download />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      ifAsideNav: state => state.ifAsideNav,
      ifDialog: state => state.ifDialog
    })
  },
  created() {
    this.$store.commit('MODIFY_User', {
      region: localStorage.getItem('region'),
      accountNumber: localStorage.getItem('accountNumber'),
      id: localStorage.getItem('id'),
      role: localStorage.getItem('role'),
      userName: localStorage.getItem('userName')
    })
  },
  mounted() {
    // 监听菜单栏是否打开
    this.$bus.$on('switchAsideMenu', () => {
      // this.switchAsideMenu()
      this.$store.commit('MODIFY_ASIDE')
    })
    // 监听是否需要弹窗
    this.$bus.$on('skip', res => {
      this.$router.push(res.url)
      this.$store.commit('MODIFY_Dialog')
    })
  }
}
</script>

<style lang="less">
@import './assets/less/index.less';

#app {
  font-family: Antenna, MHeiPRC, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  min-height: 100vh;
}
.g_content {
  height: 100vh;
  flex: 0 1 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
}
.g_aside-nav {
  flex: 0 0 25%;
  max-width: 282px;
  background: #005596;
  position: relative;
  z-index: 998;
}
.g_header-contain {
  display: table;
  height: 56px;
}
.g_bottom-contain {
  text-align: center;
  line-height: 66px;
  color: #707070;
  font-size: 12px;
  background: #fff;
}
// div:nth-child(2) {
//   flex: 1 0 auto;
// }
.nav-title {
  margin: 70px 25px 34px;
  color: #ffffff;
  font-weight: bold;
  font-size: 20px;
  position: relative;
  padding-bottom: 10px;
  border-bottom: 1px solid #ffffff;
  img {
    width: 14px;
    height: auto;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(calc(-50% - 5px));
  }
}
.nav-item {
  color: #ffffff;
  display: flex;
  align-items: center;
  height: 47px;
  cursor: pointer;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 12px;
  }
  &:nth-of-type(1) {
    &:hover {
      background: rgba(255, 255, 255, 0.05);
      &::before {
        display: flex;
        background: #5ab3f7;
      }
    }
  }
}
.nav-item-active {
  background: rgba(255, 255, 255, 0.05);
  &::before {
    display: flex;
    background: #5ab3f7;
  }
}
.nav-item-icon {
  width: 20px;
  margin: 0 13px 0 57px;
}
.asideAni-enter-active {
  transition: all 0.2s;
}
.asideAni-enter,
.asideAni-leave-to {
  transform: translate(-100px, 0);
}
</style>
