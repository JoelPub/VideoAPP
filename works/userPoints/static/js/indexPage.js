import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
export default {
  name: "PersonalCenter",
  data() {
    return {
      value1: 0,
      messsage: '',
      carouselList: '',
      state: '',
      code: '',
      token: '',
      openId: '',
      redirectUrl:'',
    };
  },
  computed: {

  },
  methods: {

    getCode() {
      var _this = this;
      _this.code = window.location.search.substr(1).split('&')[0].split('=')[1];
      var oldCode = localStorage.getItem('code')
      //有code说明授权成功
      if(_this.code !="" && _this.code !=oldCode){
        apiAll.webchatCode(_this.code).then(function (res) {
          if (res.httpCode == 200) {
            console.log('333')
            console.log(res);
            localStorage.setItem('code',_this.code)
            localStorage.setItem('token', res.data.access_token);
            localStorage.setItem('accountId', res.data.accountId);
            localStorage.setItem('openId', res.data.openId);
            if(_this.redirectUrl !='' && _this.redirectUrl != null && _this.redirectUrl != undefined){
              _this.$router.push({
                    path: _this.redirectUrl
              })
           }else{
            _this.$router.push({
              path: '/activityCenter'
            })
           }
            apiAll.profile(res.data.accountId).then(function (res) {
              console.log(res);
              if (res.httpCode == 200) {
                  console.log(res);
                  localStorage.setItem('ProfileInfo', JSON.stringify(res.data))
              }
          })
          }
          if(res.httpCode == 417) {
            _this.$router.push({
              path: '/login'
            })
          }
        });

      }else if(_this.openId !="" && _this.openId !=undefined){
        // openId 说明已经授权过
        apiAll.webchat(_this.openId).then(function(res){
          if(res.httpCode ==200 ){
            localStorage.setItem('token',res.data.access_token);
          }
        })
      }else {
        _this.$router.push({
          path: 'login'
    })
      }
    },
    goPage: function (path) {
      this.$router.push({
        path: path
      })
    }

  },
  watch: {

  },
  mounted() {
    var _this = this;
    console.log(this.$wechat);
    apiAll.imgGlobal('home').then(function (res) {
      if (res.httpCode == 200) {
        _this.carouselList = res.data;
      }
    })
  },
  beforeMount(){
    var _this = this;
    _this.openId = localStorage.getItem('openId');
    _this.redirectUrl = localStorage.getItem("redirectUrl");
    this.getCode()
  }
}
