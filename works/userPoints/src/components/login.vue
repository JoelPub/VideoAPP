<template>
  <div class="loginBox">
    <prompt-modal :messsage="messsage" timeout="2500" @hideModal="messsage=''"></prompt-modal>
    <div class="loginTitle">
      <img src="../../upresource/img/fordlogo.png">
    </div>
    <ul class="loginBoxUl">
      <li>
        +86>
        <input placeholder="请输入手机号" v-model="postData.mobile">
      </li>
      <li>未注册的手机号验证后自动创建积分账户</li>
      <li>
        <input placeholder="请输入验证码" v-model="postData.smsCode">
        <button @click="getVerification" :disabled="disabledFlag">{{Verification}}</button>
      </li>
    </ul>
    <button class="submitButton" @click="login">登录</button>
    <!-- <div class="routePasswordLogin" @click="goPasswordLogin">账号密码登录></div> -->
    <div class="routePasswordLogin" @click="weChatLogin">微信登录></div>
    <div class="remindMsg">
      <Checkbox v-model="single"></Checkbox>
      <!-- <span>登录即同意福特积分平台服务条款</span> -->
      <router-link to="serverTerms">登录即同意福特积分服务条款</router-link>
    </div>
  </div>
</template>
<script>
import { apiAll } from "@/request/api"; // 导入我们的api接口

import { get, post } from "@/request/https";
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      Verification: "获取验证码",
      disabledFlag: false,
      postData: {},
      messsage: "",
      single: "",
      href: "",
      redirect: ""
    };
  },
  created(){
    alert(999)
    console.log('this.$route.querylog:', this.$route.query)
  },
  methods: {
    goPasswordLogin: function() {
      this.$router.push({ path: "/passwordLogin" });
    },
    getVerification: function() {
      if (!this.postData.mobile) {
        this.messsage = "手机号不能为空";
        return;
      }
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(this.postData.mobile)) {
        this.messsage = "手机号格式不正确";
        return;
      }

      let url = apiAll.sendSMSCode2();
      let data = {
        phoneNumber: this.postData.mobile,
        useful: 1
      };
      this.$http({
        method: "get",
        url: url,
        params: data,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {})
        .catch(error => {});
      // apiAll.sendSMSCode({ phoneNumber: this.postData.mobile, useful: 1 })
      //   .then((res)=> {
      //  console.log('res:',res)
      // }).catch(eror=>{
      //   console.log(eror)
      // })

      this.Verification = "60";
      this.disabledFlag = true;
      var getVerification = setInterval(() => {
        this.Verification = this.Verification -= 1;
        console.log("函数内======" + this.Verification);
        if (this.Verification == 1) {
          this.Verification = "获取验证码";
          clearInterval(getVerification);
          this.disabledFlag = false;
        }
      }, 1000);
    },
    login: function() {
      if (!this.postData.mobile) {
        this.messsage = "手机号不能为空";
        return;
      }
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(this.postData.mobile)) {
        this.messsage = "手机号格式不正确";
        return;
      }
      if (!this.postData.smsCode) {
        this.messsage = "验证码不能为空";
        return;
      }
      if (!this.single) {
        this.messsage = "请阅读福特积分平台服务条款";
        return;
      }
      var postData = {
        password: this.postData.smsCode.toString(),
        phoneNumber: this.postData.mobile,
        source: 1,
        type: 2
      };
      var _this = this;
      apiAll.login(postData).then(function(res) {
        if (res.httpCode == 200) {
          console.log(res);
          localStorage.setItem("accountId", res.data.accountId);
          // localStorage.setItem('accountId', '14');
          localStorage.setItem("token", res.data.access_token);
          localStorage.setItem("refresh_token", res.data.access_token);
          apiAll.profile(res.data.accountId).then(function(res) {
            console.log(res);
            if (res.httpCode == 200) {
              console.log(res);
              localStorage.setItem("ProfileInfo", JSON.stringify(res.data));
            }
          });
          _this.messsage = "登录成功";
          _this.$router.push({
            path: "/indexPage"
          });
        }
      });
    },
    weChatLogin: function() {
      window.location.href =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxca895002b23a333f&redirect_uri=https%3a%2f%2ftdpfe.apps.pp01.cneast.cf.ford.com.cn%2f%23%2findexPage&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    },
    getQueryString: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
    replaceParamVal: function(paramName, replaceWith) {
      var oUrl = this.location.href.toString();
      var re = eval("/(" + paramName + "=)([^&]*)/gi");
      var nUrl = oUrl.replace(re, paramName + "=" + replaceWith);
      this.location = nUrl;
      window.location.href = nUrl;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../upresource/css/login.css";
</style>
