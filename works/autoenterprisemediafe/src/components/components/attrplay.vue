<template>
  <div class="component-attr-play flex-box" @scroll.prevent>
    <div class="attr-play-content flex-box">
      <!-- 关闭弹窗按钮 -->
      <img class="btn-close-dialog click-area" src="../../assets/imgs/icon-close2.png" @click="$emit('pauseVideo')" />
      <div class="attr-cover-box" :style="{ width: getAttrWidth() }">
        <slot name="attr" />
      </div>
      <div class="attr-dec">
        <p class="attr-title">
          <span>{{ preCard.typeName.toUpperCase() }}</span>
          {{ preCard.fileName }}
        </p>
        <p class="attr-time-limit" v-if="$route.path != '/myAssets'">
          使用期限:{{ preCard.startTime }} - {{ preCard.endTime }}
        </p>
        <div class="attr-author">
          <div>
            <img src="../../assets/imgs/icon-portrait.png" /><span>{{ preCard.accountNumber || 'A123456' }}</span>
          </div>
          <div>
            <img src="../../assets/imgs/icon_time.png" /><span>{{ preCard.uploadData || '2021.05.06' }}</span>
          </div>
          <!-- 超级管理员 素材管理页的删除操作 -->
          <el-button v-if="ifSuperBtnDelete" type="text" @click="$emit('superDeleteAttr')"
            ><i class="el-icon-delete"></i>删除</el-button
          >
          <!-- 删除 -->
          <el-button
            v-preventReClick
            v-if="ifBtnDelete"
            type="text"
            @click="$bus.$emit('deletePersonalAttr', preCard.id)"
            ><i class="el-icon-delete"></i>删除</el-button
          >
          <el-button
            v-if="ifCanEdit && preCard.typeName != 'kv' && preCard.typeName != 'KV' && preCard.typeName != '图片'"
            type="text"
            @click="editAttr(preCard.id, preCard.typeName, preCard.isHomemade, preCard.ifPublicAttr)"
            ><i class="el-icon-edit-outline"></i>编辑</el-button
          >
          <el-button
            type="text"
            v-preventReClick
            v-if="ifBtnFavorite"
            @click="favorite()"
            :disabled="selfCard.isCollect ? true : false"
          >
            <img
              style="transform: translate(0, 1px)"
              v-if="preCard.isCollect"
              src="../../assets/imgs/icon-favorited.png"
            />
            <img style="transform: translate(0, 1px)" v-else src="../../assets/imgs/icon-favorite.png" />
            收藏
          </el-button>
          <el-button v-preventReClick v-if="isShowDownload" class="btn-border" @click="downAttr"
            ><i class="el-icon-download"></i>下载</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { downLoadAttr } from '../../tools/index.js'
