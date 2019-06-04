import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
export default {
    name: "PersonalCenter",
    data() {
        return {
            value1: 0,
            messsage: '',
            tabFlag: 1,
            integraList: '',
            totalPoints: ''
        };
    },
    computed: {},
    methods: {},
    watch: {

    },
    mounted() {
        var _this = this;
        apiAll.pointList(localStorage.getItem('accountId')).then(function (res) {
            console.log(res);
            if (res.status == 'SUCCESS') {
                console.log(res.data)
                _this.integraList = res.data;
                console.log(_this.integraList);
                for (var i = 0; i < _this.integraList.length; i++) {
                    console.log(_this.integraList[i].createTime);
                    var timer = _this.integraList[i].createTime.split('T')[0].replace(/\-/g, "/");
                    console.log(timer);
                    var month;
                    var days;
                    if (new Date(timer).getMonth() < 10) {
                        month = '0' + (new Date(timer).getMonth() + 1);
                    } else {
                        month = new Date(timer).getMonth();
                    }
                    if (new Date(timer).getDate() < 10) {
                        days = '0' + (new Date(timer).getDate());
                    } else {
                        days = new Date(timer).getDate();
                    }
                    _this.integraList[i].createTime = new Date(timer).getFullYear() + '/' + month + '/' + days;
                }
            }

        })
        this.totalPoints = JSON.parse(localStorage.getItem('ProfileInfo')).points;
    },
    created: function () { }
};
