<template>
  <div class="attr-card">
    <div class="flex-box attr-box" :style="{ height: attrHeight }">
      <slot name="attr"></slot>
    </div>
    <div class="attr-dec">
      <p class="attr-title">
        <!-- <span><slot name="type"></slot></span> -->
        <span>{{ card.typeName.toUpperCase() }}</span>
        {{ card.fileName || '福特这车要火' }}
      </p>
      <p class="attr-time-limit" v-if="ifShowPeriodOfUse">使用期限:{{ card.startTime }} - {{ card.endTime }}</p>
      <!-- 卡片操作按钮 -->
      <!-- 不能编辑：个人中心的素材、所有kv -->
      <p class="attr-btn-list">
        <!-- 超级管理员 素材管理页的删除操作 -->
        <el-button v-if="ifSuperBtnDelete" type="text" @click="$emit('superDeleteAttr')"
          ><i class="el-icon-delete"></i>删除</el-button
        >
        <!-- 删除 -->
        <el-button v-preventReClick v-if="ifBtnDelete" type="text" @click="$emit('deleteAttr')"
          ><i class="el-icon-delete"></i>删除</el-button
        >
        <el-button
          v-if="ifCanEdit && card.typeName != 'kv' && card.typeName != 'KV' && card.typeName != '图片'"
          type="text"
          @click="editAttr()"
          ><i class="el-icon-edit-outline"></i>编辑</el-button
        >
        <el-button
          v-preventReClick
          v-if="ifBtnFavorite"
          type="text"
          @click="favorite()"
          :disabled="selfCard.isCollect ? true : false"
          :class="{ 'el-button-favorited': selfCard.isCollect }"
        >
          <!-- <span v-if="selfCard.isCollect" class="favorite-img-box"></span>
          <span v-else class="dis-favorite-img-box"></span> -->
          <!-- <img v-if="selfCard.isCollect" src="../../assets/imgs/icon-favorited.png" />
          <img v-else src="../../assets/imgs/icon-favorite.png" /> -->
          <span class="favorite-img-box"></span>
          收藏
        </el-button>
        <el-button v-preventReClick type="text" @click="downAttr()"><i class="el-icon-download"></i>下载</el-button>
      </p>
      <div class="attr-author">
        <div><img src="../../assets/imgs/icon-portrait.png" />{{ card.accountNumber || 'A123456' }}</div>
        <div><img src="../../assets/imgs/icon_time.png" />{{ card.uploadData || '2021.05.06' }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { setObProperties, downLoadAttr } from '../../tools/index.js'
export default {
  props: {
    card: {
      type: Object,
      default: function() {
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
    typeName: {
      type: String
    },
    materialType: {
      type: [String, Number]
    },
    ifPublicAttr: {
      type: [Boolean, String, Number],
      default: true
    },
    ifPersonalPage: {
      type: [Boolean, String, Number],
      default: ''
    }
  },
  data() {
    return {
      role: localStorage.getItem('role') || '',
      userId: localStorage.getItem('id') || '1',
      selfCard: this.card,
      attrHeight: {
        视频: '148px',
        海报: '278px',
        KV: '175px',
        kv: '175px',
        海报true: '175px',
        KVtrue: '175px',
        kvtrue: '175px',
        视频true: '148px'
      }[this.typeName + this.ifPersonalPage]
    }
  },
  methods: {
    getattrHeight() {},
    skipEditPage(templateId, typeName, ifCreateEmptyTemplate) {
      this.$router.push({
        path: typeName === '视频' ? '/edit_video' : '/edit_h5',
        query: {
          id: templateId,
          ifPublicAttr: this.ifPublicAttr,
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
      // if (this.card.typeName === '视频') {
      //   this.$alert('系统编辑功能暂未开放，预计2021年05月上旬上线开放。敬请期待！', '提示', {
      //     confirmButtonText: '确定',
      //     type: 'warning',
      //     center: true
      //   })
      //   return
      // }
      const { id, isOverdue, isEdit, typeName, isHomemade } = this.card
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
                this.skipEditPage(id, typeName, isHomemade)
              })
              .catch(() => {})
          } else this.skipEditPage(id, typeName, isHomemade)
        })
        .catch(() => {})
    },
    favorite() {
      if (this.selfCard.isCollect) return
      this.$http
        .collectTemplate({
          templateId: this.card.id,
          userId: localStorage.getItem('id'),
          materialType: this.materialType
        })
        .then(res => {
          if (res.status === 200 && res.data === 'ok') {
            this.selfCard = setObProperties(this.selfCard, 'isCollect', !this.selfCard.isCollect)
            if (this.selfCard.isCollect) {
              this.$alert('您可前往个人中心查看', '提示', {
                confirmButtonText: '确认',
                type: 'warning',
                center: true,
                callback: () => {}
              })
            }
          } else {
            this.$alert(res.data, '提示', {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
    },
    downAttr() {
      downLoadAttr.call(this, this.card)
    }
  }
}
</script>

<style lang="less" scoped>
.attr-card {
  flex: 0 0 260px;
  width: 260px;
  // margin-bottom: 22px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 5px;
}
.attr-box {
  overflow-y: scroll;
  position: relative;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.attr-title {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  height: 24px;
  line-height: 24px;
  margin-bottom: 6px;
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
.attr-dec {
  padding: 10px 8px;
  .attr-time-limit {
    font-size: 10px;
    color: #949494;
    line-height: 1;
  }
  .attr-btn-list,
  .attr-author {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .attr-btn-list {
    margin-bottom: 5px;
    margin-top: 15px;
  }
  .attr-author {
    justify-content: space-between;
    border-top: 1px solid #ebeef5;
    padding: 8px 5px 0;
    div {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      font-size: 12px;
      img {
        width: 12px;
        height: auto;
        margin-right: 5px;
      }
    }
  }
}
</style>

<style lang="less">
.attr-card {
  video {
    max-height: 148px;
  }
}
.attr-dec {
  .el-button--text {
    padding: 0px;
  }
  .el-button--small {
    display: inline-flex;
    align-items: center;
    span {
      display: inline-flex;
      align-items: center;
      letter-spacing: 2px;
      i {
        margin-right: 1px;
      }
    }
    img {
      width: 12px;
      height: auto;
      margin-right: 2px;
      transform: translate(0, -1px);
    }
    .favorite-img-box,
    .dis-favorite-img-box {
      display: inline-block;
      width: 12px;
      height: 12px;
      background-size: 12px auto;
      background-repeat: no-repeat;
      background-image: url('../../assets/imgs/icon-favorite.png');
      margin-right: 1px;
    }
    &:hover {
      span {
        color: #005596;
      }
      .favorite-img-box {
        background-image: url('../../assets/imgs/icon-favorited.png');
      }
    }
  }
  .el-button-favorited {
    .favorite-img-box {
      background-image: url('../../assets/imgs/icon-favorited.png');
    }
    span {
      color: #005596;
    }
  }
}
</style>
