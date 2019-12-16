<template>
  <div class="drawBox">
    <img src="../../upresource/img/title.png" class="drawBoxTile">
    <p>
      你今天还有
      <span style="color:#FFC600">{{num}}次</span>
      免费抽奖机会
    </p>
    <div class="square">
      <div class="square-inner grid">
        <div :class="{activeDraw:index==1}">
          <img src="../../upresource/img/zhuanshi.png">
          <br>
          <span>10积分</span>
        </div>
        <div :class="{activeDraw:index==2}">
          <img src="../../upresource/img/small-cry.png">
          <br>
          <span>谢谢参与</span>
        </div>
        <div :class="{activeDraw:index==3}">
          <img src="../../upresource/img/zhuanshi.png">
          <br>
          <span>30积分</span>
        </div>
        <div :class="{activeDraw:index==8}">
          <img src="../../upresource/img/small-cry.png">
          <br>
          <span>谢谢参与</span>
        </div>
        <div @click="startLottery">{{buttonText}}</div>
        <div :class="{activeDraw:index==4}">
          <img src="../../upresource/img/small-cry.png">
          <br>
          <span>谢谢参与</span>
        </div>
        <div :class="{activeDraw:index==7}">
          <img src="../../upresource/img/zhuanshi.png">
          <br>
          <span>50积分</span>
        </div>
        <div :class="{activeDraw:index==6}">
          <img src="../../upresource/img/small-cry.png">
          <br>
          <span>谢谢参与</span>
        </div>
        <div :class="{activeDraw:index==5}">
          <img src="../../upresource/img/zhuanshi.png">
          <br>
          <span>10积分</span>
        </div>
      </div>
    </div>
    <!-- <div class="mixedStrip">
      <img src="../../upresource/img/lihe.png">
    </div>-->
    <Modal v-model="modal1" class-name="drawModal" footer-hide>
      <img v-if="title" src="../../upresource/img/small-diamond.png" >
      <img v-else="title" src="../../upresource/img/small-cry.png" >
      <h3 v-if="title" style="margin-top:10px;">恭喜获得</h3>
      <p class="tips">{{modalMessage}}</p>
      <button @click ="confirmButton" class="confirmButton">确定</button>
    </Modal>

  </div>
</template>


<script  src="../../upresource/js/turntableDraw.js">
</script>
<style scoped>
@import "../../upresource/css/turntableDraw.css";
</style>

