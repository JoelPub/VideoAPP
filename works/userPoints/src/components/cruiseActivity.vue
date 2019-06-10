<template>
  <div class="top">
    <ul class="ulBottom" style="text-align:center;">
      <li>“如果我有多一张船票，你会不会跟我走”</li>
      <li>这是王家卫电影《花样年华》里的经典台词</li>
      <li>也是夏天里，很多人的别样期盼</li>
      <li>“好想出海玩，来个游轮度假就最好了”</li>
      <li>如果有免费豪华游轮船票，</li>
      <li>你会不会说走就走？</li>
      <li>满足你！</li>
      <li>2019年福特领界酷蓝嘉年华,正式开启！</li>
      <li>一句话：</li>
      <li>福特领界车主福利！豪华游轮船票！送！</li>
      <li>重磅预告</li>
      <li>蔚蓝的海洋之旅，5天4夜精彩不断</li>
      <li>你, 是不是心动了？</li>
      <li>船票怎么拿？</li>
    </ul>
    <div class="top_p">
      <p>活动主题</p>
      <br>福特领界酷蓝嘉年华
      <p>活动时间</p>
      <br>即日起至2019年6月30日
      <p>活动适用于</p>
      <br>活动期间福特领界新车主
      <p>权益内容</p>
    </div>

    <ul>
      <li>1. 活动期间成为福特领界新车主，并完成神秘挑战任务，有机会免费获得8月底船期5天4晚豪华游轮日本游船票一张；</li>
      <li>2. 五月福特领界车主参与活动更可享受船上额外VIP待遇：参与游轮明星盛典活动等。</li>特别说明
      <li>1. 本次活动针对即日起至6月30日福特领界新车主有效（以开票时间为准）。</li>
      <li>2. 参与活动的福特领界新车主需要通过福特天猫旗舰店支付199元报名获取活动参与资格（后期可退），报名需备注车主姓名、手机号、车架号信息用于资格审核。</li>
      <li>3. 神秘挑战任务将于5月25日通过“福特领界”官方微信、福特官网、福特商城及福特汽车天猫旗舰店相关活动页面公布。</li>
      <li>4. 挑战任务需通过“福特领界”官方微信平台上传任务完成截屏，优先完成挑战任务者可获高级舱位的资格（房型从高到低有露台房、海景房、内舱房），舱位有限，先到先得。</li>
      <li>5. 若车主报名携带家属同往（最多2位同行家属），可以优惠价格购买舱位/房间，下单费用详见游轮订票系统，详情关注“福特领界”官方微信平台。</li>
      <li>6. 车主船票不可转赠，天猫平台报名车主信息与游轮订票系统车主信息需保持一致，如信息提供不一致或错误，将会导致游轮订票不成功。</li>
      <li>7. 该价格包含4晚游轮住宿、指定餐厅免费膳食、指定的船上设施、指定娱乐节目及活动；价格不含（客人自理）：游轮小费、保险费CNY50人、日本离境税1000日币/人；航线无签证费用。此航线从上海港出发，外地客人需自理到上海港口的费用。</li>
      <li>8. 具体购票协议将由客人和游轮代理订票公司签定。</li>
      <li>9. 订票操作及退改规则详情参见订票系统预订须知，游轮公司出行须知及船书。</li>
      <li>*在法律允许的范围内，最终活动解释权归福特公司所有</li>
    </ul>
  </div>
