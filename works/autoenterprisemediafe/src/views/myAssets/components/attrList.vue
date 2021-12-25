<template>
  <div class="panel-card">
    <div class="panel-card-header">
      <span>历史素材</span>
      <div class="btn-sort">
        <el-button @click="materialTimeSort"
          >时间排序
          <i v-if="sort" class="el-icon--right el-icon-caret-bottom"></i>
          <i v-else class="el-icon--right el-icon-caret-top"></i>
          <!-- <i class="el-icon--right el-icon-caret-top"></i> -->
        </el-button>
      </div>
    </div>
    <div class="panel-poster">
      <div v-if="componentDataList.length" class="poster-content">
        <card
          v-for="(item, i) in componentDataList"
          :key="item.id"
          :card="item"
          :ifCanEdit="false"
          :ifShowPeriodOfUse="false"
          :ifBtnFavorite="false"
          typeName="kv"
          @downAttr="downAttr({ src: item.sourceUrl, fileName: item.fileName, type: '素材' })"
          @deleteAttr="deleteAttr(item.id, i)"
          style="margin-bottom: 20px"
        >
          <template v-slot:attr>
            <img
              @click="$emit('playVideo', Object.assign(item))"
              :src="item.sourceUrl"
              alt="loading"
              class="click-area"
            />
          </template>
          <template v-slot:type>图片</template>
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
import card from '../../../components/components/card'
import { downLoadAttr, replaceListItem } from '../../../tools/index'
export default {
  components: { card },
  data() {
    return {
      componentDataList: [],
      total: '',
      pageSize: 4,
      pageIndex: 1,
      userId: localStorage.getItem('id') || '',
      sort: 0
    }
  },
  created() {
    this.$bus.$on('searchUserTemplate', fileName => {
      console.log('资源')
      this.refreshComponentData('searchUserTemplate', fileName)
    })
    this.$bus.$on('deletePersonalAttr', id => {
      const index = this.componentDataList.findIndex(element => element.id !== id)
      if (index !== -1) this.deleteAttr(id, index)
    })
    this.$http
      .myassetsList({
        pageSize: 4,
        pageIndex: 1,
        userId: localStorage.getItem('id') || ''
      })
      .then(res => {
        if (res.status === 200) {
          this.total = res.data.total
          this.componentDataList = res.data.list
        }
      })
  },
  methods: {
    downAttr(videoSource) {
      downLoadAttr(this, videoSource)
    },
    handleSizeChange(size) {
      this.pageIndex = 1
      this.pageSize = size
      this.refreshComponentData('myassetsList')
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex
      this.refreshComponentData('myassetsList')
    },
    deleteAttr(templateId, index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          this.$http
            .templateEditDel({
              id: templateId
            })
            .then(res => {
              if (res.status === 200) {
                // this.initData()
                this.componentDataList.splice(index, 1)
                this.refreshComponentData('myassetsList')
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
    materialGetMore() {
      this.sort = 0
      this.pageIndex++
      this.getComponentData()
    },
    materialTimeSort() {
      this.sort = this.sort ? 0 : 1
      if (!this.sort) this.refreshComponentData('myassetsList')
      else this.refreshComponentData('matTimeSort')
    },
    getComponentData() {
      const { pageIndex, pageSize, userId } = this
      this.$http
        .myassetsList({
          pageSize,
          pageIndex,
          userId
        })
        .then(res => {
          if (res.status === 200) {
            this.total = res.data.total
            res.data.list.forEach(element => this.componentDataList.push(element))
          }
        })
    },
    // myassetsList
    refreshComponentData(apiName, fileName) {
      console.log('refreshComponentData' + '资源')
      const { pageIndex, pageSize, userId } = this
      this.$http[apiName]({
        pageSize,
        pageIndex,
        userId,
        fileName,
        typeName: '图片'
      }).then(res => {
        if (res.status === 200) {
          this.total = res.data.total
          if (!res.data.list) replaceListItem(this.componentDataList, res.data.historyMedia.list)
          else replaceListItem(this.componentDataList, res.data.list)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.panel-card {
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
