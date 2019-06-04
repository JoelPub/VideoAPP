import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
export default {
    name: "PersonalCenter",
    data() {
        return {
            shareMsg: '点击右上角按钮, 邀请好友注册。',
            shareModalFlag: false,
            messsage: '',
            token:''
        };
    },
    computed: {},
    methods: {
      getToken(){
        // let url=`${this.$http.defaults.baseURL}api/v1/activity/share/save`
        let url='https://territorydataplatformdev.apps.pp01.cnnorth.cf.ford.com.cn/api/v1/activity/share/save'
        let accountId=localStorage.accountId
        let jsonData = {
          "accountId": accountId,
          "activityId": "6",
          "activityName": "string",
          "link": "string"
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
            console.log("999:",res)
            // if(res.data.httpCode===200)
             // this.token=
          })
          .catch((error)=>{

          })
      },
      wxShare(){
        let url= 'https://wechat.apps.pp01.cnnorth.cf.ford.com.cn/dsl/wechat/v1/proxy/signature'
        // let url2=`${BASE_URL}/dsl/wechat/v1/proxy/signature`
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
            console.log('res:',res)
            this.$wechat.config({
              //debug: ture, //调试阶段建议开启
              appId: 'wxca895002b23a333f',
              timestamp: res.timestamp,
              nonceStr: res.noncestr,
              signature: res.signature,
              jsApiList: [ 'onMenuShareTimeline','onMenuShareAppMessage','onMenuShareWeibo','onMenuShareQQ','onMenuShareQZone']
            });

            this.$wechat.ready(function(){
              this.$wechat.onMenuShareTimeline({
                title: '分享标题',
                desc: '分享描述',
                link: window.location.href,
                imgUrl: imgUrl,//分享图标
                success: function () {

                }
              });
              this.$wechat.onMenuShareAppMessage({
                title: title,
                desc: descContent,
                link: window.location.href,
                imgUrl: imgUrl,
                success: function () {

                }
              });
              this.$wechat.onMenuShareQQ({
                title: title,
                desc: descContent,
                link: window.location.href,
                imgUrl: imgUrl,
                success: function () {

                },
                cancel: function () {

                }
              });
            });
          })
          .catch((error)=>{

          })
      },
      activeShare(){
        this.shareModalFlag=!this.shareModalFlag
      },
        share: function () {
            this.shareModalFlag = true;
        },
      invite(name){
        this.$router.push({
          path:"/invitationRegister",
          query:{
            'from':name
          }
        });
      },
        closeModal: function () {
            this.shareModalFlag = false;
        }
    },
    watch: {

    },
    mounted() {

    },
    created() {
      this.wxShare()
      this.getToken()
    }
};