</template>
<script>
  import baseUrlChange from '../assets/environmentalSets'
  import {apiAll} from '../request/api'
  import {getLinkTokenCom ,getTokenCom, wxShareCom, checkTokenCom}from '../assets/common'
  export default {
    props:{},
    components:{
    },
    data(){
      return{
        shareTit:'',
        shareDesc:'',
        shareLink:"",
        shareLinkRaw:"",
        shareImgUrl:"",
      }
    },
    computed:{},
    watch:{},
    methods: {
      async initData(token){
        this.shareLinkRaw=window.location.href
        this.shareTit='领界|酷蓝嘉年华'
        this.shareDesc='豪华游轮之旅'
        this.shareLink=this.getLinkToken('cruiseActivity',token)
        console.log('this.shareLink1:',this.shareLink)
        this.shareImgUrl=`https://territorydataimageplatform.apps.pp01.cnnorth.cf.ford.com.cn/share/share.jpg`
        this.wxShare()
      },
      getLinkToken(name,token){
        return `https://tdpfe.apps.pp01.cneast.cf.ford.com.cn/?token=${token}#/invitationRegister?from=${name}&tokenRouter=${token}`
      },
      getToken(){
        // 拿到token拼接到分享的url中
        console.log('获取getToken')
        console.log('baseUrlChange:',baseUrlChange)
        let url=apiAll.getTokenULR()
        let accountId0=localStorage.accountId
        let link= this.shareLinkRaw
        let jsonData = {
          "accountId": accountId0,
          "activityId": "6",
          "activityName": "string",
          "link": link?link:'https://TDpfe.apps.pp01.cneast.cf.ford.com.cn/#/login'
        };
        this.$http(
          {
            method: 'get',
            url: url,
            data: JSON.stringify(jsonData),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            if(res.status===200){
              let ret=res.data;
              console.log('拿token:',ret)
              let token=ret.data.token
              this.initData(token)
            }
          })
          .catch((error)=>{

          })
      },
      wxShare(){
        let url= apiAll.getSignature()
        let jsonData = {
          url:window.location.href.split("#")[0],
          appid:"wxca895002b23a333f",
          secret:"2c48b08cac31ead5b6c6bcc8cdc829da"
        };
        this.$http(
          {
            method: 'get',
            url: url,
            data: JSON.stringify(jsonData),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            console.log('wxShare-success')
            let self=this
            console.log('getSignature:',res.data.signature)
            let ret=res.data
            wx.config({
              debug: false,
              appId: 'wxca895002b23a333f',
              timestamp: ret.timestamp,
              nonceStr: ret.noncestr,
              signature: ret.signature,
              jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
            });
            wx.ready(function(){
              // 分享到朋友圈
              wx.onMenuShareTimeline({
                title: self.shareTit,
                desc: self.shareDesc,
                link:self.shareLink,
                imgUrl: self.shareImgUrl,//分享图标
                success:function(){
                  console.log('onMenuShareTimeline-success')
                },
                cancel:function(){
                }

              });
              wx.onMenuShareAppMessage({
                title: self.shareTit,
                desc: self.shareDesc,
                link:self.shareLink,
                imgUrl: self.shareImgUrl,
                success: function () {
                  console.log('onMenuShareAppMessage-success')
                }
              });
              wx.error(function(res){
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                console.log('res:',res)
              });
            });
          })
          .catch((error)=>{

          })
      },
      ifToken(){
        let url=window.location.href
        let post1= url.indexOf('#')
        console.log('post1:',post1)
        let url2=url.substring(post1)
        console.log('url2:',url2)
        if(url2.indexOf('?')!=-1){
          let post2=url2.indexOf('?')
            console.log('post2:',post2)
          let url3= url2.substring(Number(post2)+1)
          console.log('url3:',url3)
          let dataArray=url3.split("&")
          console.log('dataArray:',dataArray)
          let dataArray2=dataArray[1].split('=')
          console.log('dataArray2:',dataArray2)
          let checkToken=dataArray2[1]
          console.log('checkToken:',checkToken)
          if(checkToken) {
            console.log('checkToken:', checkToken)
            return true
          }else{
            return false
          }
        }else{
            return false
        }

      },
      async checkToken(){
        let url=apiAll.statusUpdate()
        // alert('tokenRouter:'+tokenRouter)
        let accountId=localStorage.accountId
        console.log('accountId:',accountId)
        console.log('传给后台的tokenRouter'+tokenRouter)
        let tokenRouter=this.$route.query.tokenRouter
        let jsonData = {
          "token": tokenRouter,
          "accountId":accountId
        }
        this.$http(
          {
            method: 'post',
            url: url,
            data: JSON.stringify(jsonData),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            if(res.status===200){
            }
          })
          .catch((error)=>{

          })
      },
    },
    async created(){
      if(this.ifToken()){
        this.checkToken()
      }else{
        this.getToken()
      }
    },
    async mounted(){
      console.log('BASE_URL:',BASE_URL)
    }
  }
</script>
<style>
.top p {
  margin-left: 35%;
  width: 30%;

  line-height: 35px;
  height: 35px;
  position: relative;
  margin-top: 10px;
  color: #fff;
  background: #2ca3e1;
}

.top p::before {
  content: "";
  display: inline-block;
  width: 175%;
  height: 1px;
  background: #2ca3e1;
  bottom: 0px;
  left: -41px;
  position: absolute;
}
.top li {
  line-height: 30px;
  list-style: none;
}

.top {
  padding: 0px 15px;
  background: #fff;
}
.top_p {
  text-align: center;
}
</style>

