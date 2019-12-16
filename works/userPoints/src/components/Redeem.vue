<template>
  <div class="body">
    <prompt-modal :messsage="messsage" timeout="2500" @hideModal="messsage=''"></prompt-modal>
    <Row class-name="tabSelect">
      <i-col span="7" :class="{active:activeFlag==1}">
        <span  @click="changeActive(1)">综合</span>
        <img src="../../upresource/img/xia.png" v-if="activeFlag==1">
        <img src="../../upresource/img/shangxia.png" v-else>
      </i-col>
      <i-col span="6" :class="{active:activeFlag==2}">
        <span  @click="changeActive(2)">销量</span>

        <img src="../../upresource/img/xia.png" v-if="activeFlag==2">
        <img src="../../upresource/img/shangxia.png" v-else>
      </i-col>
      <i-col span="6" :class="{active:activeFlag==3}">
        <span   @click="changeActive(3)">积分</span>

        <img  src="../../upresource/img/xia.png" v-if="activeFlag==3">
        <img src="../../upresource/img/shangxia.png" v-else>
      </i-col>
      <i-col span="3" :class="{active:activeFlag==4||activeFlag==5}">
        <img src="../../upresource/img/shaixuan.png" @click="openModal" style="width:18px;height:18px;">
        <!-- <span >筛选</span> -->
      </i-col>
    </Row>
    <!-- <child-component :child-array="parentArray" v-on:myclick="onClick"></child-component> -->

    <ul class="commodityList">
      <li @click="goProductInfo(item.productId)" v-for="item in productList">
        <img :src="item.pictureUrl">
        <div>
          <p>{{item.briefDesc}}</p>
          <span>积分:{{item.price}}</span>
        </div>
      </li>
    </ul>
    <Drawer :closable="false" v-model="showDrawer" class-name="drawerClass">
      <ul class="drawerLi">
        <!-- <li>全部兑换</li> -->
        <li @click="changeActive(4)">
          我可兑换
          <img src="../../upresource/img/jiantou.png">
        </li>
        <li @click="changeActive(5)">
          新品优先
          <img src="../../upresource/img/jiantou.png">
        </li>
      </ul>
    </Drawer>
    <div class="goTop" @click="goTop">
      <img src="../../upresource/img/goshang.png">
    </div>
    <div class="goShop" @click="goShop">
      <span>{{shopCartArrLength}}</span>
      <img src="../../upresource/img/shopcart.png">
    </div>
  </div>
</template>

<script  src="../../upresource/js/Redeem.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../upresource/css/Redeem.css";
</style>










