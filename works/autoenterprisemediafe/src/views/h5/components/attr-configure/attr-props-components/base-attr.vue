<template>
  <div>
    <div v-if="activeElement.elName == 'qk-text'">
      <div title="边框边距：">
        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">上下边距：</p>
          <div class="col-2 attr-item-edit-input">
            <el-input-number size="mini"
                             @change="throttleAddHistory"
                             v-model="activeElement.commonStyle.paddingTop"
                             :min="0"/>
          </div>
          <div class="col-2 attr-item-edit-input">
            <el-input-number size="mini"
                             @change="throttleAddHistory"
                             v-model="activeElement.commonStyle.paddingBottom"
                             :min="0"/>
          </div>
        </div>
        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">左右边距：</p>
          <div class="col-2 attr-item-edit-input">
            <el-input-number size="mini"
                             @change="throttleAddHistory"
                             v-model="activeElement.commonStyle.paddingLeft"
                             :min="0"/>
          </div>
          <div class="col-2 attr-item-edit-input">
            <el-input-number size="mini"
                             @change="throttleAddHistory"
                             v-model="activeElement.commonStyle.paddingRight"
                             :min="0"/>
          </div>
        </div>
      </div>
      <div class="attr-item-edit-wrapper">
        <p class="attr-item-title">字体大小：</p>
        <div class="col-2 attr-item-edit-input">
          <el-input-number size="mini"
                           @change="throttleAddHistory"
                           v-model="activeElement.commonStyle.fontSize"
                           :min="0"/>
        </div>
      </div>
