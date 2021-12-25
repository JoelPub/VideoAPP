<template>
  <div class="page-add-merchant">
    <div class="merinfo-box">
      <img class="img-close click-area" @click="back()" src="../../assets/imgs/icon-close1.png">
      <p class="page-title">新建经销商</p>
      <div class="userinfo-item">
        <div class="item-label"><span>*</span>经销商名称</div>
        <div class="item-fill"><el-input v-model="merchant.name"></el-input></div>
      </div>
      <div class="userinfo-item addMarea">
        <div class="item-label" style="align-self: flex-start;margin-top: 3px;"><span>*</span>所属区域</div>
        <cascader class="item-fill" @setDis='setDis($event)'></cascader>
      </div>
      <div class="userinfo-item">
        <div class="item-label"><span>*</span>经销商代码</div>
        <div class="item-fill"><el-input v-model="merchant.code"></el-input></div>
      </div>
      <div class="btn-group">
        <el-button v-preventReClick class="position-bottom fillet-btn page-submit" type="primary" @click="submit()">保存</el-button>
        <el-button class="position-bottom fillet-btn page-submit btn-cancel" type="primary" @click="back()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import cascader from '../../components/components/cascader'
export default {
  components: { cascader },
  data () {
    return {
      merchant: {
        name: '',
        code: '',
        cityId: ''
      }
    }
  },
  methods: {
    setDis (value) {
      const dis = value || {}
      for (const key in dis) {
        this.merchant[key] = dis[key]
      }
    },
    submit () {
      this.merchant.cityId = localStorage.getItem('addMId')
      // for (const key in this.merchant) {
      //   if (this.merchant[key] === '') return
      // }
      if (this.merchant.name === '') {
        return this.$message.error('请输入经销商名称')
      }
      if (this.merchant.cityId === '') {
        return this.$message.error('请选择所属区域')
      }
      if (this.merchant.code === '') {
        return this.$message.error('请输入经销商代码')
      }
      this.$http.addMerchant(this.merchant).then(res => {
        if (res.status === 200) {
          this.$message.success('添加成功')
          setTimeout(() => {
            this.$router.back()
          }, 1000)
        }
      })
    },
    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.page-add-merchant {
  background: url('../../assets/imgs/content_bg.png') no-repeat;
  background-size: cover;
  text-align: center;
  padding: 36px 14px;
}
.merinfo-box {
  // height: 100%;
  padding: 62px 130px;
  margin: 0 auto;
  display: inline-block;
  background: #ffffff;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.16);
  position: relative;
  img {
    width: 100%;
    height: auto;
  }
  .img-close {
    width: 24px;
    height: auto;
    position: absolute;
    right: 36px;
    top: 36px;
  }
}
.btn-group{
  margin-top: 50px;
  margin-left: 150px;
  .btn-cancel{
    margin-left: 100px;
  }
}
.page-title {
  color: #005596;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  align-items: center;
  &::before {
    content: '';
    width: 5px;
    height: 21px;
    display: inline-block;
    background: #005596;
    margin-right: 10px;
  }
}
.userinfo-item {
  display: flex;
  white-space: nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 23px 0;
  color: #666666;
  font-size: 22px;
  .item-label {
    width: 90px;
    flex-shrink: 1;
    text-align: left;
    margin: 0 60px 0 0;
    color: #666666;
  }
  .item-fill {
    width: 420px;
    flex-shrink: 1;
  }
}
// .pos-bottom {
//   position: absolute;
//   bottom: 32px;
// }
span {
  color: #EC2727;
  margin-right: 8px;
}
</style>

<style lang="less">
.page-add-merchant {
  .el-input__inner {
    border: none;
    background: #F6F6F6;
  }
}
.addMarea .addMHide{
  display: none !important;
}
</style>
