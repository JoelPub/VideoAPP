<template>
  <div class="panel-card">
    <div class="panel-card-header">
      <span>历史编辑</span>
      <div class="btn-sort">
        <el-button @click="templateTimeSort"
          >时间排序
          <i v-if="sort" class="el-icon--right el-icon-caret-bottom"></i>
          <i v-else class="el-icon--right el-icon-caret-top"></i>
        </el-button>
      </div>
    </div>
    <div class="panel-poster">
      <div v-if="componentDataList.length" class="poster-content">
        <card
          v-for="(item, i) in componentDataList"
          :key="item.id"
          :card="item"
          :typeName="typeName"
          :ifShowPeriodOfUse="false"
          :ifBtnFavorite="false"
          ifCreateEmptyTemplate="0"
          :ifPublicAttr="0"
          :ifPersonalPage="true"
          @downAttr="downAttr({ src: item.sourceUrl || item.coverUrl, fileName: item.fileName, type: item.typeName })"
          @deleteAttr="deleteAttr(item.id, i)"
        >
          <template v-slot:attr>
            <video-attr
              @playVideo="$emit('playVideo', { ...item, isHomemade: 0, ifPublicAttr: 0 })"
              v-if="item.typeName == '视频'"
              :source="{ src: item.sourceUrl || item.coverUrl }"
            ></video-attr>
            <img
              @click="$emit('playVideo', { ...item, isHomemade: 0, ifPublicAttr: 0 })"
              v-else
              :src="item.coverUrl || item.sourceUrl"
              alt="loading"
              class="click-area"
            />
          </template>
          <template v-slot:type>{{ item.typeName }}</template>
        </card>
        <el-pagination
          class="personal-pagination"
          :current-page="pageIndex"
          :page-size="pageSize"
          :page-sizes="[4, 8, 16]"
          layout="sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <div v-else class="poster-content" style="justify-content: center">暂无数据</div>
    </div>
  </div>
</template>

<script>
import { downLoadAttr, replaceListItem } from '../../../tools/index'
import card from '../../../components/components/card'
import videoAttr from '../../../components/components/videoAttr'
export default {
  components: { card, videoAttr },
  props: ['typeName'],
  computed: {
    typeNameLabel() {
      return {
        视频: 'video',
        海报: 'hypo',
        kv: 'kv'
      }[this.typeName]
    }
  },
  watch: {
    typeNameLabel: {
      handler() {
        this.refreshComponentData('historyEditList')
      }
    }
  },
  data() {
    return {
      sort: 0,
      componentDataList: [],
      pageIndex: 1,
      pageSize: 4,
      userId: localStorage.getItem('id'),
      role: localStorage.getItem('role'),
      total: 0,
      videoPageInfo: {},
      hypoPageInfo: {},
      kvPageInfo: {}
    }
  },
  methods: {
    downAttr(source) {
      downLoadAttr(this, source)
    },
    handleSizeChange(size) {
      this.pageIndex = 1
      this.pageSize = size
      this.refreshComponentData('historyEditList')
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex
      this.refreshComponentData('historyEditList')
    },
    deleteAttr(templateId) {
      this.$confirm('是否移除此编辑?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          this.$http
            .templateEditDel({
              id: templateId,
              userId: localStorage.getItem('id') || ''
            })
            .then(res => {
              if (res.status === 200) {
                const index = this.componentDataList.findIndex(item => item.id === templateId)
                this.componentDataList.splice(index, 1)
                this.refreshComponentData('historyEditList')
                this.$emit('pauseVideo')
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              }
            })
        })
        .catch(() => {})
    },
    getComponentData() {
      const { pageIndex, pageSize, userId } = this
      this.$http
        .historyEditList({
          pageIndex,
          pageSize,
          userId,
          typeName: this.typeName
        })
        .then(res => {
          if (res.status === 200) {
            this.total = res.data.total
            res.data.list.forEach(element => this.componentDataList.push(element))
          }
        })
    },
    templateTimeSort() {
      this.sort = this.sort ? 0 : 1
      if (!this.sort) this.refreshComponentData('historyEditList')
      else this.refreshComponentData('temSortList')
    },
    templateGetMore() {
      this.pageIndex++
      this.getComponentData()
    },
    refreshComponentData(apiName, fileName) {
      const { pageIndex, pageSize, userId } = this
      this.$http[apiName]({
        pageSize,
        pageIndex,
        userId,
        typeName: this.typeName,
        fileName,
        type: 0
      }).then(res => {
        if (res.status === 200) {
          this.total = res.data.total
          if (!res.data.list) replaceListItem(this.componentDataList, res.data.historyEdit.list)
          else replaceListItem(this.componentDataList, res.data.list)
        }
      })
    }
  },
  created() {
    this.getComponentData()
    this.$bus.$on('searchUserTemplate', fileName => {
      console.log('收藏')
      this.refreshComponentData('searchUserTemplate', fileName)
    })
    this.$bus.$on('deletePersonalAttr', id => {
      const index = this.componentDataList.findIndex(element => element.id !== id)
      if (index !== -1) this.deleteAttr(id, index)
    })
  }
}
</script>

<style lang="less" scoped>
.panel-card {
  margin-bottom: 28px;
  .panel-card-header {
    font-size: 16px;
    color: #ffffff;
    background: #005596;
    padding-left: 12px;
    padding-right: 19px;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .btn-sort {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .el-button {
      font-size: 15px;
      color: #ffffff;
      margin-left: 52px;
      background: transparent;
      border: none;
    }
  }
}
.panel-poster {
  background: #ffffff;
  padding: 20px 0px 12px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  .poster-content {
    padding-left: 0px;
    padding-bottom: 30px;
    list-style: none;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    position: relative;
    .attr-card {
      margin: 0 20px 16px;
      .img-size {
        width: 260px;
        height: 278px;
      }
    }
    .btn-more {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
  .get-more {
    text-align: right;
    font-size: 14px;
    cursor: pointer;
    margin-right: 20px;
  }
}
</style>

<style lang="less">
.panel-poster {
  .el-button--text {
    text-decoration: none;
  }
}
.card-material {
  margin-top: 28px;
  .btn-edit {
    display: none;
  }
}
</style>
