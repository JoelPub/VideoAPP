<template>
  <div>
    <prompt-modal :messsage="messsage" timeout="2500" @hideModal="messsage=''"></prompt-modal>
    <div class="checkInTop">
      <span>
        <span v-if="data.isSignInToday">
          已签到
          <img
            src="../../upresource/img/checkInEnd.png"
            style="vertical-align:middle;margin-top:-5px;"
          >
        </span>
        <span v-if="!data.isSignInToday" @click="checkIn">签到</span>
      </span>
      <p v-if="data.keepSignInDays>0">已经连续签到{{data.keepSignInDays}}天，继续加油</p>
    </div>
    <div class="calendar">
      <div class="calendarTime">{{timeer}}</div>
      <ul class="calendarTitle">
        <li>日</li>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
        <li v-for="(item,index) in days" :class="`week${item.day}`">
          <span :class="{checkInActive:item.isSignIn==true}">{{item.day}}</span>
        </li>
      </ul>
    </div>
    <span
      class="mark"
    >第1天签到可获得1分，第2天签到可获得2分，第3天签到可获得3分，以此类推，逐日递增，直至第7天，第8天起重新计算，一旦漏签，也重新计算（第1天1分，第2天2分…）。当月签到未有漏签，可额外获得50个积分的全勤奖励</span>
  </div>
</template>

<script  src="../../upresource/js/checkIn.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../upresource/css/checkIn.css";
</style>
