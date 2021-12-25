<template>
  <div
    v-if="$route.path !== '/login' && $route.path !== '/register'"
    class="g_user flex-box click-area"
    @mouseenter="mouseEvent()"
    @mouseleave="showDropDown = false"
  >
    <img src="../../assets/imgs/icon-portrait.png" />
    <!-- {{ userInfo.role === 1 ? userInfo.distrName : userInfo.region || ''}}  -->
    {{ userInfo.region || '' }}
    {{ userInfo.accountNumber || '' }}
    <img class="img-down" :class="{ 'img-down-reverse': showDropDown }" src="../../assets/imgs/icon-down.png" />
    <transition name="el-fade-in-linear">
      <!-- v-if="showDropDown" -->
      <div class="dropdown-box" v-show="showDropDown">
        <div class="flex-box" @click="skip()"><img src="../../assets/imgs/icon-setting.png" />账号信息</div>
        <div class="flex-box" @click="quit()"><img src="../../assets/imgs/icon-quit.png" /> 退出登录</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDropDown: false
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  methods: {
    skip() {
      if (this.$route.path !== '/userInfo') {
        this.$router.push({
          path: '/userInfo',
          query: {
            type: this.userInfo.role
          }
        })
      }
    },
    mouseEvent() {
      this.showDropDown = true
    },
    quit() {
      localStorage.removeItem('userName')
      localStorage.removeItem('role')
      localStorage.removeItem('id')
      localStorage.removeItem('region')
      sessionStorage.removeItem('id')
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="less" scoped>
img {
  width: 18px;
  height: auto;
  margin-right: 10px;
}
.img-down {
  width: 16px;
  height: auto;
  margin-left: 8px;
  margin-right: 23px;
}
.img-down-reverse {
  transform: rotate(180deg);
}
.g_user {
  // height: 100%;
  position: relative;
  // right: 200px;
  // top: 50%;
  // transform: translate(0, -50%);
  overflow: visible;
  min-width: 196px;
  align-items: center;
  // justify-content: flex-end;
  justify-content: flex-start;
  margin-left: 30px;
}
.dropdown-box {
  border: 1px solid #bebebe;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  position: absolute;
  right: 0;
  top: 100%;
  transform: translate(0, 4px);
  background: #ffffff;
  div {
    padding: 8px 50px;
    img {
      width: 16px;
      height: auto;
      margin-right: 10px;
    }
    &:nth-of-type(1) {
      border-bottom: 1px solid #d0d0d0;
    }
  }
}
</style>
