import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
export default {
    name: "PersonalCenter",
    data() {
        return {
            totalPoints: '',
            leave: '',
            leaveMsg: '',
          profileImg:""
        };
    },
    computed: {},
    methods: {

    },

    watch: {

    },
    mounted() {



    },
    created: function () {
      let data=JSON.parse(localStorage.getItem('ProfileInfo'))
        this.totalPoints = JSON.parse(localStorage.getItem('ProfileInfo')).points;
        this.leave = JSON.parse(localStorage.getItem('ProfileInfo')).levelNumber;
        this.profileImg=data.customerProfileDetailInfo.iconUrl
        if (this.totalPoints < 5000) {
            this.leaveMsg = '注册入会即可'
        } else if (this.totalPoints < 10000) {

            this.leaveMsg = '任意连续12个月内累计积分达到5000分'
        }
        else {

            this.leaveMsg = '任意连续12个月内累计积分达到10000分'
        }

    }
};
