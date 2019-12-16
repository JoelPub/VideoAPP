<template>
  <div>
    <prompt-modal :messsage="messsage" timeout="2500" @hideModal="messsage=''"></prompt-modal>
    <div class="tabSelect">
      <!-- <Col span="4.8" :class="{active:activeFlag==5}"> -->
      <span @click="changeActive(5)" :class="{active:activeFlag==5}">全部</span>
      <!-- </Col>
      <Col span="4.8" :class="{active:activeFlag==1}">-->
      <span @click="changeActive(1)" :class="{active:activeFlag==1}">待兑换</span>
      <!-- </Col>
      <Col span="4.8" :class="{active:activeFlag==2}">-->
      <span @click="changeActive(2)" :class="{active:activeFlag==2}">待发货</span>
      <!-- </Col>
      <Col span="4.8" :class="{active:activeFlag==3}">-->
      <span @click="changeActive(3)" :class="{active:activeFlag==3}">待收货</span>
      <!-- </Col>
      <Col span="4.8" :class="{active:activeFlag==4}">-->
      <span @click="changeActive(4)" :class="{active:activeFlag==4}">已完成</span>
      <!-- </Col> -->
    </div>
    <div class="statusMain" v-if="activeFlag==5">
      <!-- <img src="../../upresource/img/emptyList.png" class="emptyLsit" v-if="orderList.length==0"> -->
      <div @click="goPage(item.orderId,item.statusId,5)" v-for="item  in  orderList">
        <Row class-name="productInfo endProductInfo">
          <Col span="6" v-if="item.imageList&&item.imageList[0]">
            <img :src="item.imageList[0]">
          </Col>
          <Col span="18">
            <ul>
              <li>{{item.singleProductName}}</li>

              <li>
                <span>已选择 '{{item.specificationInfo}}'</span>
                <span>× {{item.quality}}</span>
              </li>
              <li>
                <span>合计积分 : {{item.price}}</span>
                <!-- <span class="seeDetails">立即兑换</span> -->
              </li>
            </ul>
            <div class="pendingButton">
              <span
                class="seeDetails"
                style="border:1px solid red;color:red"
                v-if="item.statusId==1"
              >取消订单</span>
              <span class="seeDetails" v-if="item.statusId==1"  @click.stop="confirmpay(item.orderId)">立即兑换</span>
              <span class="seeDetails" v-if="item.statusId==2">待发货</span>
              <span class="seeDetails" v-if="item.statusId==3">待收货</span>
              <span
                class="seeDetails"
                style="border:1px solid red;color:red"
                v-if="item.statusId==5"
              >已取消</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
    <div class="statusMain" v-if="activeFlag==1">
      <!-- <img src="../../upresource/img/emptyList.png" class="emptyLsit" v-if="orderList.length==0"> -->
      <div
        @click="goPage(item.orderId,item.statusId,1)"
        v-if="item.statusId==1"
        v-for="item  in  orderList"
      >
        <Row class-name="productInfo endProductInfo">
          <Col span="6" v-if="item.imageList&&item.imageList[0]">
            <img :src="item.imageList[0]">
          </Col>
          <Col span="18">
            <ul>
              <li>{{item.singleProductName}}</li>

              <li>
                <span>已选择 '{{item.specificationInfo}}'</span>
                <span>× {{item.quality}}</span>
              </li>
              <li>
                <span>合计积分 : {{item.price}}</span>
                <!-- <span class="seeDetails">立即兑换</span> -->
              </li>
            </ul>
            <div class="pendingButton">
              <span
                class="seeDetails"
                style="border:1px solid red;color:red"
                @click.stop="cancelOrder(item.orderId)"
              >取消订单</span>
              <span class="seeDetails" @click.stop="confirmpay(item.orderId)">立即兑换</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
    <div class="statusMain" v-else-if="activeFlag==2">
      <div
        @click="goPage(item.orderId,item.statusId,2)"
        v-if="item.statusId==2"
        v-for="item  in  orderList"
      >
        <Row class-name="productInfo endProductInfo">
          <Col span="6" v-if="item.imageList&&item.imageList[0]">
            <img :src="item.imageList[0]">
          </Col>
          <Col span="18">
            <ul>
              <li>{{item.singleProductName}}</li>

              <li>
                <span>已选择 '{{item.specificationInfo}}'</span>
                <span>× {{item.quality}}</span>
              </li>
              <li>
                <span>合计积分 : {{item.price}}</span>
                <!-- <span class="seeDetails">立即兑换</span> -->
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    </div>
    <div class="statusMain" v-else-if="activeFlag==3">
      <div
        @click="goPage(item.orderId,item.statusId,3)"
        v-if="item.statusId==3"
        v-for="item  in  orderList"
      >
        <Row class-name="productInfo endProductInfo">
          <Col span="6" v-if="item.imageList&&item.imageList[0]">
            <img :src="item.imageList[0]">
          </Col>
          <Col span="18">
            <ul>
              <li>{{item.singleProductName}}</li>

              <li>
                <span>已选择 '{{item.specificationInfo}}'</span>
                <span>× {{item.quality}}</span>
              </li>
              <li>
                <span>合计积分 : {{item.price}}</span>
                <!-- <span class="seeDetails">立即兑换</span> -->
              </li>
            </ul>
            <div class="pendingButton">
              <!-- <span class="seeDetails" style="border:1px solid red;color:red">取消订单</span> -->
              <span class="seeDetails" @click.stop="confirmReceipt(item.orderId)">确认收货</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
    <div class="statusMain" v-else-if="activeFlag==4">
      <div
        @click="goPage(item.orderId,item.statusId,4)"
        v-if="item.statusId==4"
        v-for="item  in  orderList"
      >
        <Row class-name="productInfo endProductInfo">
          <Col span="6" v-if="item.imageList&&item.imageList[0]">
            <img :src="item.imageList[0]">
          </Col>
          <Col span="18">
            <ul>
              <li>{{item.singleProductName}}</li>

              <li>
                <span>已选择 '{{item.specificationInfo}}'</span>
                <span>× {{item.quality}}</span>
              </li>
              <li>
                <span>合计积分 : {{item.price}}</span>
                <!-- <span class="seeDetails">查看详情</span> -->
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script  src="../../upresource/js/logisticsStatus.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../upresource/css/logisticsStatus.css";
</style>

