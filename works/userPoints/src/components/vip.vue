<template>
  <div>
    <div class="vipTop">
      <img :src="profileImg" class="vipTopLogo">
      <ul>
        <li>总积分</li>
        <li>
          {{totalPoints}}
          <img src="../../static/img/jinbi.png">
        </li>
      </ul>
    </div>
    <div class="vipCard">
      <ul>
        <li>{{leave}}</li>
        <li>会员用户</li>
        <li>
          <img src="../../static/img/jinbi.png">
          {{leaveMsg}}
        </li>
      </ul>
    </div>
    <!-- <div class="vipMain">
      <span class="vipMainTile">当前特权</span>
      <ul class="vipMainUi">
        <li>
          <span></span>
          <p>当前特权</p>
        </li>
        <li>
          <span></span>
          <p>当前特权</p>
        </li>
        <li>
          <span></span>
          <p>当前特权</p>
        </li>

        <li>
          <span></span>
          <p>当前特权</p>
        </li>
        <li>
          <span></span>
          <p>当前特权</p>
        </li>
        <li>
          <span></span>
          <p>当前特权</p>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script  src="../../static/js/vip.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../static/css/vip.css";
</style>
