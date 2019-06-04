import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
export default {
    name: "PersonalCenter",
    data() {
        return {
            messsage: '',
            checkInFlag: false,
            owner: '',
            favoriteLength: '',
            totalPoints: '',
            leave: '',
            detailInfo: ''
        };
    },
    computed: {},
    methods: {
        goPage: function (path, param) {
            this.$router.push({
                path: path

            })
            localStorage.setItem('routeFlag', param);
        },
        checkIn: function () {
            var _this = this;


            apiAll.signin(localStorage.getItem('accountId')).then(function (res) {
                console.log(res);
                if (res.status == 'SUCCESS') {
                    _this.checkInFlag = true;
                    apiAll.profile(localStorage.getItem('accountId')).then(function (res) {
                        console.log(res);
                        if (res.httpCode == 200) {
                            _this.totalPoints = res.data.points;

                        }
                    })
                } else if (res.status == 'INTERNAL_SERVER_ERROR') {
                    _this.messsage = '后台出现异常';
                    return;
                }



            })
        }
    },

    watch: {
        buttonStr: function (val, oldval) {

        }
    },
    mounted() {
        console.log(this.$wechat);
        var _this = this;
        apiAll.signinlist(localStorage.getItem('accountId')).then(function (res) {
            console.log(res.statusDesc);
            if (res.status == 'SUCCESS') {
                console.log(res);
                _this.checkInFlag = res.isSignInToday;

            }
        })
        this.owner = JSON.parse(localStorage.getItem('ProfileInfo')).isOwner;


    },
    created: function () {
        var _this = this;

        apiAll.profile(localStorage.getItem('accountId')).then(function (res) {
            console.log(res);
            if (res.httpCode == 200) {
                _this.totalPoints = res.data.points;
                _this.detailInfo = res.data.customerProfileDetailInfo;
                _this.favoriteLength = res.data.favoriteCount;
                _this.leave = res.data.levelNumber;
            }
        })
    }
};

