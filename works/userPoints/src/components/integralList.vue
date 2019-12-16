<template>
  <div>
    <prompt-modal :messsage="messsage" timeout="2500" @hideModal="messsage=''"></prompt-modal>
    <div class="integralTop">
      <ul>
        <li>当前总积分</li>
        <li>
          {{totalPoints}}
          <img src="../../static/img/jinbi.png">
        </li>
      </ul>
    </div>
    <div class="integralTab">
      <span @click="tabFlag=1" :class="{activeTab:tabFlag==1}">收入</span>
      <span @click="tabFlag=2" :class="{activeTab:tabFlag==2}">支出</span>
    </div>
    <div v-if="tabFlag==1">
      <!-- <img src="../../static/img/emptyList.png" class="emptyLsit"> -->
      <ul class="integralList">
        <li v-for="item in integraList" v-if="item.value>0">
          <img src="../../static/img/phone.png">
          <span>{{item.activityName}}</span>
          <span>{{item.createTime}}</span>
          <span>+{{item.value}}</span>
        </li>
      </ul>
    </div>
    <div v-if="tabFlag==2">
      <ul class="integralList">
        <li v-for="item in integraList" v-if="item.value<0">
          <img src="../../static/img/phone.png">
          <span>{{item.activityName}}</span>
          <span>{{item.createTime}}</span>
          <span>{{item.value}}</span>
        </li>
      </ul>
      <!-- <img src="../../static/img/emptyList.png" class="emptyLsit"> -->
    </div>
  </div>
</template>


<script  src="../../static/js/integralList.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../static/css/integralList.css";
</style>

