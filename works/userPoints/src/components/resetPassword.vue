<template>
  <div class="loginBox">
    <prompt-modal :messsage="messsage" timeout="2500" @hideModal="messsage=''"></prompt-modal>
    <div class="loginTitle">
      <img src="../../upresource/img/fordlogo.png">
    </div>

    <ul class="loginBoxUl">
      <li>
        +86>
        <input
          placeholder="请输入手机号"
          v-model="phoneNumber"
          @blur="blur('phoneNumber')"
          name="phoneNumber"
          v-validate="'required|mobile'"
        >
        <!-- <span v-show="errors.has('phoneNumber')">{{ errors.first('phoneNumber') }}</span> -->
      </li>
      <li>
        <input
          placeholder="请输入验证码"
          v-model="smsCode"
          name="smsCode"
          v-validate="'required'"
          @blur="blur('smsCode')"
        >
        <button @click="getVerification" :disabled="disabledFlag">{{Verification}}</button>
      </li>
      <li>
        <input
          placeholder="请输入新密码"
          :type="pwType"
          style="width:87%;"
          v-model="passWord"
          name="passwordNew"
          v-validate="'required'"
          @blur="blur('passwordNew')"
        >
        <img src="../../upresource/img/biyan.png" @click="showPw" v-if="this.pwType=='password'">
        <img src="../../upresource/img/zhenyan.png" @click="showPw" v-if="this.pwType=='text'">
      </li>
    </ul>

    <button class="submitButton" @click="resetPassWord">重置密码</button>
    <div class="routePasswordLogin" @click="goPasswordLogin">账号密码登录>></div>
    <div class="remindMsg">
      <Checkbox v-model="single"></Checkbox>
      <router-link to="serverTerms">登录即同意福特积分服务条款</router-link>
    </div>
  </div>
</template>

<script  src="../../upresource/js/resetPassword.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
@import "../../upresource/css/passwordLogin.css";
</style>
