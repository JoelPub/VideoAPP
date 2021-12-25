<template>
  <div class="page-action-tutorial flex-box">
    <div class="action-book">
      <div class="book-menu-list">
        <div class="menu-title"><img src="../../assets/imgs/icon-action.png" /> 操作说明</div>
        <el-collapse class="menu-group" v-model="activeNames">
          <el-collapse-item title="用户手册" :name="1">
            <a
              class="menu-item"
              v-for="(menu, index) in memuMap"
              :key="index"
              href="javascript:void(0)"
              @click="skipElement('#menu' + index)"
              :class="{ activeMenu: '#menu' + index == activeMenu }"
              >{{ menu.title }}</a
            >
          </el-collapse-item>
          <el-collapse-item title="VI手册" :name="2" class="el-collapse-item__header-middle"></el-collapse-item>
        </el-collapse>
        <!-- <div class="menu-title menu-title-middle" @click="skipElement('VI')">VI手册</div> -->
      </div>
      <div class="book-content">
        <div class="menu-item-content" v-for="(menu, index) in memuMap" :key="index" :id="'menu' + index">
          <div v-show="activeMenu == '#menu' + index">
            <h4>{{ menu.title }}</h4>
            <ul v-if="wordDes['des' + index]">
              <li v-for="(p, index) in wordDes['des' + index]" :key="index">
                {{ index + 1 }}、{{ p.value ? p.value : p }}
                <p :style="p.style ? p.style : {}">{{ p.tip ? p.tip : '' }}</p>
              </li>
            </ul>
            <div v-if="imgs['img' + index]" class="flex-box img-box">
              <img :src="imgs['img' + index]" />
            </div>
            <div v-if="videos['video' + index]" class="flex-box attr-box">
              <video width="100%" controls controlslist="nodownload noremoteplayback" disablePictureInPicture>
                <source :src="videos['video' + index]" type="video/mp4" />
              </video>
              <!-- <video-attr width="100%" :source="{ src: videos['video' + index] }" :controls="true"></video-attr> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import videoAttr from '../../components/components/videoAttr'
import attrs from './attrConfig/index'
export default {
  // components: { videoAttr },
  methods: {
    skipElement(elementId) {
      if (elementId) {
        this.activeMenu = elementId
        const target = document.querySelector(elementId)
        if (target) target.scrollIntoView(true)
      }
    }
  },
  data() {
    return {
      activeMenu: '#menu0',
      wordDes: attrs.wordDes,
      videos: attrs.videoMap,
      imgs: attrs.imgMap,
      activeNames: [1],
      memuMap: [
        { title: '新用户如何注册？' },
        { title: '老用户如何修改用户名？' },
        { title: '公共素材功能介绍' },
        { title: '个人中心功能介绍' },
        { title: '如何上传图片？' },
        { title: '如何上传视频及音频？' },
        { title: '如何使用智互通下载KV？' },
        { title: '如何使用智互通编辑海报？' },
        { title: '如何使用智互通编辑视频？' },
        { title: '素材有效期说明' }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.page-action-tutorial {
  height: calc(100vh - 56px - 66px);
  position: relative;
  background: url('../../assets/imgs/content_bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  padding: 20px;
  .action-book {
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    height: calc(100% - 40px);
    width: calc(100% - 40px);
    max-width: 1000px;
    .book-menu-list {
      flex: 0 0 20%;
      background: #e8e8e8;
      .menu-title {
        padding-top: 26px;
        padding-left: 30px;
        padding-bottom: 22px;
        color: #000000;
        font-size: 18px;
        border-bottom: 1px solid #c0c4cc;
        img {
          width: 16px;
          vertical-align: middle;
        }
      }
      .menu-title-middle {
        font-size: 16px;
        color: #949494;
      }
      .menu-group {
        // background: #f4f4f4;
        // padding-left: 30px;
        h5 {
          color: #000000;
          font-size: 16px;
        }
      }
    }
    .book-content {
      flex: 0 0 80%;
      max-width: 988px;
      padding: 0 20px;
      background: #ffffff;
      overflow-y: scroll;
      .menu-item-content {
        h4 {
          font-size: 18px;
          color: #000000;
          border-bottom: 1px solid #c0c4cc;
          padding: 36px 0 12px;
        }
        ul {
          padding-top: 15px;
          li {
            line-height: 2;
          }
        }
        .attr-box {
          margin: 15px auto 50px;
        }
        .img-box {
          margin: 15px auto;
        }
      }
    }
  }
}
.menu-item {
  display: flex;
  margin-bottom: 20px;
  color: #bebebe;
  font-size: 14px;
}
.activeMenu {
  color: #005596;
}
</style>

<style lang="less">
.menu-group {
  .el-collapse-item__header,
  .el-collapse-item__wrap {
    font-size: 16px;
    background-color: #e8e8e8;
    border-bottom-color: #e8e8e8;
    padding-left: 30px;
    color: #bebebe;
  }
  .el-collapse-item__content {
    padding-bottom: 10px;
  }
  .el-collapse-item__wrap {
    border: none;
  }
  .el-collapse-item.is-active {
    .el-collapse-item__header,
    .el-collapse-item__wrap {
      background-color: #f4f4f4;
      border-bottom-color: #f4f4f4;
      color: #000000;
    }
  }
  .el-collapse-item__header-middle {
    border-bottom: 1px solid #c0c4cc;
    .el-collapse-item__content {
      padding: 0;
    }
  }
  .el-collapse-item {
    &:nth-of-type(1) {
      border-bottom: 1px solid #c0c4cc;
    }
  }
  .el-collapse-item.is-active {
    &:nth-of-type(1) {
      border-bottom: 1px solid transparent;
    }
  }
}
</style>
