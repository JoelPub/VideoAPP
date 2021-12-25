<template>
  <div class="page-register">
    <div class="userinfo-box">
      <img class="img-close click-area" @click="back()" src="../assets/imgs/icon-close2.png" />
      <p class="page-title">注册</p>
      <el-form ref="ruleForm" :model="userInfo" :rules="rules" label-width="100px" label-position="left">
        <el-form-item v-if="$route.query.type == 1" label="所属区域" prop="region" class="userinfo-item">
          <cascader class="item-fill item-fill-column" @setDis="setDis($event)"></cascader>
        </el-form-item>
        <el-form-item label="姓名" prop="userName" class="userinfo-item">
          <div class="item-fill">
            <el-input v-model="userInfo.userName" placeholder="请输入姓名"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" class="userinfo-item">
          <div class="item-fill">
            <el-input maxlength="11" v-model="userInfo.phone" placeholder="请输入11位手机号码"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" class="userinfo-item">
          <div class="item-fill">
            <el-input
              v-model="userInfo.email"
              placeholder="建议填写长安福特邮箱，例如：marketing@xxxxxx.caf.so;"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item v-if="$route.query.type == 1" label="职位" prop="position" class="userinfo-item">
          <div class="item-fill">
            <el-select style="width: 100%" v-model="userInfo.position" @change="setAccountNumber">
              <el-option label="总经理" value="总经理"></el-option>
              <el-option label="市场部经理" value="市场部经理"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="账号" prop="accountNumber" class="userinfo-item">
          <div class="item-fill">
            <el-input
              :placeholder="$route.query.type == 1 ? '' : '请输入长安福特员工编号'"
              :disabled="$route.query.type == 1"
              v-model="userInfo.accountNumber"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="密码" prop="passWord" class="userinfo-item">
          <div class="item-fill">
            <el-input
              type="password"
              maxlength="8"
              v-model="userInfo.passWord"
              placeholder="8位数密码，需包含大写字母+小写字母+数字"
            >
            </el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="fillet-btn page-submit" type="primary" @click="submit()" v-preventReClick>注册</el-button>
          <el-button class="fillet-btn page-submit" style="margin-left: 100px" type="primary" @click="back()"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import cascader from '../components/components/cascader'
