<template>
  <div class="testDrive">
    <prompt-modal :messsage="messsage" timeout="2500" @hideModal="messsage=''"></prompt-modal>
    <li>
      <span>姓名</span>
      <input placeholder="请输入姓名" v-model="postData.name">
    </li>
    <li>
      <span>手机号</span>
      <input placeholder="请输入手机号" v-model="postData.phone" type="number">
    </li>
    <li>
      <span style="color:#333;">验证码</span>
      <input placeholder="请输入验证码" v-model="postData.smsCode">
      <button
        class="getVerification"
        @click="getVerification"
        :disabled="disabledFlag"
      >{{Verification}}</button>
    </li>
    <li>
      <span>经销商</span>
      <input placeholder="搜索附近经销商" @click="goDelaer" v-model="dealerName" style="width:75%;">
      <!-- <Select
        v-model="postData.Dealer"
        style="width:79%;border:none;height:35px;"
        class="testDriveSelect"
      >
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>-->
    </li>

    <!-- <div class="remindMsg">
      <Checkbox v-model="single"></Checkbox>
      <router-link to="serverTerms">登录即同意福特积分平台服务条款</router-link>
    </div> -->
    <button class="submitButton" @click="submitTestDrive">立即预约</button>
  </div>
</template>

<script  src="../../upresource/js/testDrive.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../upresource/css/testDrive.css";
</style>
