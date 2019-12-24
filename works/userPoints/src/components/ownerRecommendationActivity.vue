<template>
  <div class="top">
        <br>
        <br>
    <ul class="ulBottom" style="text-align:center;">
      <li>推荐，是个艺术活，推荐得好，双方皆大欢喜</li>
      <li>常有车主留言：</li>
      <li>我推荐朋友来购车，有福利优惠吗？</li>
      <li>当然有！而且双方都有！</li>
      <li><span style="font-size: 14px;">这不，<strong>2019年车主推荐活动来啦</strong>！</span> </li>
      <br>
      <br>
      <br>
       <img style="width: 100%;"
            src="https://www.lincoln.com.cn/content/dam/lincoln/TerritoryActivity/ownerRecommendationActivity/activityImage.jpg"
          >
    </ul>

    <div class="top_p">
      <p>什么时候开始？</p>
      <br>即日起——2019年6月30日
      <p>谁可以参与？</p>
      <br>通过长安XX微客服、或江铃汽车微客服相关活动页面参与并认证的长安XX或江铃汽车任意车型车主
      <p>怎么参与？</p>
      <br>通过长安XX微客服或江铃汽车微客服相关活动页面进行报名即可！

          若在报名后次月底之前成功推荐亲友购买XXJJ，双方均可获得相应推荐好礼！

          （打个比方：若5月份报名，需要在6月底推荐好友成功购车，以开票时间为准）
      <p>有哪些福利礼遇？</p>

      <br>
          <strong><span style="font-size: 14px;">推荐人礼遇</span></strong><br>

          被推荐人购买XXJJ，推荐人均可100%获得3次免费基础保养

          <strong><span style="font-size: 14px;">被推荐人礼遇</span></strong><br>

          被推荐人购买XXJJ，被推荐人均可100%获得2年/4万公里延长质保。
    </div>
    <br><br>
    <ul style="text-align: center;background-image: -webkit-linear-gradient(top, rgb(244, 247, 255), rgb(255, 255, 255));">
      <li>如此周到礼遇，你是否已经心动？</li>
      <li>好事当然要传千里，快来推荐亲友购车吧！</li>
      <br>
      <li>悠悠说一句….</li>
      <li>如果多人推荐同一个人购车</li>
      <li>福利礼遇只能送给——第一个推荐人哦！</li>
      <li>所以，还不赶快行动！抢先推荐？！</li>
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
        this.shareTit='车主推荐购'
        this.shareDesc='车主推荐共享豪礼'
        this.shareLink=this.getLinkToken('ownerRecommendationActivity',token)
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
        let post2= url2.indexOf('?')
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
          console.log('checkToken:',checkToken)
          return true
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

