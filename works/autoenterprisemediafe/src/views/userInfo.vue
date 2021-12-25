<template>
  <div class="page-register">
    <div class="userinfo-box">
      <img
        class="img-close click-area"
        src="../assets/imgs/icon-close1.png"
        @click="back()"
      />
      <p class="page-title">{{ $route.query.title || '账号信息' }}</p>
      <el-form ref="ruleForm" :model="userInfo" :rules="rules" label-width="100px" label-position="left">
        <!-- <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="userInfo.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item> -->
        <el-form-item label="账号" prop="accountNumber" class="userinfo-item">
          <div class="item-fill">
            <!-- <div class="item-label">账号</div> -->
            <el-input disabled v-model="userInfo.accountNumber"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="密码" prop="passWord" class="userinfo-item">
          <div class="item-fill">
            <!-- <div class="item-label">密码</div> -->
            <el-input
              :disabled="password"
              :type="type"
              maxlength="8"
              v-model="userInfo.passWord"
              placeholder="8位数密码，需包含大写字母+小写字母+数字"
            >
            </el-input>
            <img v-if="password" class="img-control" :src="iconW" @click="password = false" />
            <img v-else class="img-control" :src="iconW1" @click="password = false" />
            <img
              v-if="type === 'password'"
              class="img-eye-open"
              @click="setType"
              src="../assets/imgs/icon-eye4.png"
            />
            <img
              v-else
              class="img-eye-open"
              @click="setType"
              src="../assets/imgs/icon-eye3.png"
            />
          </div>
        </el-form-item>
        <el-form-item label="姓名" prop="userName" class="userinfo-item">
          <div class="item-fill">
            <!-- <div class="item-label">姓名</div> -->
            <el-input
              :disabled="userName"
              v-model="userInfo.userName"
            ></el-input>
            <img v-if="userName" class="img-control" :src="iconW" @click="userName = false" />
            <img v-else class="img-control" :src="iconW1" @click="userName = false" />
            <!-- <img class="img-control" :src="iconW" @click="userName = false" /> -->
          </div>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" class="userinfo-item">
          <!-- <div class="item-label">手机号</div> -->
          <!-- <el-input v-model="userInfo.phone" :disabled="phone"></el-input> -->
          <div class="item-fill">
            <el-input maxlength="11" v-model="userInfo.phone" :disabled="phone"></el-input>
            <img v-if="phone" class="img-control" :src="iconW" @click="phone = false" />
            <img v-else class="img-control" :src="iconW1" />
            <!-- <img class="img-control" :src="iconW" @click="phone = false" /> -->
          </div>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" class="userinfo-item">
          <!-- <div class="item-label">邮箱</div> -->
          <div class="item-fill">
            <el-input :disabled="email" v-model="userInfo.email"></el-input>
            <img v-if="email" class="img-control" :src="iconW" @click="email = false" />
            <img v-else class="img-control" :src="iconW1" />
            <!-- <img class="img-control" :src="iconW" @click="email = false" /> -->
          </div>
        </el-form-item>
        <el-form-item v-if="$route.query.type==1" label="职位" prop="position" class="userinfo-item">
          <div class="item-fill">
            <el-input
              :disabled="position"
              v-model="userInfo.position"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item v-if="$route.query.type==1" label="所属区域" prop="region" class="userinfo-item">
          <!-- <div
            class="item-label"
            style="align-self: flex-start; margin-top: 3px"
          >
            所属区域
          </div> -->
          <!-- <div class="item-fill item-fill-column"> -->
            <cascader
            :disabled="dis"
            class="item-fill item-fill-column"
            @setDis="setDis($event)"
          ></cascader>
          <!-- </div> -->
        </el-form-item>
        <el-form-item v-if="$route.query.type==1" label="经销商代码" prop="disCode" class="userinfo-item">
          <!-- <div class="item-label">经销商代码</div> -->
          <div class="item-fill">
            <el-input :disabled="disCode" v-model="userInfo.disCode"></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            v-preventReClick
            class="fillet-btn page-submit"
            type="primary"
            @click="submit()"
            >保存更改</el-button
          >
          <el-button
            class="fillet-btn page-submit"
            style="margin-left: 100px"
            type="primary"
            @click="back()"
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
  data () {
    var checkEmail = (rule, value, callback) => {
      if (value === '') return callback(new Error('邮箱不能为空'))
      else if (!/.+@.+$/.test(value)) return callback(new Error('请输入正确的邮箱'))
      else return callback()
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8}$/.test(value)) {
        callback(new Error('请输入包含大写字母、小写字母、数字的八位数密码'))
      } else {
        callback()
      }
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
          { required: true, message: '', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '', trigger: 'blur' }
        ],
        disCode: [
          { required: true, message: '', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '', trigger: 'blur' }
        ]
      },
      iconW: require('../assets/imgs/icon-write.png'),
      iconW1: require('../assets/imgs/icon-w.png'),
      userInfo: {
        accountNumber: '',
        passWord: '',
        userName: '',
        phone: '',
        email: '',
        position: '',
        disCode: '',
        region: ''
      },
      password: true,
      userName: true,
      phone: true,
      email: true,
      position: true,
      disCode: true,
      dis: true,
      type: 'password'
    }
  },
  methods: {
    setType () {
      if (this.password) return
      this.type = this.type === 'password' ? 'text' : 'password'
    },
    initInfo () {
      this.$http.getUserinfo({ id: localStorage.getItem('id') }).then((res) => {
        const _userInfo = res.data || {}
        for (const key in _userInfo) {
          this.userInfo[key] = _userInfo[key] || ''
        }
        this.$bus.$emit('getInfo', { ...this.userInfo })
      })
    },
    setDis (value) {
      const dis = value || {}
      for (const key in dis) {
        this.userInfo[key] = dis[key]
      }
    },
    submit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$http.updateUserinfo(this.userInfo).then(res => {
            if (res.status === 200) this.$router.back()
            else {}
          })
        }
      })
    },
    formatPas () {
      console.log(this.userInfo)
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8}$/.test(
          this.userInfo.passWord
        )
      ) {
        this.$message({
          type: 'error',
          message: '请输入包含大写字母、小写字母、数字的八位数密码'
        })
      }
    },
    formatEmpty () {
      if (!this.userInfo.userName) throw new Error('请输入用户姓名')
      if (!this.userInfo.region) throw new Error('请选择大区')
      if (!this.userInfo.village) throw new Error('请选择小区')
      if (!this.userInfo.province) throw new Error('请选择省份')
      if (!this.userInfo.city) throw new Error('请选择城市')
      if (!this.userInfo.distrName) throw new Error('请选择经销商')
    },
    phoneFormat (phone = '') {
      if (!/^[1][0-9]{10}$/.test(phone)) throw new Error('请输入正确的手机号')
    },
    back () {
      this.$router.back()
    }
  },
  created () {
    this.initInfo()
  }
}
</script>

