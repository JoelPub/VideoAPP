<template>
  <div>
    <prompt-modal :messsage="messsage" timeout="2500" @hideModal="messsage=''"></prompt-modal>
    <div class="centerTopBg">
      <div>
        <Row>
          <Col span="12">
            <img src="../../static/img/fordlogo.png">
          </Col>
          <Col span="12" style="text-align:right;">
            <img src="../../static/img/config.png" @click="goPage('/configInfo')">
          </Col>
        </Row>
      </div>
    </div>
    <div class="centerList">
      <div class="viewAll" @click="goPage('/logisticsStatus','5')">查看全部 >></div>
      <Row class-name="centerListRow">
        <Col span="6">
          <img src="../../static/img/daiduihuan.png" @click="goPage('/logisticsStatus','1')">
          <br>
          <span @click="goPage('/logisticsStatus','1')">待兑换</span>
        </Col>
        <Col span="6">
          <img src="../../static/img/fahuo.png" @click="goPage('/logisticsStatus','2')">
          <br>
          <span @click="goPage('/logisticsStatus','1')">待发货</span>
        </Col>
        <Col span="6">
          <img src="../../static/img/shouhuo.png" @click="goPage('/logisticsStatus','3')">
          <br>
          <span @click="goPage('/logisticsStatus','1')">待收货</span>
        </Col>
        <Col span="6">
          <img src="../../static/img/end.png" @click="goPage('/logisticsStatus','4')">
          <br>
          <span @click="goPage('/logisticsStatus','1')">已完成</span>
        </Col>
      </Row>
      <Row class-name="centerListRow">
        <Col span="6">
          <img src="../../static/img/shop.png" @click="goPage('/dealer')">
          <br>
          <span @click="goPage('/dealer')">附近门店</span>
        </Col>
        <Col span="6">
          <img src="../../static/img/cart.png" @click="goPage('/testDriveRecord')">
          <br>
          <span @click="goPage('/testDriveRecord')">试驾记录</span>
        </Col>
        <Col span="6">
          <img src="../../static/img/yaoqinghui3.svg">
          <br>
          <span>邀请记录</span>
        </Col>
        <Col span="6">
          <img src="../../static/img/vip.png">
          <br>
          <span>车主特权</span>
        </Col>
      </Row>
    </div>
    <div class="centerCard">
      <Row class-name="centerCardTop">
        <Col span="18">
          <ul>
            <li>
              <img :src="detailInfo.iconUrl" class="centerCardTopAvatar">
            </li>
            <li>
              <span>{{detailInfo.nickName}}</span>

              <img src="../../static/img/renzhen.png" class="CertificationTop" v-if="!owner">
              <img src="../../static/img/renzhentrue.png" class="CertificationTop" v-if="owner">
              <p>{{detailInfo.country}}</p>
            </li>
          </ul>
        </Col>

        <Col span="3">
          <button @click="checkIn" v-if="!checkInFlag">签到</button>
          <button class="alreadyCheck" v-if="checkInFlag" @click="goPage('/checkIn')">
            已签到
            <img src="../../static/img/checkInEnd.png">
          </button>
        </Col>
      </Row>
      <Row class-name="centerCardBottom">
        <Col span="6">
          <span @click="goPage('/taskList')">积分</span>
          <p @click="goPage('/taskList')">{{totalPoints}}</p>
        </Col>
        <Col span="6">
          <span @click="goPage('/vip')">等级</span>
          <p @click="goPage('/vip')">{{leave}}</p>
        </Col>
        <Col span="6">
          <span @click="goPage('/cardList')">卡券</span>
          <p @click="goPage('/cardList')">0</p>
        </Col>
        <Col span="6">
          <span @click="goPage('/collection')">收藏</span>
          <p @click="goPage('/collection')">{{favoriteLength}}</p>
        </Col>
      </Row>
    </div>

<!--    <div class="ownerCertification" v-if="owner">-->
<!--      <ul>-->
<!--        <li>-->
<!--          <img src="../../static/img/renzhen2.png">-->
<!--        </li>-->
<!--        <li>-->
<!--          <span style="background:#FAD273;">您是车主</span>-->
<!--          <p style="color:#FAD273">去体验更多车主特权吧~</p>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
    <div class="ownerCertification">
      <ul>
        <li>
          <img src="../../static/img/renzhen1.png">
        </li>
        <li>
<!--      <span class="Certified">车主认证</span>-->
          <span>车主认证</span>
          <p>即将推出，敬请期待！</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script  src="../../static/js/PersonalCenter.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../static/css/personalCenter.css";
</style>