export default {
  props: {
    preCard: {
      type: Object,
      default() {
        return {}
      }
    },
    ifCanEdit: {
      type: [Boolean, String, Number],
      default: true
    },
    ifShowPeriodOfUse: {
      type: [Boolean, String, Number],
      default: true
    },
    // 删除、收藏 二选一
    ifBtnDelete: {
      type: [Boolean, String, Number],
      default: true
    },
    ifBtnFavorite: {
      type: [Boolean, String, Number],
      default: true
    },
    // 超级管理员删除操作
    ifSuperBtnDelete: {
      type: [Boolean, String, Number],
      default: false
    },
    ifCreateEmptyTemplate: {
      type: [Boolean, String, Number]
    },
    // 是否显示下载按钮
    isShowDownload: {
      type: Boolean,
      default: true
    },
    typeName: {
      type: String
    },
    materialType: {
      type: [String, Number]
    },
    ifPublicAttr: {
      type: [Boolean, String, Number],
      default: false
    }
  },
  data() {
    return {
      selfCard: this.preCard,
      role: localStorage.getItem('role') || ''
    }
  },
  methods: {
    getAttrHeight() {
      return {
        视频: 'auto',
        海报: '388px',
        kv: '650px',
        KV: '650px',
        图片: '650px'
      }[this.preCard.typeName]
    },
    getAttrWidth() {
      return {
        视频: 'auto',
        海报: '440px',
        kv: '440px',
        KV: '440px',
        图片: '440px'
      }[this.preCard.typeName]
    },
    skipEditPage(templateId, typeName, ifCreateEmptyTemplate, ifPublicAttr) {
      this.$router.push({
        path: typeName === '视频' ? '/edit_video' : '/edit_h5',
        query: {
          id: templateId,
          ifPublicAttr: this.ifPublicAttr || ifPublicAttr,
          ifCreateEmptyTemplate: this.ifCreateEmptyTemplate || ifCreateEmptyTemplate
        }
      })
    },
    canEdit(isEdit) {
      return new Promise((resolve, reject) => {
        if (isEdit && isEdit === '否') {
          this.$alert('您选择的模板不可进行编辑，请重新选择。', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
            center: true,
            callback: () => {
              reject(new Error())
            }
          })
        } else resolve()
      })
    },
    editAttr() {
      // if (this.preCard.typeName === '视频') {
      //   this.$alert('系统编辑功能暂未开放，预计2021年05月上旬上线开放。敬请期待！', '提示', {
      //     confirmButtonText: '确定',
      //     type: 'warning',
      //     center: true
      //   })
      //   return
      // }
      const { id, isOverdue, isEdit, typeName, isHomemade, ifPublicAttr } = this.preCard
      this.canEdit(isEdit)
        .then(() => {
          if (isOverdue === 2) {
            this.$confirm('模板付费素材已过期，如仍需编辑，请确保仅用于内部活动使用，不得用于对外商业宣传。', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            })
              .then(() => {
                this.skipEditPage(id, typeName, isHomemade, ifPublicAttr)
              })
              .catch(() => {})
          } else this.skipEditPage(id, typeName, isHomemade, ifPublicAttr)
        })
        .catch(() => {})
    },
    favorite() {
      if (this.$route.path === '/myAssets') {
        this.$emit('cardDel')
        return
      }
      this.$http
        .collectTemplate({
          templateId: this.preCard.id,
          userId: localStorage.getItem('id'),
          materialType: this.materialType
        })
        .then(res => {
          if (res.status === 200) {
            this.$bus.$emit('setFavorite', this.preCard.id)
            this.$alert('您可前往个人中心查看', '提示', {
              confirmButtonText: '确认',
              type: 'warning',
              center: true,
              callback: () => {}
            })
          }
        })
    },
    downAttr() {
      downLoadAttr.call(this, this.preCard)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/less/btn.less';
.component-attr-play {
  position: absolute;
  height: calc(100% + 66px);
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(51, 51, 51, 0.8);
  z-index: 997;
  flex-direction: column;
}
.attr-play-content {
  align-items: stretch;
  flex-direction: column;
  position: relative;
  .attr-cover-box {
    max-height: calc(100vh - 56px - 140px - 48px);
    max-width: 800px;
    overflow: scroll;
    img {
      width: 100%;
    }
  }
}
.attr-dec {
  padding: 10px 8px;
  background: #ffffff;
  margin-top: 10px;
  flex: 0 0 auto;
  p {
    line-height: 1;
    padding: 2px;
  }
  .attr-title {
    margin-bottom: 10px;
    span {
      font-size: 10px;
      color: #1989fa;
      padding: 3px 4px;
      background: #e6f1fc;
      border: 1px solid #a3d0fd;
      border-radius: 5px;
      margin-right: 10px;
    }
  }
  .attr-time-limit {
    margin: 0;
    font-size: 10px;
    color: #949494;
  }
  .attr-btn-list,
  .attr-author {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
  }
  .attr-author {
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #ebeef5;
    padding: 8px 5px 0;
    div {
      flex: 0 0 auto;
      &:nth-of-type(2) {
        flex: 1 0 auto;
        justify-content: flex-start;
        margin-left: 15px;
      }
      img {
        width: 14px;
        height: auto;
        margin-right: 4px;
        transform: translate(0, 2px);
      }
    }
    .btn-border {
      padding: 6px 12px;
      margin-left: 20px;
    }
  }
}
.btn-close-dialog {
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: auto;
  z-index: 1;
  transform: translate(130%, -90%);
}
</style>
<style lang="less">
.component-attr-play {
  .btn-download {
    color: #005596;
    background-color: #e6eef5;
    border-color: transparent;
    padding: 8px 15px;
    margin-left: 15px;
  }
  .el-button--text {
    font-size: 14px;
    text-decoration: none;
  }
}
</style>
