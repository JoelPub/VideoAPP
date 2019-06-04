import baseUrlChange from './environmentalSets'
import {apiAll} from '../request/api'
export const getLinkTokenCom=(name,token)=>{
  return `https://tdpfe.apps.pp01.cneast.cf.ford.com.cn/?token=${token}#/invitationRegister?from=${name}&tokenRouter=${token}`

}
export const _getProvince = async (code)=>{
  let params={
    parentcode:code?code:''
  }
  let url = api.address.addressMaster();
  let pd={};
  try{
    let res = await http({
      method: 'GET',
      url: url,
      params:params,
      headers: {
        "Content-Type": "application/json"
      }
    });
    if(res.status==200){
      console.log("地址get：",res);
      pd = res.data.data;
      return pd;
    }
  }catch(err){
    console.log(err);
  }
}
export const getTokenCom=()=>{

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
        this.token=ret.data.token
      }
    })
    .catch((error)=>{

    })
}
export const wxShareCom=()=>{
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
          desc: '邀请您加入福特领界积分平台',
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
          desc: '邀请您加入福特领界积分平台',
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
}
export const checkTokenCom=()=>{
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
}
