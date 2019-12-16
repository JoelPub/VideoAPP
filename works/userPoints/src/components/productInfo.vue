<template>
  <div>
    <prompt-modal :messsage="messsage" timeout="2500" @hideModal="messsage=''"></prompt-modal>
    <div class="shareModal" v-if="shareModalFlag" @click="shareModalFlag=false">
      <img src="../../static/img/sharetishi.png">
      <br>
      <span>点击右上角就可以将喜欢的产品分享给好友啦~</span>
    </div>
    <Carousel
      v-if="productInfo.imageUrl.length==1"
      v-model="value2"
      loop
      class="CarouselBanner singleProduction"
    >
      <CarouselItem v-for="item  in  productInfo.imageUrl">
        <div class="demo-carousel">
          <img :src="item">
        </div>
      </CarouselItem>
    </Carousel>

    <Carousel
      v-if="productInfo.imageUrl.length>1"
      autoplay
      v-model="value2"
      loop
      class="CarouselBanner"
    >
      <CarouselItem v-for="item  in  productInfo.imageUrl">
        <div class="demo-carousel">
          <img :src="item">
        </div>
      </CarouselItem>
    </Carousel>
    <div class="productDetailsOne">
      <p>{{productInfo.name}}</p>
      <span>积分 : {{productInfo.price}}</span>
      <span>
        <img src="../../static/img/shouchang.png" @click="favorite(true)" v-if="!favoriteFlag">
        <img src="../../static/img/shouchang2.png" v-if="favoriteFlag" @click="favorite(false)">
        <img src="../../static/img/share.png" class="shareImg" @click="shareProduct">
      </span>
    </div>
    <div class="productDetailsTwo">
      <p>商品详情</p>
      <!-- <span>{{productInfo.detail}}</span> -->

      <table class="detaleTable" border="0.5" cellpadding="0" cellspacing="0">
        <tr v-for="item in detailObj">
          <td>{{item.name}}</td>
          <td>{{item.val}}</td>
        </tr>
      </table>
    </div>

    <Row class-name="tabBottom" type="flex" justify="end">
      <Col span="5">
        <img src="../../static/img/goIndex.png" @click="goPage('/indexPage')">
        <p @click="goPage('/indexPage')">首页</p>
      </Col>
      <Col span="5" class-name="shopCartImg">
        <img src="../../static/img/cartInfo.png" @click="goPage('/shoppCart')">
        <span>{{shopCartArrLength}}</span>
        <p @click="goPage('/shoppCart')">购物车</p>
      </Col>
      <Col span="7" class="addShopCart">
        <span @click="addShopCart(2)">加入购物车</span>
      </Col>
      <Col span="7" class="exchange">
        <span @click="exchange(1)">立即兑换</span>
      </Col>
    </Row>
    <Modal v-model="modal2" width="360" footer-hide class-name="shopCarModal">
      <div class="skusInfo">
        <ul>
          <li>
            <img :src="skusInfo.imageUrl">
          </li>
          <li>
            <span>积分:{{skusInfo.price}}</span>
            <br>
            <span>库存:{{skusInfo.inventory}}</span>
          </li>
        </ul>
      </div>

      <div style="padding:15px;">
        <div class="colorSelect" v-for="(format,index) in productInfo.attribute">
          <p>{{format.attrName}}</p>
          <ul>
            <li
              v-for="(child,ind) in  format.childAttr"
              :id="format.attrId+''+child.attrValueId"
              @click="spliceSkus(child.attrValueId,index,ind,format.attrId)"
              :class="{'activeLi':sel[index] == ind}"
            >
              <span>{{child.attrName}}</span>
              <span>{{child.attrValue}}</span>
            </li>
          </ul>
        </div>

        <div class="redeemCountPlay">
          <p>兑换数量</p>
          <div>
            <span @click="delCount">-</span>
            <input v-model="count">
            <span @click="addCount">+</span>
          </div>
        </div>
      </div>

      <button class="submitButton" @click="submitOrder">确定</button>
    </Modal>
  </div>
</template>

<script  src="../../static/js/productInfo.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import "../../static/css/productInfo.css";
</style>



