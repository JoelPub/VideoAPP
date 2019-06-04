<template>
  <div class="statusMain" style="margin-top:0px;">
    <div class="address" v-if="orderInfo.shippingAddressInfo">
      <img src="../../static/img/wuliu.png">
      <ul>
        <li>
          <span>收货人:{{orderInfo.shippingAddressInfo.contactPerson}}</span>
          <span>{{orderInfo.shippingAddressInfo.contactNumber}}</span>
        </li>
        <li>收货地址:{{orderInfo.shippingAddressInfo.fullInfo}}</li>
      </ul>
    </div>
    <div>
      <Row class-name="productInfo" v-for="item in orderInfo.orderItemList">
        <Col span="6">
          <img :src="item.imageUrl">
          <img src>
        </Col>
        <Col span="18">
          <ul>
            <li>{{item.name}}</li>
            <li>已选择 '{{item.identificationInfo}}'</li>
            <li>
              <span>积分 : {{item.price}}</span>
              <span>× {{item.quality}}</span>
            </li>
          </ul>
        </Col>
      </Row>

      <div class="total">
        <span>共 {{orderInfo.orderItemList.length}}件商品</span>
        <span>合计 {{orderInfo.price}}</span>
      </div>
      <!-- <div class="statusButton">
        <button>提醒发货</button>
      </div>-->
      <div @click="receiptOrder(orderInfo.orderId)" class="quickCreatOrder">我要收货</div>
    </div>
  </div>
</template>


<script  src="../../static/js/receiptOrderInfo.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../static/css/logisticsStatus.css";
</style>

