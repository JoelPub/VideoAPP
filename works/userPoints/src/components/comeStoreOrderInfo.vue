<template>
  <div class="statusMain" style="margin-top:0px;">
    <prompt-modal :messsage="messsage" timeout="2500" @hideModal="messsage=''"></prompt-modal>

    <div>
      <div class="comeStoreTitle">
        <span>配送至门店</span>
      </div>
      <div>
        <ul class="recordUl">
          <li>
            <Row>
              <Col span="4">
                <img src="../../upresource/img/iphone.jpg">
              </Col>
              <Col span="20">
                <ul class="recordUlLeft" style="padding-left:10px;">
                  <li>公司名称公司名称公司名称公司名称</li>
                  <li>地址地址地址地址地址地址地址地址地址地址地址</li>
                  <li>日期日期日期日期</li>
                </ul>
              </Col>
            </Row>
          </li>
        </ul>
      </div>
      <div class="comeStoreNavigation" @click="goNavigation">
        <img src="../../upresource/img/dingwei.png">
        <span>导航去门店</span>
        <img src="../../upresource/img/jiantou.png">
      </div>
      <Row class-name="productInfo">
        <Col span="6">
          <img src="../../upresource/img/iphone.jpg">
          <img src>
        </Col>
        <Col span="18">
          <ul>
            <li>数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据</li>
            <li>已选择 '红色'</li>
            <li>
              <span>积分 : 1600</span>
              <span>× 1</span>
            </li>
          </ul>
        </Col>
      </Row>
      <div class="orderInfoMain">
        <ul>
          <li>
            <span>商品总价</span>
            <span>1000</span>
          </li>
          
          <li>
            <span>订单总计</span>
            <span>1000</span>
          </li>
         
        </ul>
      </div>
      <div class="orderInfoBottom">
        <ul>
          <li>订单信息</li>
          <li>
            <span>账号:</span>
            <span>1000</span>
          </li>
          <li>
            <span>订单编号:</span>
            <span>1000</span>
          </li>
          <li>
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
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script  src="../../upresource/js/comeStoreOrderInfo.js">
</script>
<style >
@import "../../upresource/css/logisticsStatus.css";
@import "../../upresource/css/comeStoreOrderInfo.css";
</style>
