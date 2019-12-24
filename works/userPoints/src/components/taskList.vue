<template>
  <div>
    <div class="taskTop">
      <img :src="detailInfo.iconUrl">
      <ul>
        <li>总积分</li>
        <li>
          {{totalPoints}}
          <img src="../../static/img/jinbi.png">
        </li>
      </ul>
      <button @click="goPage('/integralList')">积分明细</button>
      <span class="rules" @click="openRules">积分规则</span>
    </div>
    <div>
      <ul class="integralList">
        <div class="integralTitle">
          <span>单次任务</span>
        </div>

        <li v-for="item in  singleTask" v-if="item.activityName!='手机注册'">
          <img src="../../static/img/phone.png">
          <span>{{item.activityName}}</span>

          <button @click="goPage(item.activityPath)" v-if="item.numOfCompleted==0">去完成</button>
          <button v-else class="alreadyCheck">
            <img src="../../static/img/checkInEnd.png" @click="goPage(item.activityPath)">已完成
          </button>
        </li>
      </ul>
    </div>
    <div>
      <ul class="integralList">
        <div class="taskProgress">
          <span>日常任务</span>
        </div>

        <li v-for="item in usuallyTask">
          <img src="../../static/img/phone.png">
          <span>{{item.activityName}}</span>
          <button @click="goPage(item.activityPath)" v-if="item.numOfCompleted==0">去完成</button>
          <button v-else class="alreadyCheck" @click="goPage(item.activityPath)">
            <img src="../../static/img/checkInEnd.png">已完成
          </button>
        </li>
        <!-- <li>
          <img src="../../static/img/phone.png">
          <span>幸运大转盘</span>

          <button @click="goPage('/turntableDraw')">去体验</button>
        </li>-->
      </ul>
    </div>
    <Modal
      v-model="modal1"
      footer-hide
      title="XXJJ平台积分规则"
      class-name="vinModal  taskListModal"
      style="height:300px;"
    >
      <!-- <div>
        <h3>积分获取</h3>
        <br>首次手机注册 50分（一次性赠送）
        <ul>
          <li>完善资料 50分（一次性赠送）</li>
          <li>认证成为车主 1000分（一次性赠送）</li>
          <li>会员生日 50分（一年一次）</li>
          <li>分享内容 好友点击分享链接后分享人可获得2分，相同分享内容每日最多获得一次2分</li>
          <li>在线预约试驾 10分（每月上限20分）</li>
          <li>邀请好友注册 好友点击分享链接并提交注册后邀请人可获得10分（同一个好友受邀注册仅可触发一次积分获取，每月上限50分）</li>
          <li>邀请好友试驾 好友点击分享链接并提交预约试驾表单后邀请人可获得10分（同一个好友受邀预约试驾仅可触发一次积分获取，每月上限50分）</li>
          <li>每日签到 第1天签到可获得1分，第2天签到可获得2分，第3天签到可获得3分，以此类推，逐日递增，直至第7天，第8天起重新计算，一旦漏签，也重新计算（第1天1分，第2天2分…）。当月签到未有漏签，可额外获得50个积分的全勤奖励</li>
        </ul>
      </div>

      <div style="border-top:1px dashed   #e6e6e6;margin-top:30px;padding-top:20px;">
        <h3>积分使用</h3>
        <br>
        <ul>
          <li>不同等级会员均可使用积分兑换礼品。兑换规则以礼品详情为准。</li>
          <li>兑换礼品所需积分将在兑换成功后实时扣除，并以到期日在前者优先扣除。</li>
          <li>所有礼品兑换一经申请，则不可取消或更改。礼品若无质量问题则不可退还或更换。</li>
          <li>如所兑换的积分礼品在运送过程中毁损或积分礼品本身有质量问题时，会员须在签收日起的 7天内致电客服热线提出换货申请，超过7天将不予受理。退回时，请务必保留原包装、内附说明书、附件及相关凭证。</li>
          <li>发生兑换礼品退货、取消礼品兑换或其他原因而须返还积分之情形时，恢复之积分其有效期限与兑换前相同，不因此重新计算。</li>
          <li>会员所兑换礼品由各供应商提供，其质量、数量、款式、颜色、售后服务等问题均由供应商负责。会员对礼品供应商提供的礼品及售后服务有争议时，积分平台将负责协助会员与礼品供应商取得联系，但不承担任何责任。</li>
          <li>所有积分的有效期为自获取之月起12个月，逾期未使用积分自动清零，会员等级的升、保、降级不影响积分的有效期。</li>
          <li>所有积分仅限会员本人使用，不得转让、租借、变现或在平台上交易。任何非会员本人使用积分的行为对积分平台不产生效力。积分在兑换礼品前不构成会员个人资产。</li>
          <li>会员兑换积分礼品发生的税款由会员自行申报和缴纳。</li>
        </ul>
      </div>-->

      <h2>一、 会员卡介绍</h2>
      <ul>
        <li>注册会员后，会员将获得象征会员资格的虚拟会员卡。自注册日起，在任意连续的12个自然月之内，通过累积积分，便可晋升至相应级别：</li>
        <li>• 倔强青铜：注册入会即可</li>
        <li>• 荣耀黄金：任意连续12个月内累计积分达到5001分，自晋级日起12个月内累计新获得积分达5001分及以上，则保级成功，如未达到此标准，则自动降级为倔强青铜。</li>
        <li>• 至尊星耀：任意连续12个月内累计积分达到10001分，自晋级日起12个月内累计新获得积分达10001分，则保级成功，如未达到此标准，则顺次自动相应降级为荣耀黄金或倔强青铜。</li>
      </ul>

      <h2>二、 积分规则</h2>
      <ul>
        <h3>2.1 积分获得</h3>
        <li>微信授权 50分（一次性赠送）</li>
        <li>手机号绑定 50分（一次性赠送）</li>
        <li>分享内容 好友点击分享链接后分享人可获得10分，相同分享内容同一个好友点击仅可获得一次10分</li>
        <li>在线预约试驾 10分（每月上限20分）</li>
        <li>邀请好友微信授权 好友点击分享链接并同意微信授权后邀请人可获得10分（同一个好友受邀授权仅可触发一次积分获取，每月上限50分）</li>
        <li>邀请好友试驾 好友点击分享链接并提交预约试驾表单后邀请人可获得10分（同一个好友受邀预约试驾仅可触发一次积分获取，每月上限50分）</li>
        <li>每日签到 第1天签到可获得1分，第2天签到可获得2分，第3天签到可获得3分，以此类推，逐日递增，直至第7天，第8天起重新计算，一旦漏签，也重新计算（第1天1分，第2天2分…）。当月签到未有漏签，可额外获得50个积分的全勤奖励</li>2.2 积分使用
        <li>不同等级会员均可使用积分兑换礼品。兑换规则以礼品详情为准。兑换礼品所需积分将在兑换成功后实时扣除，并以到期日在前者优先扣除。所有礼品兑换一经申请，则不可取消或更改。礼品若无质量问题则不可退还或更换。如所兑换的积分礼品在运送过程中毁损或积分礼品本身有质量问题时，会员须在签收日起的 7天内致电客服热线提出换货申请，超过7天将不予受理。退回时，请务必保留原包装、内附说明书、附件及相关凭证。</li>
        <li>发生兑换礼品退货、取消礼品兑换或其他原因而须返还积分之情形时，恢复之积分其有效期限与兑换前相同，不因此重新计算。</li>
        <li>会员所兑换礼品由各供应商提供，其质量、数量、款式、颜色、售后服务等问题均由供应商负责。会员对礼品供应商提供的礼品及售后服务有争议时，积分平台将负责协助会员与礼品供应商取得联系，但不承担任何责任。</li>
        <li>所有积分的有效期为自获取之月起12个月，逾期未使用积分自动清零，会员等级的升、保、降级不影响积分的有效期。</li>
        <li>所有积分仅限会员本人使用，不得转让、租借、变现或在平台上交易。任何非会员本人使用积分的行为对积分平台不产生效力。积分在兑换礼品前不构成会员个人资产。</li>
        <li>会员兑换积分礼品发生的税款由会员自行申报和缴纳。</li>
      </ul>
    </Modal>
  </div>
</template>


<script  src="../../static/js/taskList.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../static/css/taskList.css";
</style>
