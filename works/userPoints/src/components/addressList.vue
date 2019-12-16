<template>
  <div class="address">
    <prompt-modal :messsage="messsage" timeout="2500" @hideModal="messsage=''"></prompt-modal>
    <div class="addressTop">
      <span @click="addAddress">添加新地址</span>
    </div>
    <div class="addressMain">
      <div class="addressList">
        <Row v-for="(item,index) in addressList" class-name="addressInfo">
          <Col span="19">
            <ul class="shopCartInfoLeft" @click="goPage('/shoppCart',item.addressId)">
              <li>
                <span>{{item.contactPerson}}</span>
                <span>{{item.contactNumber}}</span>
              </li>
              <li>{{item.fullInfo}}</li>
            </ul>
          </Col>
          <Col span="5" style="text-align:right;">
            <img src="../../upresource/img/bianji.png" @click="editAddres(item)">
            <img src="../../upresource/img/del.png" @click="delAddres(item.addressId)">
          </Col>
        </Row>
      </div>
    </div>
    <Modal
      v-model="addressFlag"
      title="添加收货地址"
      class-name="addressModal"
      style="height:540px;"
    >
      <ul>
        <li>
          <span>收货人 :</span>
          <input placeholder="请输入收货人" v-model="formData.contactPerson">
        </li>
        <li>
          <span>收货地址 :</span>
          <input id="address" placeholder="选择收货地址" v-model="formData.city" readonly="readonly">
        </li>
        <li>
          <span>详细地址 :</span>
          <textarea placeholder="请输入详细街道地址" v-model="formData.deailInfo"></textarea>
        </li>
        <li>
          <span>电话号码 :</span>
          <input placeholder="请输入收货人电话号码" v-model="formData.contactNumber" >
        </li>
        <li>
          <span>设为默认地址 :</span>

          <i-switch
            v-model="formData.isDefault"
            @on-change="change"
            class-name="switchFlag"
            style="width:12%;"
          ></i-switch>
        </li>
      </ul>
      <div slot="footer">
          <Button @click="ok" type="info">ok</Button>
        </div>
    </Modal>
    <Modal v-model="modal2" title="删除" @on-ok="delOk" @on-cancel="delCancel">
      <p>是否删除该地址?</p>
    </Modal>
  </div>
</template>

<script  src="../../upresource/js/addressList.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../upresource/css/addressList.css";
</style>

