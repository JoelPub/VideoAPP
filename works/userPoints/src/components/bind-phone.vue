<template>
  <div class="loginBox">
    <prompt-modal :messsage="messsage" timeout="2500" @hideModal="messsage=''"></prompt-modal>
    <div class="loginTitle">
      <img src="../../upresource/img/fordlogo.png">
    </div>
    <div class="bind-tit">绑定手机号</div>
    <ul class="loginBoxUl">
      <li>
        +86>
        <input placeholder="请输入手机号" v-model="mobile">
      </li>
      <li>未注册的手机号验证后自动创建积分账户</li>
      <li>
        <input placeholder="请输入验证码" v-model="smsCode">
        <button @click="getVerification" :disabled="disButton">{{Verification}}</button>
      </li>
    </ul>
    <button class="submitButton" @click="bindHandle">绑定</button>
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
        Verification: "获取验证码",
        count:60,
        postData: {},
        messsage: '',
        single: '',
        href: '',
        redirect: '',
        disButton:false,
      }
    },
    computed:{

    },
    watch:{

    },
    methods: {
      getUserful(num){
        let start=num.substring(0,4)
        let end=num.substring(7)
        return `${start}****${end}`
      },
      getVerification(){
        if (!this.mobile) {
          this.messsage = '手机号不能为空';
          return;
        }
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(this.mobile)) {
          this.messsage = '手机号格式不正确';
          return;
        }else{
          this.displyCount()
          let newphoneNumber=this.mobile;
          let newuseful=this.getUserful(number)
          // let Data = {
          //   phoneNumber:"",
          //   useful:""
          // };
          let url= `${apiAll.sendSMSCode}?phoneNumber=${newphoneNumber}&useful=${newuseful}`
          this.$http(
            {
              method: 'get',
              url: url,
              // data: JSON.stringify(Data),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then((res) => {})
            .catch(error=>{

            })
        }
      },
      // 获取短信验证码倒计时
      displyCount(){
        let timer;
        if (this.count>0)
        {
          this.disButton="";
          this.count--;
          timer=setTimeout(()=>{
            this.displyCount();
          },1000);
        }else if(this.count==0){
          this.disButton=false;
          this.countShow=false;
          this.count=120;
          clearTimeout(timer);
        }
      },
      bindHandle(){
        let url= apiAll.bindPhoneNumber
        let Data = {
          Authorization :"",
          phoneNumber:"",
          partPhoneNumber:'',
          smsCode:''
        };
        this.$http(
          {
            method: 'get',
            url: url,
            // data: JSON.stringify(Data),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {})
          .catch(error=>{

          })
      }
    },
    async created(){

    },
    async mounted(){

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style   scoped>
  @import "../../upresource/css/login.css";
  .bind-tit{
    font-size: 18px;
    margin-bottom: 20px;
  }
</style>
