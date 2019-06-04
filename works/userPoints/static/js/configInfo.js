import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
import { mapGetters, mapActions, Store } from "vuex";
import Axios from "axios";
// import { testComponents } from "@/plugins/components"; //导入自定义组件

export default {
  name: "caraList",
  data() {
    return {
      answerFlag: false,
      messsage: '',
      nikeName: '',
      city: '',
      country: "",
      phoneNumber: "",
      logoPicture: '',
      gender: '',
      brithday: ''

    };
  },

  methods: {
    answerQuestion: function () {
      this.answerFlag = true;
    },

    loginOut: function () {
      localStorage.clear();
      this.messsage = '退出登录成功';
      this.$router.push({
        path: '/login'
      })
    },

    getInfo: function () {
      var _this = this
      var token = localStorage.getItem('token');
      // access_token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiI2MyIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9VU0VSX1dFQkNIQVQifV0sImV4cCI6MTU1OTU0MTU3NywidXNlck5hbWUiOiI2MyIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUl9XRUJDSEFUIl0sImp0aSI6IjI0NmQ1N2I4LWQzMzQtNDQ5Ny04MjMxLTFjMmM3YzE3ZWFiOCIsImNsaWVudF9pZCI6ImNsaWVudElkIn0.ZGAI07_eNomKjenJhhZ3q_7nS9lvDBWViUCUWwai6bI2bwQnLD6QvcMx_KVhytaoP6KQQVyMlbDI9VvkD8TYQgNGkzQLdcQZK7CD8_VMrwvIm7mlPrmYvGrUepAVhI6BtV4A-ndrBoQbhz10vszWwPknI4OFFLTcjZMKqo7fck28XR7D42SloTUb8c_SO-3F1ZkiU73vn5I3wismAIjh6Fj9o3jUZo7wZUr9rcjpbtL1v-m1PPjpNuIxgp6YMWPPsH4l4bgqVvozxF_JMrjFiuDZZoNQ5RPw2nojZbYHuphhDi7NfnOS4Fox0K8RnWV0mPdEMiXaUSC1Y1Jy8meELw'
      console.log(999)
      if (token != '' && token != undefined) {
        console.log(token)
        apiAll.getInfoDetail()
          .then(function (res) {
            if (res.httpCode == 200) {
              _this.nikeName = res.data.nikeName;
              _this.logoPicture = res.data.iconUrl
              if (res.data.gender === "1") {
                _this.gender = '男'
              } else {
                _this.gender = '女'
              }
              _this.brithday = res.data.birthday
            }
            console.log(res)
          })
      }
      console.log("dddd")
    },
    goAddress: function () {

      this.$router.push({
        path: '/addressList'
      })
    }
  },
  mounted: function () {
    this.getInfo()

  }

};


