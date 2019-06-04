<template>
  <div class="pickCar">
    <h1 style="margin:10px 0;">【提车小记】 没想到这样就挑中了你</h1>
    <span>转载汽车之家</span>
    <br>9月份买的，订车的时候是年前，提车的时候是年后。
    原本想，订的时候直接提走，过年的时候就可以开新车走亲戚，出去玩儿了。无奈，挑到的车型没有现车，只能等到年后了。
    因为家里已经有两辆轿车了，就考虑SUV，但是，开始也没想过买福特车。毕竟，都说福特油老虎。逛福特SSSS店，也真的只是随便进去看看的。
    其实，买个新款车，是有些风险的。虽然我是车子小白，不过我老公很爱车，也对比了很好，又试驾过，感觉各方面都还不错。
    当然，作为汽车小白的我，最看中的还是它的外形内饰。确实觉很漂亮。
    车子已经开了个月了，作为“老司机”的我，也已经开的相当上手了。
    这不，春暖花开的季节，正好开去赏赏花。
    <img
      src="../../static/img/hua1 (1).jpg"
    >
    <img src="../../static/img/hua1 (2).jpg">
    <img src="../../static/img/hua1 (3).jpg">
    樱花漫天，难休息天，出来逛逛，放松了很。
    桃花也开的很好
    欣赏完漂亮的花，该欣赏我家的新成员了。
    <img
      src="../../static/img/hua1 (9).jpg"
    >
    <img src="../../static/img/hua1 (4).jpg">
    外形比较霸气，看车的时候眼就相中了。家里还是老公开的，又不喜欢满大街的白色，所以挑了个棕色的，还是挺耐看的。
    福特别的车不太一样的格栅，看起来还是不错的。
    <img
      src="../../static/img/hua1 (5).jpg"
    >
    后面排英文字母，看起来还是比较端的
    LED的前大灯，晚上开车，亮了很。
    18寸轮毂。轮胎的外形比较普通了。
    <img
      src="../../static/img/hua1 (6).jpg"
    >
    外后视镜
    LED的后尾灯
    后备箱也不小。平常用用足够了。
    哈哈，可能是新上市的车，还送了束花。脚垫也是送的。
    侧门。
    后排的出风口，还有个USB接口。
    <img
      src="../../static/img/hua1 (7).jpg"
    >
    <img src="../../static/img/hua1 (8).jpg">
    前排的内饰。木纹感觉也挺大上的。
    最喜欢的就是这个档位了。很科技，还有这些按钮，
    键启动的。因为家里也有辆键启动的轿车，所以这个按钮在这里，还是有些不太习惯。
    方向盘仪表盘，功能很齐全，配置也不错
    对了，这个大屏幕也是最爱之了。飞鱼系统，还是灵光的。
    车钥匙。麻烦忽略我沧桑的手。
    最后小结：我个人平常开的还是家里的两厢轿车，这个新车也开过几次。动力足，起步也很快，开起来比较容易上手。我们挑的配置还是挺的，基本上，用到的都有了，还有很不太会用的配置。哈哈。。。
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
        this.shareTit='福特临界积分平台会员！'
        this.shareDesc='没想到这样就挑中了你！'
        this.shareLink=this.getLinkToken('pickCar',token)
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
            method: 'post',
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
            method: 'post',
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
                desc:self.shareDesc,
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
.pickCar {
  line-height: 25px;
  background: #ffffff;
  padding: 10px 15px;
}
.pickCar img {
  width: 100%;
  height: 300px;
}
</style>

