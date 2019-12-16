<template>
  <div>
    <div>
      <prompt-modal :messsage="messsage" timeout="2500" @hideModal="messsage=''"></prompt-modal>
      <ul class="tabr">
        <li @click="activeFlag=1" :class="{tabActive:activeFlag==1}">
          <img src="../../static/img/kdps2.png" v-if="activeFlag==1">
          <img src="../../static/img/kdps.png" v-else>
          <span>快递配送</span>
        </li>
        <li @click="disabled" :class="{tabActive:activeFlag==2}">
          <img src="../../static/img/ddzt.png" v-if="activeFlag==2">
          <img src="../../static/img/ddzt2.png" v-else>
          <span>到店自取</span>
        </li>
      </ul>
    </div>

    <div>
      <Row class-name="address" v-if="defaultAddress">
        <Col span="24" style="padding-top:10px;">
          <div style="width:10%; display:inline-block;">
            <img src="../../static/img/dizhi.png">
          </div>
          <ul>
            <li v-if="activeFlag==2">提货门店 : 数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据</li>
            <li v-if="activeFlag==1">
              收货人：{{defaultAddress.contactPerson}}
              <span
                style="float:right;"
              >{{defaultAddress.contactNumber}}</span>
            </li>
            <li>收货地址 : {{defaultAddress.fullInfo}}</li>
            <li v-if="activeFlag==2" style=" color: #0BA0DD;">021-8384772727</li>
          </ul>
          <div style="width:10%; display: inline-block;text-align:center" @click="goAddressList">
            <img src="../../static/img/add.png">
          </div>
        </Col>
      </Row>
      <Row class-name="emptyAddress" v-else>
        <ul>
          <li>
            <img src="../../static/img/empty.png">
          </li>
          <li>
            <span>你还没有添加收货地址</span>
          </li>
          <li>
            <span class="addAddress" @click="goAddress">添加收货地址</span>
          </li>
        </ul>
      </Row>
    </div>
    <div class="shopCartList">
      <CheckboxGroup @on-change="checkboxChange()" v-model="selectArr">
        <Row v-for="(item,index) in shopCartArr" class-name="shopCartInfo">
          <Col span="3" style="margin-top:16%;" class-name="labelSpan">
            <Checkbox
              class-name="checkboxShopCart"
              :label="item.price"
              @click.native="checkGroup(item)"
              size="large"
            ></Checkbox>
          </Col>
          <Col span="7">
            <img :src="item.image">
          </Col>
          <Col span="14">
            <ul class="shopCartInfoLeft">
              <li>{{item.name}}</li>
              <li>
                <span>已选择 :{{item.skuIdentificationDesc}}</span>
              </li>
              <li>
                <span style="color: #E15967;">积分:{{item.price}}</span>
                <div class="shopCartCountPlay">
                  <div>
                    <span @click="delCount(item)">-</span>
                    <input :value="item.quality">

                    <span @click="addCount(item)">+</span>
                  </div>
                </div>
              </li>
              <li @click="delProduct(item)">删除</li>
            </ul>
          </Col>
        </Row>
      </CheckboxGroup>
    </div>
    <div>
      <Row class-name="submitOrder">
        <!-- <Col span="5">
          <Checkbox :indeterminate="indeterminate" :value="checkAll"></Checkbox>
          <span>全选</span>
        </Col>-->
        <Col span="10">
          <span>需要积分 : {{total}}分</span>
        </Col>
        <Col span="14">
          <span class="submitOrderButton" @click="submitOrder">立即兑换</span>
        </Col>
      </Row>
    </div>
    <Modal v-model="modal1" title="提示" @on-ok="submitOk" @on-cancel="cancelOrder">
      <P>是否确定兌換?</P>
    </Modal>
  </div>
</template>



<script  src="../../static/js/shoppCart.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../static/css/shoppCart.css";
</style>