<template>
  <div class="page-update-info flex-box">
    <div class="info-box">
      <p class="page-title">更新信息<img class="click-area" @click="back()" src="../../assets/imgs/icon-back.png"></p>
      <div class="btn-list flex-box">
        <el-input placeholder="搜索经销商名称" prefix-icon="el-icon-search" @change="searchInfo" v-model="searchName"></el-input>
        <el-button v-preventReClick type="primary" @click="modifyAll()">保存修改</el-button>
      </div>
      <el-table :data="pageList" stripe>
        <el-table-column width="120" label="经销商名称" prop="distrName"></el-table-column>
        <el-table-column width="100" label="经销商代码" prop="disCode"></el-table-column>
        <el-table-column width="100" label="姓名">
          <template slot-scope="scope">
            <el-input v-model="scope.row.userName" @change="modifyUserName"></el-input>
          </template>
        </el-table-column>
        <el-table-column width="150" label="职位">
          <template slot-scope="scope">
            <el-select v-model="scope.row.position">
              <el-option label="总经理" value="总经理"></el-option>
              <el-option label="市场部经理" value="市场部经理"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column width="140" label="电话">
          <template slot-scope="scope">
            <el-input v-model="scope.row.phone" @change="modifyPhone"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="邮箱">
          <template slot-scope="scope">
            <el-input v-model="scope.row.email"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="密码">
          <template slot-scope="scope">
            <el-input v-model="scope.row.passWord" @change="changep"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="账号" prop="accountNumber">
        </el-table-column>
        <el-table-column width="120" label="修改时间" prop="updataData"></el-table-column>
      </el-table>
      <div class="pagination-contain">
        <el-pagination
          :current-page="pageIndex"
          :page-size="pageSize"
          :page-sizes="[5, 10, 20, 50]"
          layout="sizes, prev, pager, next, jumper"
          :total="total"
          @size-change='handleSizeChange'
          @current-change='handleCurrentChange'
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageList: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      searchName: ''
    }
  },
  created () {
    this.initData()
  },
  methods: {
    changep (value) {
      console.log(value, this.pageList[0].passWord)
    },
    initData () {
      this.$http.updateMerchantMap({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        if (res.status === 200) {
          this.pageList = res.data.userList.list
          this.total = res.data.userList.total
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    back () {
      this.$router.back()
    },
    modifyUserName (value) {
      console.log(value, this.pageList)
    },
    modifyPhone (value) {},
    modifyAll () {
      const _json = []
      for (const item of this.pageList) {
        try {
          _json.push(this.formatData(item))
        } catch (error) {
          this.$message({
            type: 'error',
            message: error.message
          })
          return
        }
      }
      this.$http.updateMerchants({
        arrayStr: JSON.stringify(_json)
      }).then(res => {
        if (res.status === 200) {
          this.initData()
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    formatData (item) {
      if (!item.userName) throw new Error('请输入用户姓名')
      if (item.position !== '总经理' && item.position !== '市场部经理') throw new Error('请选择职位')
      if (!/^[1][0-9]{10}$/.test(item.phone)) throw new Error('请输入正确的11位手机号码')
      if (!item.email) throw new Error('请输入邮箱')
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8}$/.test(item.passWord)) throw new Error('请输入包含大写字母、小写字母、数字的八位数密码')
      return {
        id: item.id,
        userName: item.userName,
        position: item.position,
        phone: item.phone,
        email: item.email,
        passWord: item.passWord
      }
    },
    searchInfo (value) {
      this.$http.updateMerchantMap({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        search: value
      }).then(res => {
        if (res.status === 200) {
          this.pageList = res.data.userList.list
          this.total = res.data.userList.total
        } else {
          this.pageList = []
          // this.$message({
          //   type: 'warning',
          //   message: res.message
          // })
        }
      })
    },
    // 分页
    handleSizeChange (size) {
      this.pageIndex = 1
      this.pageSize = size
      this.initData()
    },
    handleCurrentChange (pageIndex) {
      this.pageIndex = pageIndex
      this.initData()
    }
  }
}
</script>

<style lang="less" scoped>
.page-update-info {
  background: url('../../assets/imgs/content_bg.png') no-repeat;
  background-size: cover;
  align-items: flex-start;
  padding: 36px 14px;
}
.info-box {
  background: #ffffff;
  padding: 24px 28px;
  width: -webkit-fill-available;
  height: 100%;
}
.page-title {
  margin-bottom: 28px;
  color: #005596;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  align-items: center;
  position: relative;
  &::before {
    content: '';
    width: 5px;
    height: 21px;
    display: inline-block;
    background: #005596;
    margin-right: 10px;
  }
  img {
    position: absolute;
    right: 0;
    top: 50%;
    width: 30px;
    height: auto;
    transform: translate(0, -50%);
  }
}
.btn-list {
  justify-content: space-between;
  padding: 10px 0 20px;
}
.pagination-contain {
  display: flex;
  justify-content: center;
  margin: 27px 0 0;
}
</style>
<style lang="less">
.page-update-info {
  .cell {
    text-align: center;
  }
  .el-table {
    th {
      background-color: #005596;
      .cell {
        color: #ffffff;
      }
    }
    .el-input__inner {
      border: 1px solid transparent;
      background-color: #F6F6F6;
      text-align: center;
    }
    .el-input__inner:focus {
      background: #EFF9FF;
    }
  }
  .el-button--small {
    font-size: 14px !important;
  }
}
.mer-status {
  background-color: #C3C3C3;
  border-color: #C3C3C3;
}
.btn-list {
  .el-input__inner {
    width: 370px;
    border-radius: 20px;
    // flex: 0 1 370px;
  }
}
</style>
