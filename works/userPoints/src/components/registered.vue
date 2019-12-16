<template>
  <div class="loginBox">
    <prompt-modal :messsage="messsage" timeout="2500" @hideModal="messsage=''"></prompt-modal>
    <div class="loginTitle">
      <img src="../../static/img/fordlogo.png">
    </div>
    <ul class="loginBoxUl">
      <li>
        +86>
        <input
          placeholder="请输入手机号"
          v-model="phoneNumber"
          @blur="inputblur('phoneNumber')"
          name="phoneNumber"
          v-validate="'required|mobile'"
        >
      </li>
      <li>
        <input
          placeholder="请输入验证码"
          v-model="smsCode"
          name="smsCode"
          v-validate="'required'"
          @blur="inputblur('smsCode')"
        >
        <button @click="getVerification" :disabled="disabledFlag">{{Verification}}</button>
      </li>
      <li>
        <input
          placeholder="请输入密码"
          :type="pwType"
          style="width:87%;"
          v-model="passWord"
          name="passwordNew"
          v-validate="'required'"
          @blur="inputblur('passwordNew')"
        >
        <img src="../../static/img/biyan.png" @click="showPw" v-if="this.pwType=='password'">
        <img src="../../static/img/zhenyan.png" @click="showPw" v-if="this.pwType=='text'">
      </li>
    </ul>
    <button class="submitButton" @click="creatAccount">注册</button>
    <div class="routePasswordLogin" @click="goPasswordLogin">账号密码登录>></div>
    <div class="remindMsg">
      <Checkbox v-model="single"></Checkbox>
      <router-link to="serverTerms">登录即同意福特积分平台服务条款</router-link>
    </div>
  </div>
</template>

<script  src="../../static/js/registered.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
@import "../../static/css/passwordLogin.css";
</style>