<style lang="less" scoped>
.page-register {
  background: url('../assets/imgs/content_bg.png') no-repeat;
  background-size: cover;
  text-align: center;
  padding: 20px 14px;
}
.userinfo-box {
  // width: -webkit-fill-available;
  padding: 36px 130px 35px;
  margin: 20px auto;
  display: inline-block;
  background: #ffffff;
  // background-image: url('../assets/imgs/register-bg.png');
  // background-size: 100% auto;
  // background-repeat: no-repeat;
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
// .userinfo-item {
//   display: flex;
//   white-space: nowrap;
//   justify-content: space-between;
//   align-items: center;
//   margin: 23px 0;
//   color: #666666;
//   font-size: 14px;
//   .item-label {
//     width: 90px;
//     flex-shrink: 1;
//     text-align: left;
//     margin: 0 60px 0 0;
//     color: #666666;
//   }
//   .item-fill {
//     flex-shrink: 1;
//     position: relative;
//     img {
//       width: 20px;
//       height: auto;
//       margin-left: 15px;
//     }
//     .img-eye-open {
//       width: 18px;
//       height: auto;
//       position: absolute;
//       top: 50%;
//       right: 14px;
//       transform: translate(0, -50%);
//     }
//   }
//   img {
//     width: 20px;
//     height: auto;
//     margin-left: 15px;
//   }
// }
.item-fill {
  display: flex;
  align-items: center;
  white-space: nowrap;
  position: relative;
  .img-control {
    flex: 0 0 18px;
    width: 18px;
    height: 18px;
    margin-left: 15px;
  }
  .img-eye-open {
    width: 18px;
    height: auto;
    position: absolute;
    top: 50%;
    right: 47px;
    transform: translate(0, -50%);
  }
}
.item-fill-column {
   flex-direction: column;
}
.page-title {
  color: #005596;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
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
  margin: 25px 0 0;
}
</style>
<style lang="less">
.page-register {
  .el-input__inner {
    border: none;
    background: #eff9ff;
  }
}
</style>
