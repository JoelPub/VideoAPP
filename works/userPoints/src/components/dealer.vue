<template>
  <div class="dealer">
    <div class="dealerTop">
      <img src="../../upresource/img/dingwei.png">
      <span>{{currentCity}}</span>
      <span @click="getCurrentPosition()">使用我的确切位置</span>
      <span></span>
    </div>
    <div class="dealerSearch">
      <input readonly="readonly" placeholder="请输入经销商名称" @click="select" >
      <img src="../../upresource/img/chaxun.png">
    </div>
    <yz-select @cancel='cancel' @getCityLocation='getCityLocation(arguments)' v-if="show" :ref="show" @changeValue='isShow' :province='province' :city='city' :dealer='dealer' :selectedData='selectedData'></yz-select>
   <div class="totalDealer">为您找到{{totalDealer}}个经销商</div>
   <div id="container" style="width:100%; height:50%"></div>
            <ul @click="jumpPage(selectedDealer)" class="markerList" v-if="selectedDealer">
                <li>
                  <Row style="line-height: 20px;">
                      <Col span="2">
                                <span class="markerSort">{{selectedDealer.index}}</span>
                              </Col>
                      <Col span="18">
                      <p class="dealerName">{{selectedDealer._name}}</p>
                      <span class="dealerAdress">{{selectedDealer._address}}</span>
                      <br>
                      <p class="phone" v-if="selectedDealer.SalesPhoneNumber">
                      <img src="/upresource/img/icon-phone.jpg" >
                        <a :href="'tel:销售:' + selectedDealer.SalesPhoneNumber" class="ng-binding">
                        <span class="icon-phone"></span>销售:{{selectedDealer.SalesPhoneNumber}}
                        </a>
                      </p>
                      <p class="phone" v-if="selectedDealer.ServicePhoneNumber">
                      <img src="/upresource/img/icon-phone.jpg" >
                        <a :href= "'tel:服务:' + selectedDealer.ServicePhoneNumber" class="ng-binding">
                        <span class="icon-phone"></span>服务:{{selectedDealer.ServicePhoneNumber}}
                        </a>
                      </p>
                      <br>
                      <span></span>
                    </Col>
                  </Row>
                </li>

            </ul>
               <div id="panel" class="scrollbar1">
                        <ul id="myList" class="myList">
                        </ul>
               </div>
        </div>
  </div>
</template>


<script  src="../../upresource/js/dealer.js">
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../upresource/css/dealer.css";
</style>
