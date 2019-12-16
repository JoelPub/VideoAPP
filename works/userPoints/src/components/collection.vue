<template>
  <div>
    <prompt-modal :messsage="messsage" timeout="2500" @hideModal="messsage=''"></prompt-modal>
    <Row class-name="tabSelect">
      <Col span="12" :class="{active:activeFlag==1}">
        <span @click="changeActive(1)">礼品</span>
      </Col>
      <Col span="12" :class="{active:activeFlag==2}">
        <span @click="changeActive(2)">活动</span>
      </Col>
    </Row>

    <div class="collectionList" v-if="activeFlag==1">
      <!-- <img src="../../static/img/emptyList.png" class="emptyLsit"> -->

      <Row
        v-for="(item,index) in checkBoxArr"
        class-name="shopCartInfo"
        @click.native="goInfo(item.productId)"
      >
        <Col span="7">
          <img :src="item.product.skus[0].imageUrl">
        </Col>
        <Col span="17">
          <ul class="shopCartInfoLeft">
            <li>{{item.product.name}}</li>
            <li>{{item.product.detail}}</li>
            <li>积分:{{item.product.price}}</li>
          </ul>
        </Col>
      </Row>
    </div>
    <div class="loveList" v-if="activeFlag==2">
      <!-- <img src="../../static/img/emptyList.png" class="emptyLsit"> -->
    </div>
  </div>
</template>


<script  src="../../static/js/collection.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../static/css/collection.css";
</style>