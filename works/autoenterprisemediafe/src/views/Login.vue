<template>
  <div class="page-login flex-box">
    <div class="login-box">
      <icon-logo-login />
      <!-- <img src="../assets/imgs/logo3.png"> -->
      <p class="logininfo-name">用户名</p>
      <el-input placeholder="请输入账号" v-model="accountNumber" @input="message=''"></el-input>
      <p class="logininfo-psd">密码</p>
      <div style="position: relative">
        <el-input type="password" placeholder="请输入密码" v-model="passWord" @keyup.enter.native="Login" @input="message=''"></el-input>
      </div>
      <div class="logininfo-tip">
        <el-checkbox v-model="ifRememberMe">记住密码</el-checkbox>
        <div class="tip-password click-area" @click="tipDialog=true">忘记密码</div>
        |
        <div class="tip-register click-area" @click="registerDialog=true">注册</div>
      </div>
      <p class="error-tip">{{message}}</p>
      <el-button v-preventReClick class="btn-login" type="primary" @click="Login()">立即登录</el-button>
    </div>
    <transition>
      <div class="login-mask flex-box" v-if="tipDialog">
        <div class="dialog-content">
          <img src="../assets/imgs/tip.png">
          <p>提示</p>
          <p>如忘记密码，可联系区域管理员。</p>
          <el-button style="width: 300px" type="primary" @click="tipDialog=false">确定</el-button>
        </div>
      </div>
    </transition>
    <div class="attr-mask flex-box" v-if="registerDialog">
      <div class="attr-content">
        <img src="../assets/imgs/icon-close1.png" @click="registerDialog=false">
        <p>请选择您的账号类型</p>
        <div class="select-role">
          <el-select placeholder="请选择您的角色" v-model="registerRole">
            <el-option label="经销商伙伴" value="1"></el-option>
            <el-option label="长安福特销售部" value="2"></el-option>
          </el-select>
        </div>
        <el-button class="page-btn" type="primary" @click="skip('/register')">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import IconLogoLogin from '../components/icons/IconLogoLogin'

export default {
  components: { IconLogoLogin },
  computed: {
    ifRememberMe: {
      get () {
        return this.$store.state.ifRememberMe
      },
      set () {
        this.$store.commit('MODIFY_REMEBER')
      }
    }
  },
  data () {
    return {
      accountNumber: '',
      passWord: '',
      // ifRememberMe: true,
      tipDialog: false,
      type: 'password',
      message: '',
      registerDialog: false,
      registerRole: '1'
    }
  },
  mounted () {
    this.accountNumber = localStorage.getItem('accountNumber') || ''
    this.passWord = localStorage.getItem('passWord') || ''
    if (!this.ifRememberMe) localStorage.removeItem('passWord')
  },
  methods: {
    setType () {
      this.type = this.type === 'password' ? 'text' : 'password'
    },
    skip (path) {
      this.$router.push({
        path: path,
        query: { type: this.registerRole }
      })
    },
    Login () {
      if (!this.accountNumber || !this.passWord) {
        this.message = '*' + '请勿输入空内容'
        setTimeout(() => {
          this.message = ''
        }, 1000)
      }
      this.$http.userLogin({
        accountNumber: this.accountNumber,
        passWord: this.passWord
      }).then(res => {
        if (res.status === 200) {
          sessionStorage.setItem('id', res.data.id)
          localStorage.setItem('id', res.data.id || '')
          localStorage.setItem('region', typeof (res.data.region) === 'string' ? res.data.region : '')
          localStorage.setItem('userName', res.data.userName)
          localStorage.setItem('role', res.data.role)
          localStorage.setItem('accountNumber', this.accountNumber)
          this.$store.commit('SET_ROLE', res.data.role)
          if (this.ifRememberMe) localStorage.setItem('passWord', this.passWord)
          this.$store.commit('MODIFY_User', res.data)
          this.$store.commit('MODIFY_ASIDE')
          if (res.data.role !== 1) {
            this.$router.replace('/manageMer')
          } else this.$router.replace('/publicAssets')
        } else {
          this.message = '*' + res.message
          setTimeout(() => {
            this.message = ''
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page-login {
  min-width: 423px;
  background: url('../assets/imgs/login-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  justify-content: flex-end;
  padding-right: 10%;
  flex: 1 0 auto;
  .login-box {
    width: 420px;
    opacity: 0.8;
    background: #ffffff;
    box-shadow: 0px 6px 10px rgba(14, 40, 56, 0.16);
    border-radius: 13px;
    padding: 35px 47px 44px;
    text-align: center;
    position: relative;
    img {
      width: 166px;
      height: auto;
    }
    p {
      text-align: left;
    }
    .logininfo-name {
      margin: 24px 0 10px;
    }
    .logininfo-psd {
      margin: 18px 0 10px;
      position: relative;
    }
    .logininfo-tip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 26px 0 48px;
    }
     .img-eye-open {
      width: 18px;
      height: auto;
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
}
.tip-password, .tip-register {
  flex: 0 0 auto;
  text-decoration: underline;
}
.tip-password {
  flex: 1 0 auto;
  text-align: right;
  margin-right: 14px;
}
.tip-register {
  margin-left: 14px;
}
.dialog-content {
  background: #ffffff;
  padding: 55px 47px 44px;
  border-radius: 16px;
  text-align: center;
  img {
    width: 66px;
    height: auto;
  }
  p {
    &:nth-of-type(1) {
      font-weight: bold;
      margin-top: 6px;
    }
    &:nth-of-type(2) {
      margin: 42px 0 82px;
    }
  }
}
.error-tip {
  position: absolute;
  bottom: 100px;
  left: 47px;
  color: #EC2727;
}
.attr-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(51, 51, 51, .8);
    .attr-content {
      background: #ffffff;
      padding: 50px 40px 44px;
      border-radius: 5px;
      text-align: center;
      position: relative;
      p {
        line-height: 2.5;
        text-align: left;
        &:nth-of-type(1) {
          margin-bottom: 20px;
          text-align: left;
          font-size: 18px;
        }
      }
      .el-select{
        width: 100%;
      }
      img {
        width: 24px;
        height: auto;
        position: absolute;
        top: 20px;
        right: 20px;
        &:hover {
          cursor: pointer;
        }
      }
      .page-btn {
        width: 300px;
        margin-top: 108px;
        padding: 13px 0;
        font-size: 18px;
      }
    }
  }
</style>
<style lang="less">
.btn-login {
  width: 100%;
  font-size: 18px;
  padding: 13px 0;
}
</style>
