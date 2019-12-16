<template>
  <div class="loginBox">
    <prompt-modal :messsage="messsage" timeout="2500" @hideModal="messsage=''"></prompt-modal>
    <div class="loginTitle">
      <img src="../../upresource/img/fordlogo.png">
    </div>
    <ul class="loginBoxUl">
      <li>
        +86>
        <input placeholder="请输入手机号" v-model="phone">
      </li>

      <li>
        <input placeholder="请输入密码" :type="pwType" v-model="password">
        <img src="../../upresource/img/biyan.png" @click="showPw" v-if="this.pwType=='password'">
        <img src="../../upresource/img/zhenyan.png" @click="showPw" v-if="this.pwType=='text'">
        <button @click="resetPassword">忘记密码</button>
      </li>
    </ul>
    <button class="submitButton" @click="submit">登录</button>
    <div class="routePasswordLogin" @click="goLogin">短信验证码登录>></div>
    <div class="routePasswordLogin" @click="goRegistered" style="float:right;">注册>></div>
    <div class="remindMsg">
      <Checkbox v-model="single"></Checkbox>
      <router-link to="serverTerms">登录即同意福特积分服务条款</router-link>
    </div>
  </div>
</template>

<script  src="../../upresource/js/passwordLogin.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
@import "../../upresource/css/passwordLogin.css";
</style>
