<template>
  <div class="page-manage-merchant">
    <!-- 经销商表格 -->
    <div class="content-box">
      <div class="btn-list">
        <el-button type="primary" @click="addMerchant">添加经销商</el-button>
        <div @click="updateMerchantMap()" class="btn-update flex-box click-area">
          <img class="img-refresh" src="../../assets/imgs/icon-ref.png" />
          信息更新
          <span class="flex-box" v-if="updateCount">{{ updateCount }}</span>
        </div>
      </div>
      <el-table :data="pageList" stripe>
        <el-table-column label="经销商名称" prop="distrName"></el-table-column>
        <el-table-column label="经销商代码" prop="disCode"></el-table-column>
        <el-table-column label="姓名" prop="userName"></el-table-column>
        <el-table-column label="职位" prop="position"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="运营状态">
          <template slot-scope="scope">
            <el-button
              v-preventReClick
              :class="{ 'mer-status': scope.row.status === 2 }"
              type="primary"
              @click="modifyStatus(scope.row)"
              >{{ scope.row.status === 1 ? '上线' : '下线' }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-contain">
        <el-pagination
          :current-page="pageIndex"
          :page-size="pageSize"
          :page-sizes="[5, 10, 20, 50]"
          layout="sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageList: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      updateCount: 0
    }
  },
  methods: {
    initData(pageIndex, pageSize) {
      this.$http
        .getMerchantMap({
          pageSize: pageSize || this.pageSize,
          pageIndex: pageIndex || this.pageIndex
        })
        .then((res) => {
          this.pageList = res.data.userList.list || []
          this.total = res.data.userList.total
          this.updateCount = res.data.count
        })
    },
    addMerchant() {
      this.$router.push('/addM')
    },
    modifyStatus(user) {
      this.$http.updateMerchant({ id: user.id }).then((res) => {
        this.initData()
      })
    },
    handleSizeChange(size) {
      this.pageIndex = 1
      this.pageSize = size
      this.initData(this.pageIndex, size)
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex
      this.initData(pageIndex, this.pageSize)
    },
    // getUpdate () {
    //   this.$http.updateMerchantMap({
    //     pageIndex: this.pageIndex,
    //     pageSize: this.pageSize,
    //     region: localStorage.getItem('region') || ''
    //   }).then(res => {
    //     if (res.status === 200) {
    //       this.updateCount = res.data.userList.total
    //     }
    //   })
    // },
    updateMerchantMap() {
      this.$http.updateInfoReadList().then((res) => {
        if (res.status !== 200) {
          return this.$message.error('请求失败')
        }
        this.$router.push('/updateInfo')
      })
    }
  },
  mounted() {
    this.initData()
  }
}
</script>

<style lang="less" scoped>
.page-manage-merchant {
  background: url('../../assets/imgs/content_bg.png') no-repeat;
  background-size: cover;
  padding: 36px 14px;
  flex: 1 0 auto;
}
.pagination-contain {
  display: flex;
  justify-content: center;
  margin: 27px 0 0;
}
.content-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  padding-bottom: 27px;
}
.btn-list {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 27px 0 17px;
  .btn-update {
    flex: 0 0 auto;
    margin: 0 80px 0 40px;
    padding: 4px;
    position: relative;
    span {
      display: inline-flex;
      border-radius: 50%;
      background: #005596;
      color: #ffffff;
      font-size: 10px;
      font-weight: bold;
      width: 14px;
      height: 14px;
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(6px, 0px);
    }
    .img-refresh {
      width: 20px;
      height: auto;
      margin-right: 8px;
    }
  }
}
</style>
<style lang="less">
.page-manage-merchant {
  .cell {
    text-align: center;
    font-size: 14px;
  }
  .el-table {
    th {
      background-color: #005596;
      .cell {
        color: #ffffff;
      }
    }
  }
  .el-button--small {
    font-size: 14px !important;
  }
  .el-button--primary {
    &:active,
    &:focus,
    &:hover {
      background-color: #005596;
      border-color: #005596;
    }
  }
}
.mer-status {
  background-color: #c3c3c3;
  border-color: #c3c3c3;
}
</style>
