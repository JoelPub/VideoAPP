<template>
  <div class="components-libs-wrapper scrollbar-wrapper">
    <el-scrollbar style="height: 100%;">
      <ul class="scrollbar-wrapper">
        <li v-for="(item, index) in backgroundList" :key="index" class="clearfix paddingB30">
          <div class="components-libs-title">
            <p>{{item.title}}</p>
          </div>
          <div v-if="item.components && item.components.length">
            <div class="components-lib-item" v-for="(element,i) in item.components" :key="i">
              <div class="item_btn" :class="element" :style="{backgroundColor: element}" @click="handleClick(element)" v-if="element == 'select'"
                     style="display: block;cursor: pointer">
                <!--<input type="color" id="select" style="display: none">-->
                <el-color-picker v-model="activePage.commonStyle.backgroundColor" style="opacity: 0"></el-color-picker>
              </div>
              <div class="item_btn" :class="element" :style="{backgroundColor: element}" @click="handleClick(element)" v-else></div>
            </div>
          </div>
        </li>
      </ul>
   <!--   <el-button style="position: relative; width: 90%;margin-left: 5%" @click="chooseColor" size="mini">
        <div style="width: 100px;height: 50px;line-height: 50px;position: absolute;margin: auto;top: 0;bottom: 0;left: 0;right: 0" @click="chooseColor">自定义背景</div>
        <el-color-picker ref="color_pick" v-model="activePage.commonStyle.backgroundColor" style="width: 100%;opacity: 0;"></el-color-picker>
      </el-button> -->
    </el-scrollbar>
  </div>
</template>

<script>
  import background from '../background'
  import {mapState, mapGetters} from 'vuex'
  export default {
    name: '',

    computed: {
      ...mapGetters([
        'activePage'
      ])
    },

    data() {
      return {
        backgroundList: background,
        color2: ''
      }
    },

    methods: {
      handleClick(color) {
        this.$store.dispatch('updateBackground', color)
        //this.activePage.commonStyle.backgroundColor
      },

      chooseColor() {
        this.$refs.color_pick.handleTrigger()
      }
    }
  }
</script>

<style scoped lang="scss">
  .components-libs-wrapper {
    user-select: none;
    height: 100%;
    padding-top: 20px;
    position: relative;
    & ul {
      padding: 10px;
    }
  }

  .page-title {
    position: absolute;
    top: 16px;
    left: 0;
    width: 100%;
  }

  .components-libs-title {
    margin-bottom: 16px;
    color: #7e7e7e;
  }

  .components-lib-item {
    color: #424242;
    text-align: center;
    width: 40px;
    height: 40px;
    float: left;
    margin: 4px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
    transition: All 0.3s ease-in-out;
    .item_btn {
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
    .transparent {
       background-image: url("./transparent.png");
    }
    .select {
      background-image: url("./select.png");
      background-size: cover;
    }
    &:hover {
      background: #fff;
      border: 1px solid $primary;
      color: $primary;
    }
    .lib-item-img {

    }
    .lib-item-title {

    }
  }

  .el-color-picker__trigger {
    width: 100px;
  }
</style>