<!--      <div class="attr-item-edit-wrapper">-->
<!--        <p class="attr-item-title">字体粗细：</p>-->
<!--        <div class="col-2 attr-item-edit-input">-->
<!--          <el-input-number size="mini"-->
<!--                           @change="throttleAddHistory"-->
<!--                           v-model="activeElement.commonStyle.fontWeight"-->
<!--                           :min="300" :step="100" :max="900"/>-->
<!--        </div>-->
<!--      </div>-->
      <div class="attr-item-edit-wrapper">
        <p class="attr-item-title">字体样式：</p>
        <div style="line-height: 28px">
          <el-switch
            v-model="activeElement.commonStyle.fontStyle"
            active-text="斜体"
            active-value="italic"
            inactive-value="normal"
            @change="throttleAddHistory"
            inactive-text="正常">
          </el-switch>
        </div>
      </div>

      <div class="attr-item-edit-wrapper">
        <p class="attr-item-title">下划线：</p>
        <div style="line-height: 28px">
          <el-switch
            v-model="activeElement.commonStyle.textDecoration"
            active-text="显示"
            active-value="underline"
            inactive-value="none"
            @change="throttleAddHistory"
            inactive-text="隐藏">
          </el-switch>
        </div>
      </div>
      <div class="attr-item-edit-wrapper">
        <p class="attr-item-title">行高：</p>
        <div class="col-2 attr-item-edit-input">
          <el-input-number size="mini"
                           @change="throttleAddHistory"
                           v-model="activeElement.commonStyle.lineHeight"
                           :min="0" :step="0.1"/>
        </div>
      </div>
      <div class="attr-item-edit-wrapper">
        <p class="attr-item-title">字间距：</p>
        <div class="col-2 attr-item-edit-input">
          <el-input-number size="mini"
                           @change="throttleAddHistory"
                           v-model="activeElement.commonStyle.letterSpacing"
                           :min="0"/>
        </div>
      </div>
      <div class="attr-item-edit-wrapper">
        <p class="attr-item-title">对齐方式：</p>
        <div class="sizeAndPosition-wrapper">
          <div class="align-type-item clearFlex" @click="handleTextAlignClick('left')">
            <el-tooltip effect="dark" content="左对齐" placement="bottom">
              <i class="iconfont iconzuoduiqi1"></i>
            </el-tooltip>
          </div>
          <div class="align-type-item clearFlex" @click="handleTextAlignClick('center')">
            <el-tooltip effect="dark" content="居中对齐" placement="bottom">
              <i class="iconfont iconjuzhongduiqi"></i>
            </el-tooltip>
          </div>
          <div class="align-type-item clearFlex" @click="handleTextAlignClick('right')">
            <el-tooltip effect="dark" content="右对齐" placement="bottom">
              <i class="iconfont iconyouduiqi2"></i>
            </el-tooltip>
          </div>
        </div>
      </div>

      <div class="attr-item-edit-wrapper">
        <p class="attr-item-title" style="line-height: 28px">字体颜色：</p>
        <div class="attr-item-edit-input">
          <el-color-picker size="mini"
                           @change="throttleAddHistory"
                           v-model="activeElement.commonStyle.color"></el-color-picker>
        </div>
      </div>

      <div class="attr-item-edit-wrapper">
        <p class="attr-item-title" style="line-height: 28px">背景色：</p>
        <div class="attr-item-edit-input">
          <el-color-picker size="mini"
                           @change="throttleAddHistory"
                           v-model="activeElement.commonStyle.backgroundColor"></el-color-picker>
        </div>
      </div>
    </div>
    <div v-if="activeElement.elName == 'qk-svg'">
      <ul class="scrollbar-wrapper">
        <li v-for="(item, index) in backgroundList" :key="index" class="clearfix paddingB30">
          <el-color-picker v-if="index == 0" v-model="activeElement.commonStyle.color"></el-color-picker>
          <div class="components-libs-title" v-if="index">
            <p>{{item.title}}</p>
          </div>
          <div class="components-lib-item" v-for="(element,i) in item.components" :key="i" v-if="index">
            <div class="item_btn"
                 v-if="i"
                 :class="element" :style="{backgroundColor: element}" @click="handleClick(element)"></div>
          </div>
        </li>
      </ul>
    </div>
    <div class="components-libs-title">
      <p>通用属性</p>
    </div>
    <div class="attr-item-edit-wrapper">
      <p class="attr-item-title">旋转：</p>
      <div class="col-1 attr-item-edit-input">
        <el-slider v-model="activeElement.commonStyle.rotate"
                   @change="throttleAddHistory"
                   show-input :min="-180" :max="180" :marks="{0:'',90:'', '-90':''}" input-size="mini"></el-slider>
      </div>
    </div>
    <div class="attr-item-edit-wrapper">
      <p class="attr-item-title">透明度：</p>
      <div class="col-2 attr-item-edit-input">
        <el-input-number size="mini"
                         @change="throttleAddHistory"
                         v-model="activeElement.commonStyle.opacity"
                         :min="0" :max="1" :step="0.1"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { ceil, subtract, divide, throttle } from 'lodash'
  import imageSelect from '@client/components/image-select'
  import background from '../../background.js'

  export default {
    components: {
      imageSelect
    },
    data() {
      return {
        backgroundList: background,
        alignTypeList: [{
          title: '左对齐',
          icon: 'iconfont iconzuoduiqi',
          type: 'l'
        }, {
          title: '上对齐',
          icon: 'iconfont iconshangduiqi',
          type: 't'
        }, {
          title: '右对齐',
          icon: 'iconfont iconyouduiqi',
          type: 'r'
        }, {
          title: '下对齐',
          icon: 'iconfont iconxiaduiqi',
          type: 'b'
        }, {
          title: '垂直居中对齐',
          icon: 'iconfont iconchuizhijuzhongduiqi',
          type: 'tb'
        }, {
          title: '水平居中对齐',
          icon: 'iconfont iconshuipingjuzhongduiqi',
          type: 'lr'
        }],
        // 'none', 'solid', 'dashed', 'dotted', 'double'
        borderStyleList: [{
          label: '实线',
          value: 'solid'
        }, {
          label: '虚线',
          value: 'dashed'
        }, {
          label: '点状',
          value: 'dotted'
        }, {
          label: '双线',
          value: 'double'
        }],
        boxShadow: {
          h: 0,
          v: 0,
          blur: 0,
          spread: 0,
          color: '#000000'
        }
      }
    },
    computed: {
      ...mapState({
        projectData: state => state.editor.projectData,
        activePageUUID: state => state.editor.activePageUUID,
        activeElementUUID: state => state.editor.activeElementUUID,
        activeAttrEditCollapse: state => state.editor.activeAttrEditCollapse
      }),
      ...mapGetters([
        'currentPageIndex',
        'activeElementIndex',
        'activeElement',
        'activePage'
      ])
    },
    watch: {
      activeElement(newV) {
        console.log(newV)
      },
      activeElementUUID() {
        // 设置boxShadow
        this.$nextTick(() => {
          this.initBoxShadowEdit()
        })
      },
      activeNames() {
        this.$store.commit('updateActiveAttrEditCollapse', this.activeNames)
      }
    },
    created() {
      this.throttleAddHistory = throttle(this.addHistory, 3000)
    },
    mounted() {
      this.initBoxShadowEdit()
      this.activeNames = this.activeAttrEditCollapse
    },
    methods: {
      /**
       * 纪录一条历史纪录
       * */
      addHistory() {
        // console.log('common style change addHistoryCache')
        this.$store.dispatch('addHistoryCache')
      },
      /**
       *
       * @param type
       */
      changeAlignType(type) {
        const canvasW = this.$config.canvasH5Width
        const canvasH = this.$config.canvasH5Height
        const eleW = this.activeElement.commonStyle.width
        const eleH = this.activeElement.commonStyle.height

        switch (type) {
          case 't':
            this.activeElement.commonStyle.top = 0
            break
          case 'b':
            this.activeElement.commonStyle.top = subtract(canvasH - eleH)
            break
          case 'l':
            this.activeElement.commonStyle.left = 0
            break
          case 'r':
            this.activeElement.commonStyle.left = subtract(canvasW - eleW)
            break
          case 'tb':
            this.activeElement.commonStyle.top = ceil(divide(subtract(canvasH - eleH), 2), 2)
            break
          case 'lr':
            this.activeElement.commonStyle.left = ceil(divide(subtract(canvasW - eleW), 2), 2)
            break
        }
      },
      /**
       * 初始化阴影编辑对象
       */
      initBoxShadowEdit() {
        const boxShadow = this.activeElement.commonStyle.boxShadow
        let boxShadowEditConfig = {
          h: 0,
          v: 0,
          blur: 0,
          spread: 0,
          color: '#000000'
        }
        if (!boxShadow || boxShadow === 'none') {
          this.boxShadow = boxShadowEditConfig
          return
        }
        const str = boxShadow.split(' ')

        boxShadowEditConfig = {
          h: parseInt(str[0].replace('px', '')),
          v: parseInt(str[1].replace('px', '')),
          blur: parseInt(str[2].replace('px', '')),
          spread: parseInt(str[3].replace('px', '')),
          color: str[4]
        }
        this.boxShadow = boxShadowEditConfig
      },
      boxShadowChange() {
        const str = `${this.boxShadow.h}px ${this.boxShadow.v}px  ${this.boxShadow.blur}px  ${this.boxShadow.spread}px  ${this.boxShadow.color}`
        this.activeElement.commonStyle.boxShadow = str
      },
      /**
       * 字体样式设置对齐方式
       * @param str
       */
      handleTextAlignClick(str) {
        this.activeElement.commonStyle.textAlign = str
      },
      /**
       * 字体样式设置对齐方式
       * @param str
       */
      handleResizeClick(type) {
        if (type.includes('w')) {
          this.activeElement.commonStyle.left = 0
          this.activeElement.commonStyle.width = this.$config.canvasH5Width
        }
        if (type.includes('h')) {
          this.activeElement.commonStyle.top = 0
          this.activeElement.commonStyle.height = this.$config.canvasH5Height
        }
      },

      handleClick(item) {
        this.activeElement.commonStyle.color = item
        throttle(this.addHistory, 3000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  div:nth-child(2) {
    flex: none;
  }
  .sizeAndPosition-wrapper {
    display: flex;
    width: 100%;
  }

  .align-type-item {
    flex: 1;
    cursor: pointer;
    text-align: center;

    &.clearFlex {
      width: 42px;
      flex: none;
    }

    i {
      line-height: 1;
      display: inline-block;
      padding: 6px;
      border-radius: 4px;
      background: rgba(37, 165, 137, 0.08);
    }

    &:hover {
      i {
        color: white;
        background: $primary;
      }
    }
  }

  .attr-item-edit-wrapper {
    padding-left: 18px;
    display: flex;
    width: 100%;
    text-align: center;
    padding-bottom: 10px;

    .attr-item-title {
      text-align: left;
      min-width: 60px;
      font-size: 12px;
      line-height: 28px;
    }

    .attr-item-edit-input {
      &.col-2 {
        width: 90px;
        margin-left: 10px;
      }

      &.col-1 {
        //width: 250px;
        flex: 1;
      }

      &.col-3 {
        width: 60px;
        margin-left: 10px;
      }

      &.col-4 {
        width: 50px;
        margin-left: 10px;
      }

      .attr-item-edit-input-des {
        text-align: center;
        line-height: 1;
        margin-top: 2px;
        font-size: 12px;
        color: $gray;
      }
    }
  }
</style>
<style lang="scss">
  .attr-item-edit-wrapper {
    .el-input-number.is-controls-right .el-input__inner {
      padding-left: 2px;
      padding-right: 32px;
      width: 90px;
    }

    .el-input-number--mini {
      width: 90px;
    }

    .el-slider__runway.show-input {
      margin-right: 108px;
    }
  }
</style>

<style lang="scss">
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

  .select {
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