export default {
  components: { cascader },
  data() {
    var checkEmail = (rule, value, callback) => {
      if (value === '') return callback(new Error('邮箱不能为空'))
      else if (!/.+@.+$/.test(value)) return callback(new Error('请输入正确的邮箱'))
      else return callback()
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') callback(new Error('密码不能为空'))
      else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8}$/.test(value)) {
        callback(new Error('请输入包含大写字母、小写字母、数字的八位数密码'))
      } else callback()
    }
    var validatePhone = (rule, value, callback) => {
      if (value === '') callback(new Error('手机号不能为空'))
      else if (!/^[1][0-9]{10}$/.test(value)) callback(new Error('请输入正确的11位手机号码'))
      else callback()
    }
    var validateName = (rule, value, callback) => {
      if (value === '') callback(new Error('姓名不能为空'))
      else callback()
    }
    var validateDis = (rule, value, callback) => {
      callback()
    }
    var validateAccountNumber = (rule, value, callback) => {
      if (!/^CF.+/.test(value)) {
        if (this.$route.query.type === '2') callback(new Error('请输入长安福特员工编号'))
        else callback()
      } else callback()
    }
    return {
      rules: {
        passWord: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { validator: validateName, trigger: 'blur' }
        ],
        accountNumber: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { validator: validateAccountNumber, trigger: 'blur' }
        ],
        position: [{ required: true, message: '职位不能为空', trigger: 'blur' }],
        region: [
          { required: true, message: '所属区域不能为空', trigger: 'blur' },
          { validator: validateDis, trigger: 'blur' }
        ]
      },
      userInfo: {
        userName: '',
        phone: '',
        email: '',
        position: '',
        region: '',
        village: '',
        province: '',
        city: '',
        distrName: '',
        disCode: '',
        accountNumber: '',
        passWord: ''
      }
    }
  },
  created() {
    this.$bus.$emit('getInfo1', '')
  },
  methods: {
    back() {
      this.$router.back()
    },
    setAccountNumber(value) {
      if (!value) return
      const disCode = this.userInfo.disCode
      const _p = value === '总经理' ? '01' : '02'
      if (disCode) this.userInfo.accountNumber = disCode + _p
      else this.userInfo.accountNumber = ''
    },
    setDis(value) {
      const dis = value || {}
      for (const key in dis) {
        this.userInfo[key] = dis[key]
      }
      this.setAccountNumber(this.userInfo.position)
    },
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$http.userRes({ ...this.userInfo, role: this.$route.query.type }).then((res) => {
            if (res.status === 200) {
              localStorage.setItem('accountNumber', res.data.accountNumber)
              localStorage.setItem('passWord', res.data.passWord)
              this.$store.commit('MODIFY_Dialog')
              const message1 = res.data.accountNumber || this.userInfo.accountNumber
              const message2 = res.data.passWord || this.userInfo.passWord
              this.$nextTick(() => {
                this.$bus.$emit('playDialog', {
                  title: '注册成功',
                  remark: '请妥善保管您的账号密码。',
                  btn: '登录',
                  path: '/login',
                  content: ['您的账号：' + message1, '您的密码：' + message2]
                })
              })
            } else {
              this.$message({
                type: 'error',
                message: res.message
              })
            }
          })
        }
      })
    },
    formatAttr() {
      for (const key in this.userInfo) {
        if (this.userInfo[key].length > 16) throw new Error('字符串过长')
        if (!this.userInfo[key]) throw new Error('请勿输入空内容')
      }
      if (!this.userInfo.userName) throw new Error('请输入用户姓名')
      if (!this.userInfo.region) throw new Error('请选择大区')
      if (!this.userInfo.village) throw new Error('请选择小区')
      if (!this.userInfo.province) throw new Error('请选择省份')
      if (!this.userInfo.city) throw new Error('请选择城市')
      if (!this.userInfo.distrName) throw new Error('请选择经销商')
      if (!this.userInfo.position) throw new Error('请选择职位')
      if (!/^[1][0-9]{10}$/.test(this.userInfo.phone)) throw new Error('请输入正确的11位手机号码')
      if (!/.+@.+$/.test(this.userInfo.email)) throw new Error('请输入正确的邮箱')
      if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8}$/.test(this.userInfo.passWord)) {
        throw new Error('请输入包含大写字母、小写字母、数字的八位数密码')
      }
    },
    phoneFormat(phone = '') {
      if (!/^[1][0-9]{10}$/.test(phone)) throw new Error('请输入正确的手机号')
    }
  }
}
</script>

<style lang="less" scoped>
.page-register {
  background: url('../assets/imgs/content_bg.png') no-repeat;
  background-size: cover;
  text-align: center;
}
.userinfo-box {
  padding: 100px 130px 43px;
  margin: 88px auto 20px;
  display: inline-block;
  background: #ffffff;
  background-image: url('../assets/imgs/register-bg.png');
  background-size: 100% 80px;
  background-repeat: no-repeat;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.16);
  position: relative;
  img {
    width: 100%;
    height: auto;
  }
  .img-close {
    width: 30px;
    position: absolute;
    right: 30px;
    top: 30px;
  }
}
// .userinfo-item {
//   display: flex;
//   white-space: nowrap;
//   justify-content: space-between;
//   align-items: center;
//   margin: 23px 0;
//   color: #666666;
//   font-size: 22px;
//   .item-label {
//     width: 90px;
//     flex-shrink: 1;
//     text-align: left;
//     margin: 0 60px 0 0;
//     color: #666666;
//   }
//   .item-fill {
//     width: 700px;
//     flex-shrink: 1;
//   }
// }
.page-title {
  color: #005596;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  &::before {
    content: '';
    width: 5px;
    height: 21px;
    display: inline-block;
    background: #005596;
    margin-right: 10px;
  }
}
.page-submit {
  margin: 40px 0 0;
}
span {
  color: #ec2727;
  margin-right: 8px;
  // transform: translateY(2px);
}
</style>

<style lang="less">
.page-register {
  .el-input__inner {
    border: none;
    background: #f6f6f6;
  }
}
</style>
