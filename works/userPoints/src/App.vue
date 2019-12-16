<template>
  <div id="app">
    <img src="../upresource/img/loading.gif" class="loading" v-if="loadingFlag">

    <ul class="tabSwitch" v-if="tabShowFlag">
      <!-- <li :class="{activeTab:pageName=='indexPage'}">
        <router-link :to="{name:'indexPage'}">
          <img src="../upresource/img/index2.png" v-if="pageName=='indexPage'">
          <img src="../upresource/img/index.png" v-else>
          <br>
          <span :class="{activeColor:pageName=='indexPage'}">首页</span>
        </router-link>
      </li>-->
      <li :class="{activeTab:pageName=='activityCenter'}">
        <router-link :to="{name:'activityCenter'}">
          <img src="../upresource/img/qizi2.png" v-if="pageName=='activityCenter'">
          <img src="../upresource/img/qizi.png" v-else>
          <br>
          <span :class="{activeColor:pageName=='activityCenter'}">活动中心</span>
        </router-link>
      </li>
      <li :class="{activeTab:pageName=='Redeem'}">
        <router-link :to="{name:'Redeem'}">
          <img src="../upresource/img/liwu2.png" v-if="pageName=='Redeem'">
          <img src="../upresource/img/liwu1.png" v-else>
          <br>
          <span :class="{activeColor:pageName=='activityCenter'}">积分换礼</span>
        </router-link>
      </li>

      <li :class="{activeTab:pageName=='PersonalCenter'}">
        <router-link :to="{name:'PersonalCenter'}">
          <img src="../upresource/img/my2.png" v-if="pageName=='PersonalCenter'">
          <img src="../upresource/img/my1.png" v-else>
          <br>
          <span :class="{activeColor:pageName=='PersonalCenter'}">我的</span>
        </router-link>
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      tabShowFlag: false,
      pageName: ""
    };
  },
  computed: {
    ...mapState(["loadingFlag"])
  },
  watch: {
    $route(e) {
      // console.log("name=====================" + e.name);
      this.pageName = e.name;
      if (
        e.name == "PersonalCenter" ||
        e.name == "Redeem" ||
        e.name == "activityCenter" ||
        e.name == "indexPage"
      ) {
        this.tabShowFlag = true;
      } else {
        this.tabShowFlag = false;
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  list-style: none;
}
.tabSwitch {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #ffffff;
  z-index: 100;
  border-top: 1px solid #e6e6e6;
}
.tabSwitch li {
  width: 32%;
  display: inline-block;

  padding: 5px;
  text-align: center;
  color: #2e2e2d;
}
.tabSwitch a {
  color: #333 !important;
}
.tabSwitch img {
  width: 25px;
  height: 25px;

  display: inline-block;
}
.activeTab a {
  color: #122b4a;
}
.loading {
  position: absolute;
  left: 48%;
  top: 48%;
  z-index: 1000;
}
.activeColor {
  color: #122b4a !important;
}
</style>
