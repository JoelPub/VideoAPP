<template>
  <div class="configInfo">
    <prompt-modal :messsage="messsage" timeout="2500" @hideModal="messsage=''"></prompt-modal>
    <ul>
      <li>
        <span>头像:</span>
        <div style="display:inline-block">
           <img style="display:inline-block;float:left" :src="logoPicture" alt>
        </div>
        <!--<img src="../../upresource/img/jiantou.png">-->
      </li>
      <li>
        昵称:
        <span>{{nickName}}</span>
         <!--<img src="../../upresource/img/jiantou.png">-->
      </li>
      <!--<li>
        密码:
        <img src="../../upresource/img/jiantou.png">
      </li>
      <li>
        <span>生日:</span>
        <span>{{brithday}}</span>
        <img src="../../upresource/img/jiantou.png">
      </li>-->
      <li @click="goAddress">
        收货地址
        <img src="../../upresource/img/jiantou.png">
      </li>
      <li @click="showbindModel">
        <span v-show="apiPhoneNumber!=null && apiPhoneNumber!==''&& apiPhoneNumber!==undefined">绑定手机：{{apiPhoneNumber}}</span>
        <div v-show="apiPhoneNumber==null||''||undefined">
          <span >绑定手机号</span>
          <img src="../../upresource/img/jiantou.png">
        </div>
      </li>
    </ul>
    <button class="loginOut" @click="loginOut">退出登录</button>
    <Modal v-model="answerFlag" title=" 问题">
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
    <Modal title="绑定手机号" v-model="modalPhone" class-name="vertical-center-modal">
      <div class="loginBox">
        <ul class="loginBoxUl">
          <li>
            +86>
            <input placeholder="请输入手机号" v-model="mobile">
          </li>
          <li>未注册的手机号验证后自动创建积分账户</li>
          <li>
            <input placeholder="请输入验证码" v-model="smsCode">
            <button @click="getVerification" :disabled="disButton">
              <span v-show="countShow">{{count}}</span>
              {{Verification}}
            </button>
          </li>
        </ul>
        <button class="submitButton" @click="bindHandle">绑定</button>
      </div>
    </Modal>
  </div>
</template>

<script>
let timer = null;
import baseUrlChange from "../assets/environmentalSets";
import { apiAll } from "../request/api";
export default {
  props: {},
  components: {},
  data() {
    return {
      mobile: "",
      smsCode: null,
      countShow: false,
      modalPhone: false,
      answerFlag: false,
      Verification: "获取验证码",
      count: 60,
      postData: {},
      messsage: "",
      single: "",
      href: "",
      redirect: "",
      disButton: false,
      gender: "",
      brithday: "",
      nickName: "",
      logoPicture: "",
      apiPhoneNumber:''
    };
  },
  computed: {},
  watch: {},
  methods: {
    answerQuestion: function() {
      this.answerFlag = true;
    },
    loginOut: function() {
      localStorage.clear();
      this.messsage = "退出登录成功";
      this.$router.push({
        path: "/login"
      });
    },
    goAddress: function() {
      this.$router.push({
        path: "/addressList"
      });
    },
    getUserful(num) {
      let start = num.substring(0, 4);
      let end = num.substring(7);
      return `${start}****${end}`;
    },
    checkPhone() {
      if (!this.mobile) {
        this.messsage = "手机号不能为空";
        return false;
      }
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(this.mobile)) {
        this.messsage = "手机号格式不正确";
        return false;
      }
      return true;
    },
    // 获取短信验证码
    getVerification(){
      if(this.checkPhone()){
        this.displyCount()
        let newphoneNumber=this.mobile;
        let newuseful='5'
        let url1=apiAll.sendSMSCode2()
        let url= `${url1}?phoneNumber=${newphoneNumber}&useful=${newuseful}`
        this.$http(
          {
            method: 'get',
            url: url,
            // data: JSON.stringify(Data),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            let ret=res.data
            switch(ret.errorCode) {
              case '01000103':
                // 手机号已经注册
                this.messsage = '手机号已经注册';
                clearTimeout(timer)
                this.disButton=false;
                this.countShow=false;
                this.count=60;
                this.Verification='获取验证码'
                break;
              case '01000104':
                //帐号已绑定手机号
                this.messsage = '帐号已绑定手机号';
                clearTimeout(timer)
                this.disButton=false;
                this.countShow=false;
                this.count=60;
                this.Verification='获取验证码'
                break;
              default:
            }
          })
          .catch(error=>{

          })
      }
    },
    // 获取短信验证码倒计时
    displyCount() {
      if (this.count > 0) {
        this.countShow = true;
        this.Verification = "";
        this.disButton = "";
        this.count--;
        timer = setTimeout(() => {
          this.displyCount();
        }, 1000);
      } else if (this.count == 0) {
        this.Verification = "获取验证码";
        this.disButton = false;
        this.countShow = false;
        this.count = 60;
        clearTimeout(timer);
      }
    },
    showbindModel() {
      if(!this.apiPhoneNumber){
        this.modalPhone = true;
      }
    },
    // 绑定手机号
    bindHandle(){
      if(this.checkPhone()){
        if(!this.smsCode){
          this.messsage = '验证码不能为空';
          return false;
        }
        let url= apiAll.bindPhoneNumber()
        let number=this.mobile,
          partNumber=this.getUserful(number),
          smsCode=this.smsCode
        this.$http(
          {
            method: 'get',
            url: url,
            params:{
              phoneNumber:number,
              partPhoneNumber:partNumber,
              smsCode:smsCode
            },
            // data: JSON.stringify(Data),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            let ret=res.data
            console.log("susie:99",ret)
            if(""+ret.httpCode==='200'){
              this.messsage = '您已绑定成功！';
              this.modalPhone=false
              this.$router.push({
                path:"/configInfo",
              });
            }
          })
          .catch(error=>{
            this.messsage = '系统繁忙，请稍后再试！';
            this.modalPhone=false
          })

      }
    },
    getInfo: function() {
      var _this = this;
      var token = localStorage.getItem("token");
      console.log(999);
      localStorage.setItem("token", token);
      if (token != "" && token != undefined) {
        console.log(token);
        apiAll.getInfoDetail().then(function(res) {
          console.log(res);
          console.log(res.data);
          console.log("33");
          if (res.httpCode == 200) {
            _this.nickName = res.data.nickName;
            _this.apiPhoneNumber = res.data.phoneNumber
            console.log(' _this.apiPhoneNumber666 :', _this.apiPhoneNumber )
            _this.logoPicture = res.data.iconUrl;
            if (res.data.gender === "1") {
              _this.gender = "男";
            } else {
              _this.gender = "女";
            }
            _this.brithday = res.data.birthday;
          }
          console.log(res);
        });
      }
      console.log("dddd");
    }
  },
  async created() {
    console.log('TESTURL:',`${TESTURL}`)
  },
  async mounted() {
    this.getInfo();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style   scoped>
@import "../../upresource/css/reset.css";
@import "../../static/css/login.css";
@import "../../static/css/configInfo.css";
.bind-tit {
  font-size: 18px;
  margin-bottom: 20px;
}
</style>
