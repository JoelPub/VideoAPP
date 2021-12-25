<template>
  <div style="padding: 15px 0"
       class="flex-col">
    <div class="h5_header flex-around">
      <div class="flex-around left_wrp">
        <p>文件名</p>
        <div class='flex-end'>
          <i class='iconfont icon-shangyibu'></i>
          <i class='iconfont icon-shangyibu'
             style="transform: rotateY(180deg);display: block"></i>
          <i class='el-icon-refresh-right'></i>
          <i class="el-icon-delete"></i>
        </div>
      </div>
      <div class='flex-around right_wrp'>
        <el-button>保存11</el-button>
        <el-button>预览</el-button>
        <el-button>退出</el-button>
      </div>
    </div>
    <div class="flex-between main_wrapper flex-1 color-999">
      <div class="tab">
        <div :class="{'active_tab': currentTab == 0}"
             @click="changeTab(0)"
             class="item_tab text-center color-999">功能区
        </div>
        <div :class="{'active_tab': currentTab == 1}"
             @click="changeTab(1)"
             class="item_tab text-center color-999">个人中心
        </div>
      </div>
      <div class="sec_tab text-center"
           v-if="currentTab == 1">
        <div class="item color-999"
             @click="changeCurrentSecTab(0)"
             :class="{'active_tab': currentSecTab == 0}">背景</div>
        <div class="item color-999"
             @click="changeCurrentSecTab(1)"
             :class="{'active_tab': currentSecTab == 1}">文字</div>
        <div class="item color-999"
             @click="changeCurrentSecTab(2)"
             :class="{'active_tab': currentSecTab == 2}">形状</div>
        <div class="item color-999"
             @click="changeCurrentSecTab(3)"
             :class="{'active_tab': currentSecTab == 3}">图表</div>
      </div>

      <div class="user_sec_tab font-sm color-999"
           v-if="currentTab == 0">
        <div class="title">个人中心</div>
        <div class="user_wrapper flex-between">
          <img src="../../assets/imgs/content_bg.png"
               v-for="item in 10" />
        </div>
      </div>

      <div class="third_tab"
           v-if="currentTab == 1">
        <div class="font-sm color-999">主题颜色</div>
        <div class="color-wrapper">
          <div class="item_color_btn"></div>
          <div class="item_color_btn"></div>
          <div class="item_color_btn"></div>
          <div class="item_color_btn"></div>
          <div class="item_color_btn"></div>
        </div>
        <div class="font-sm color-999">预设颜色</div>
        <div class="color-wrapper">
          <div class="item_color_btn"></div>
          <div class="item_color_btn"></div>
          <div class="item_color_btn"></div>
          <div class="item_color_btn"></div>
          <div class="item_color_btn"></div>
        </div>
      </div>
      <div class="work_space flex-1">
        <div class="work_iphone"
             :style="{width: work_phone_width + 'px'}"></div>
      </div>
    </div>
    <div id="dropzone">
      <p @click="fileClick">PSD 测试</p>
      <input type="file"
             class="file"
             name=""
             @change="fileChange">
    </div>
    <pre id="data"></pre>
    <div id="image"></div>
  </div>
</template>

<script>
const IPHONE_6_HEIGHT = 667
const IPHONE_6_WIDTH = 375

export default {
  data () {
    return {
      currentTab: 0,
      currentSecTab: 0,
      work_phone_width: 375,
      zoom_scale: 1
    }
  },

  mounted () {
    let height = document.getElementsByClassName('work_space')
    height = height[0].clientHeight - 40
    this.zoom_scale = IPHONE_6_HEIGHT / height
    this.work_phone_width = IPHONE_6_WIDTH / this.zoom_scale

    /* var PSD = window.require('psd')
    this.PSD = PSD
    document.getElementById('dropzone').addEventListener('dragover', onDragOver, true);
    document.getElementById('dropzone').addEventListener('drop', onDrop, true);

    function onDragOver(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    }

    function onDrop(e) {
      e.stopPropagation();
      e.preventDefault();

      PSD.fromEvent(e).then(function (psd) {
        var data = JSON.stringify(psd.tree().export(), undefined, 2);
        document.getElementById('data').innerHTML = data;
        document.getElementById('image').appendChild(psd.image.toPng());
      });
    } */
  },

  methods: {
    fileClick () {
      document.querySelector('.file').click(1)
    },

    fileChange (e) {
      const file = e.target.files[0]
      e.target.value = ''
      var url = URL.createObjectURL(file)
      this.PSD.fromURL(url).then(function (psd) {
        var data = JSON.stringify(psd.tree().export(), undefined, 2)
        document.getElementById('data').innerHTML = data
        document.getElementById('image').appendChild(psd.image.toPng())
      })
    },

    changeTab (index) {
      this.currentTab = index
    },

    changeCurrentSecTab (index) {
      this.currentSecTab = index
    }
  }
}
</script>

<style scoped lang="scss">
$active_color: #024783;
.main_wrapper {
  .tab {
    padding-top: 20px;
    width: 80px;
    background: rgb(232, 232, 232);
    height: 100%;

    .item_tab {
      height: 80px;
      line-height: 80px;
      cursor: pointer;
    }
  }
  .active_tab {
    background: rgb(237, 237, 237);
    color: $active_color;
  }

  .sec_tab {
    padding-top: 20px;
    width: 80px;
    background: rgb(237, 237, 237);

    .item {
      width: 80px;
      height: 80px;
      line-height: 80px;
      cursor: pointer;
    }
  }
  .user_sec_tab {
    width: 250px;
    padding: 20px 10px;
    background: #fff;
    .user_wrapper {
      flex-wrap: wrap;
      margin-top: 20px;
      img {
        width: 49%;
        margin-bottom: 5px;
        cursor: pointer;
      }
    }
  }

  .third_tab {
    padding: 20px;
    padding-top: 40px;
    background: #fff;
    width: 300px;

    .color-wrapper {
      margin-top: 20px;
      margin-bottom: 30px;
      display: flex;
      flex-wrap: wrap;

      .item_color_btn {
        border-radius: 5px;
        width: 40px;
        height: 40px;
        background: green;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }

  .work_space {
    background: rgb(232, 232, 242);
    padding: 20px;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    .work_iphone {
      width: 375px;
      height: 100%;
      background: red;
    }
  }
}

.h5_header {
  display: flex;
  justify-content: space-around;
  padding: 10px 20px;
  color: #989898;
  align-items: center;
  box-shadow: 0 12px 12px 0 rgb(203, 203, 210);
  border-top: 1px solid rgb(153, 153, 153);
  z-index: 1;

  .left_wrp {
    width: 500px;

    .flex-end {
      i {
        margin: 0 10px;
        padding: 0 10px;
      }
    }
  }

  .right_wrp {
    width: 200px;
    flex: auto;
    justify-content: flex-end;
  }
}

body,
html {
  padding: 0;
  margin: 0;
}

#dropzone {
  width: 400px;
  height: 100px;
  border: 1px #ababab dashed;
  margin: 50px auto;
}

#dropzone p {
  text-align: center;
  line-height: 100px;
  margin: 0;
  padding: 0;
}

#image {
  text-align: center;
}

input[type='file'] {
  opacity: 0;
}
</style>
