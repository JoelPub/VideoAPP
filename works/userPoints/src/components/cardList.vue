<template>
  <div>
    <prompt-modal :messsage="messsage" timeout="2500" @hideModal="messsage=''"></prompt-modal>
    <Row class-name="tabSelect">
      <Col span="8" :class="{active:activeFlag==1}">
        <span @click="changeActive(1)">未使用</span>
      </Col>
      <Col span="8" :class="{active:activeFlag==2}">
        <span @click="changeActive(2)">使用记录</span>
      </Col>
      <Col span="8" :class="{active:activeFlag==3}">
        <span @click="changeActive(3)">已过期</span>
      </Col>
    </Row>
    <div class="cardList" v-if="activeFlag==1">
      <img src="../../upresource/img/emptyList.png" class="emptyLsit">
      <!-- <Row v-for="(item,index) in checkBoxArr" class-name="cardInfo">
        <Col span="19">
          <div class="cardImg">
            <span>16</span>
            <span>积分券</span>
          </div>
          <ul class="cardInfoLeft">
            <li>
              <span>满五百积分可用</span>
              (全平台使用)
            </li>
            <li>2019.04.24-2019.05.25</li>
          </ul>
        </Col>
        <Col span="5" style="text-align:right;">
          <span class="cardInfoRight" @click="goBuy">立即使用</span>
        </Col>
      </Row>-->
    </div>
    <div class="cardList" v-if="activeFlag==2">
      <img src="../../upresource/img/emptyList.png" class="emptyLsit">
    </div>
    <div class="cardList" v-if="activeFlag==3">
      <img src="../../upresource/img/emptyList.png" class="emptyLsit">
    </div>
  </div>
</template>

<script  src="../../upresource/js/cardList.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../upresource/css/cardList.css";
</style>
