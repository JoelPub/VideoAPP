<template>
  <div class="orderInfo">
    <prompt-modal :messsage="messsage" timeout="2500" @hideModal="messsage=''"></prompt-modal>
    <!-- <div class="Logistics">
      <img src="../../upresource/img/gouwuche.png">
      <ul>
        <li>
          数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据
          数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据
        </li>
        <li>2019-04-08 19:57:01</li>
      </ul>
    </div>-->
    <div class="address" v-if="orderInfo.shippingAddressInfo">
      <img src="../../upresource/img/dizhi.png">
      <ul>
        <li>
          <span>收货人 :{{orderInfo.shippingAddressInfo.contactPerson}}</span>
          <span style="float:right;">{{orderInfo.shippingAddressInfo.contactNumber}}</span>
        </li>
        <li>收货地址:{{orderInfo.shippingAddressInfo.fullInfo}}</li>
      </ul>
    </div>
    <div>
      <Row class-name="productInfo" v-for="item in orderInfo.orderItemList">
        <Col span="6">
          <img :src="item.imageUrl">
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
      <div class="orderInfoMain">
        <ul>
          <li style="color:#333;font-weight: bold;">
            <span>订单总计</span>
            <span>{{orderInfo.quality}}</span>
          </li>
          <li>
            <span>实际付款</span>
            <span style="color:#E15967;">
              <span>{{orderInfo.quality}}</span>
            </span>
          </li>
        </ul>
      </div>
      <div class="orderInfoBottom">
        <ul>
          <li>订单信息</li>
          <!-- <li>
            <span>账号:</span>
            <span>1000</span>
          </li>-->
          <li>
            <span>订单编号:</span>
            <span>{{orderInfo.orderId}}</span>
          </li>
          <li>
            <span>快递公司:</span>
            <span>{{orderInfo.expressCompanyName}}</span>
          </li>
          <li>
            <span>快递编号:</span>
            <span>{{orderInfo.expressNumber}}</span>
          </li>
          <!-- <li>
            <span>创建时间:</span>
            <span>1000</span>
          </li>
          <li>
            <span>付款时间:</span>
            <span>1000</span>
          </li>
          <li>
            <span>发货时间:</span>
            <span>1530</span>
          </li>
          <li>
            <span>成交时间:</span>
            <span>1530</span>
          </li>-->
        </ul>
      </div>
    </div>
  </div>
</template>


<script  src="../../upresource/js/orderInfo.js">
</script>
<style scoped>
@import "../../upresource/css/logisticsStatus.css";
@import "../../upresource/css/orderInfo.css";
</style>
