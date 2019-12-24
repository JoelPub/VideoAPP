<template>
  <div class="invitation">
    <div class="shareModal" v-if="shareModalFlag" @click="closeModal">
      <img src="../../static/img/sharetishi.png">
      <br>
      <span>{{shareMsg}}</span>
    </div>
    <div class="logo">
      <img src="../../static/img/fordlogo.png" alt="">
    </div>
    <div class="register">
      <div class="register-info">
        <div class="border-wrap">
          <div class="profile-wrap">
            <img :src="profileImg" alt="" class="user-pic">
          </div>
          <div class="welcome-tips">
            <p class="tips1">{{nickName}}</p>
            <p class="tips2">{{welcomeTip}}</p>
          </div>
        </div>
      </div>
      <div class="big-img">
        <img src="../../static/img/invitation-bg.png" alt="">
      </div>
      <div class="icons">
        <ul class="icons-ul">
          <li>
           <img src="../../static/img/integration.png" alt="">
            <div class="icon-text">赢积分</div>
          </li>
          <li>
            <img src="../../static/img/register-gift.png" alt="">
            <div class="icon-text">换礼品</div>
          </li>
          <li>
            <img src="../../static/img/privilege.png" alt="">
            <div class="icon-text">享特权</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="invitation-btn">
      <a href="javascript:" @click="goRegister">{{btnText}}</a>
    </div>
  </div>
</template>
<script>
  import baseUrlChange from '../assets/environmentalSets'
  import {apiAll} from '../request/api'
  export default {
    props:{},
    components:{
    },
    data(){
      return{
        nickName:"",
        profileImg:require("../../static/img/profile-pic.png"),
        welcomeTip:'邀请您加入XXJJ积分平台',
        btnText:'立即注册',
        shareMsg: '',
        shareModalFlag: true,
        messsage: '',
        token:'',
        shareTit:'',
        shareDesc:'',
        shareLink:"",
        shareLinkRaw:"",
        shareImgUrl:"",
        type:'',
        redirectUrl:null,
      }
    },
    computed:{},
    watch:{},
    methods: {
      getProfile(){
       let url=apiAll.profileUrl()
        console.log('进入了getProfile',url)
        this.$http(
          {
            method: 'get',
            url: url,
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            console.log('profile:',res)
            if(res.data||res.data.httpCode===200){
              let ret=res.data
              console.log('ret.iconUrl:',ret.data.iconUrl)
              console.log('ret.iconUrl:',ret.data.nickName)
              this.profileImg=ret.data.iconUrl
              this.nickName=ret.data.nickName
            }
            else{
              this.profileImg=require("../../static/img/profile-pic.png")
            }
          }).catch((error) =>{
            console.log(error)
        })
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
              this.token=ret.data.token
              let type=this.type
              this.initShareData(type)
            }
          })
          .catch((error)=>{

          })
      },
      async initShareData(type){
        let token=this.token
        switch(type)
        {
          case 'register':
            this.shareTit='立即注册'
            this.shareDesc='邀请您加入XXJJ积分平台'
            this.shareLink=this.getLinkToken('register',token)
            console.log('this.shareLink1:',this.shareLink)
            this.shareImgUrl=`https://territorydataimageplatform.apps.pp01.cnnorth.cf.ford.com.cn/share/share.jpg`
            break;
          case 'drive':
            this.shareTit='立即试驾'
            this.shareDesc='邀请您加入XXJJ积分平台'
            this.shareLink=this.getLinkToken('drive',token)
            console.log('this.shareLink2:',this.shareLink)
            this.shareImgUrl=`https://territorydataimageplatform.apps.pp01.cnnorth.cf.ford.com.cn/share/share.jpg`
            break;
          default:
        }
        console.log('initShareData完成')
        this.wxShare()
        // console.log('this.shareTit:',this.shareTit)
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
                desc: '邀请您加入XXJJ积分平台',
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
                desc: '邀请您加入XXJJ积分平台',
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
      closeModal: function () {
        this.shareModalFlag = false;
      },
      ifToken(){
        let url=window.location.href
       let post1= url.indexOf('#')
        console.log('post1:',post1)
        let url2=url.substring(post1)
        console.log('url2:',url2)
        if(url2.indexOf('?')!=-1){
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
            // alert('有tokenRouter')
            // alert(this.$route.query.tokenRouter)
            this.shareModalFlag=false
            // alert('被分享者')
            return true
          }
          else{
            this.shareModalFlag=true
            // alert('没有tokenRouter')
            // alert('分享者')
            return false
          }
        }
        return false
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
     async initData(){
       let name=this.$route.query.from
       this.type=name
       this.shareLinkRaw=window.location.href
       switch (name) {
         case 'register':
        this.welcomeTip='邀请您加入XXJJ积分平台'
           this.btnText='立即注册'
           this.shareMsg='点击右上角按钮, 邀请好友注册'
           break;
         case 'drive':
           this.welcomeTip='邀请您即刻预约试驾XXJJ'
           this.btnText='立即预约'
           this.shareMsg='点击右上角按钮, 邀请好友试驾'
           break;
         default:
       }
     },
      goRegister(){
        let name=this.$route.query.from
        if(name==='drive'){
          this.redirectUrl='/testDrive'
        }else{
          this.redirectUrl='null'
        }
        let urlData=this.redirectUrl
        this.$router.push({
          path:"/login",
          query:{
            'from':urlData
          }
        });
     }
    },
    async created(){
      console.log('BASE_URL:',BASE_URL)
      this.initShareData('register')
      this.getProfile()
      await this.initData()
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
<style scoped>
  @import "../../static/css/reset.css";
  @import "../../static/css/invitation.css";
</style>
