import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
import { getDaysOfMonth } from "@/plugins/util";
import { mapGetters, mapActions, Store } from "vuex";

export default {
    name: "caraList",
    data() {
        return {
            days: [],
            week: '',
            timeer: '',
            messsage: '',
            data: ''
        };
    },
    methods: {
        ...mapActions([
            //与vuex中的actions关联
            "increment",
            "decrement"
        ]),
        checkIn: function () {
            var _this = this;
            apiAll.signin(localStorage.getItem('accountId')).then(function (res) {
                console.log(res);
                if (res.status == 'SUCCESS') {
                    // _this.data.isSignInToday = true;
                    apiAll.signinlist(localStorage.getItem('accountId')).then(function (res) {
                        console.log(res.statusDesc);
                        if (res.status == 'SUCCESS') {
                            _this.data = res;
                            _this.days = res.signInList;
                            console.log(_this.days);

                        }
                    })
                } else if (res.status == 'INTERNAL_SERVER_ERROR') {
                    _this.messsage = '后台出现异常';
                    return;
                }
            })
        }

    },




    mounted: function () {
        var date = new Date;
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" + month : month);
        this.timeer = (year.toString() + '-' + month.toString());
        var days = getDaysOfMonth().split('-')[0] * 1 + 1;
        var week = getDaysOfMonth().split('-')[1];
        var calendarWidth = $('.calendar').width();
        console.log(calendarWidth);

        this.week = week;
        console.log(week);
        var offset = this.week * 0.142 * calendarWidth;
        console.log(offset)
        this.$nextTick(() => {
            setTimeout(() => {

                $('.week1').css('margin-left', offset + 'px')
            }, 500)
        })
    },
    created: function () {
        console.log('created');
        var _this = this;
        apiAll.signinlist(localStorage.getItem('accountId')).then(function (res) {
            console.log(res.statusDesc);
            if (res.status == 'SUCCESS') {
                _this.data = res;
                _this.days = res.signInList;
                console.log(_this.days);

            }
        })
    }

};






