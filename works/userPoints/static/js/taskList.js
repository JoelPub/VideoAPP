
import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
export default {
  name: "taskList",
  data() {
    return {
      messsage: '',
      modal1: false,
      totalPoints: '',
      owner: '',
      checkInFlag: '',
      singleTask: '',
      usuallyTask: '',
      detailInfo: ''
    };
  },
  methods: {
    openRules: function () {
      this.modal1 = true;
    },
    goPage: function (path) {
      this.$router.push({
        path: path
      })
    }

  },
  mounted: function () {
    var _this = this;
    var modal = $("body > div.v-transfer-dom > div.ivu-modal-wrap.vinModal > div > div > div.ivu-modal-body");
    console.log(modal);
    modal.css('height', '370px').css('overflow', 'scroll');
    // this.totalPoints = JSON.parse(localStorage.getItem('ProfileInfo')).points;

    apiAll.profile(localStorage.getItem('accountId')).then(function (res) {
      console.log(res);
      if (res.httpCode == 200) {
        _this.totalPoints = res.data.points;
        _this.detailInfo = res.data.customerProfileDetailInfo;

        _this.owner = res.data.isOwner;
        localStorage.setItem('ProfileInfo', JSON.stringify(res.data))

      }
    })
    // apiAll.signinlist(localStorage.getItem('accountId')).then(function (res) {
    //   console.log(res.statusDesc);
    //   if (res.status == 'SUCCESS') {
    //     console.log(res);
    //     _this.checkInFlag = res.isSignInToday;

    //   }
    // })

    apiAll.activityFlag(localStorage.getItem('accountId')).then(function (res) {
      console.log(res);
      if (res.status == 'SUCCESS') {
        _this.singleTask = res.singleTask;
        console.log(_this.singleTask);
        _this.usuallyTask = res.usuallyTask;
        console.log(_this.usuallyTask)
      }

    })
  }
};

