<template>
  <div>
    <prompt-modal :messsage="messsage" timeout="2500" @hideModal="messsage=''"></prompt-modal>
    <div class="activityCenterTop">
      <ul>
        <li @click="goPage('/checkIn')">
          <img src="../../static/img/rili.png">
          <br>
          <span>签到日历</span>
        </li>
        <li @click="goPage('/taskList')">
          <img src="../../static/img/baoxiang.png">
          <br>
          <span>积分福利</span>
        </li>
        <li @click="goPage('/testDrive')">
          <img src="../../static/img/shijia.png">
          <br>
          <span>试乘试驾</span>
        </li>
        <li @click="goPage('/invitedGift')">
          <img src="../../static/img/jifen.png">
          <br>
          <span>邀请有礼</span>
        </li>
      </ul>
    </div>
    <Row class-name="tabSelect">
      <Col span="12" :class="{active:activeFlag==1}">
        <span @click="changeActive(1)">
          精彩活动
          <img
            src="../../static/img/shaixuan.png"
            @click="openModal"
            style="vertical-align: middle;margin-left: 20px;width: 18px;height: 18px;"
          >
        </span>
      </Col>
      <Col span="12" :class="{active:activeFlag==2}">
        <span @click="changeActive(2)">口碑资讯</span>
      </Col>
    </Row>
    <div class="activityCenterMain" style="padding: 10px;">
      <p class="Topping" @click="goPage('/IntegralRules')">[置顶] 福特领界积分平台会员手册</p>
      <div v-if="activeFlag==1 && activityTarget=='all'">
        <div v-for="item in  AexcitingActivities">
          <img :src="item.imageUrl" @click="goPage(item.contentUrl)">
          <p style="font-size:14px;font-weight: bold;">
            {{item.title}}
            <!-- <img
              src="../../static/img/shouchang.png"
              @click="favorite(true)"
              class="favoIcon"
              v-if="!favoriteFlag"
            >
            <img
              src="../../static/img/shouchang2.png"
              v-if="favoriteFlag"
              @click="favorite(true)"
              class="favoIcon"
              @click.stop="favorite(false)"
            >-->
          </p>
        </div>
      </div>

      <div v-if="activeFlag==1">
        <div v-for="item in  AexcitingActivities" v-if="item.type==activityTarget">
          <img :src="item.imageUrl" @click="goPage(item.contentUrl)">
          <p style="font-size:14px;font-weight: bold;">{{item.title}}</p>
        </div>
      </div>
      <div v-if="activeFlag==2">
        <div>
          <img src="../../static/img/tiche6.png" @click="goPage('pickCar')">
          <p style="font-size:14px;font-weight: bold;">【提车小记】没想到就这样挑中了你</p>
        </div>
        <div>
          <img
            src="https://www.lincoln.com.cn/content/dam/lincoln/TerritoryActivity/WordOfMouthInformation/activity1.png"
            @click="goPage('wordOfMouthInformation')"
          >
          <p style="font-size:14px;font-weight: bold;">开着领界带你领略马峦山 探险吃鸡观瀑自驾之旅</p>
        </div>
      </div>
    </div>
    <Drawer :closable="false" v-model="showDrawer" class-name="drawerClass">
      <ul class="drawerLi">
        <!-- <li>全部兑换</li> -->
        <li @click="changeActiveTarget(1)">
          车 主
          <img src="../../static/img/jiantou.png">
        </li>
        <li @click="changeActiveTarget(2)">
          潜 客
          <img src="../../static/img/jiantou.png">
        </li>
      </ul>
    </Drawer>
  </div>
</template>

<script  src="../../static/js/activityCenter.js">
</script>
<style  >
@import "../../static/css/activityCenter.css";
</style>

