import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
import { mapGetters, mapActions, Store } from "vuex";
// import { testComponents } from "@/plugins/components"; //导入自定义组件

export default {
    name: "logisticsStatus",
    data() {
        return {
            activeFlag: 5,
            checkBoxArr: ["1", "2", "3", "4"],
            messsage: '',
            orderList: ''

        };
    },

    methods: {
        ...mapActions([
            //与vuex中的actions关联
            "increment",
            "decrement"
        ]),
        changeActive: function (num) {
            console.log(num);
            this.activeFlag = num;
        },

        goPage: function (oId, statusId, routeFlag) {
            console.log(oId);
            localStorage.setItem('routeFlag', routeFlag);
            var _this = this;
            apiAll.orderInfo(oId, statusId).then(function (res) {
                var path;

                if (res.status == 'S') {

                    localStorage.setItem('orderInfoPage', JSON.stringify(res.data));
                    switch (statusId) {
                        case 1:
                            path = "/pendingOrderInfo";
                            break;
                        case 2:
                            path = "/deliveredOrderInfo";
                            break;
                        case 3:
                            path = "/receiptOrderInfo";
                            break;
                        case 4:
                            path = "/orderInfo";
                            break;
                        case 5:
                            path = "/receiptOrderInfo";
                            break;
                    }
                }

                _this.$router.push({
                    path: path
                })

            })

        },
        cancelOrder: function (oId) {
            var _this = this;
            apiAll.cancelOrder(oId + '?accountId=' + localStorage.getItem('accountId')).then(function (res) {
                console.log(res);
                if (res.status == 'S') {
                    _this.messsage = '取消订单成功';
                    apiAll.orderList(localStorage.getItem('accountId')).then(function (res) {
                        console.log(res);
                        if (res.status == 'S') {
                            _this.orderList = res.data;
                            console.log(_this.orderList)
                        }
                    })
                } else {
                    _this.messsage = '取消订单失败,后台错误';
                    return;
                }
            })

        },
        confirmReceipt: function (oId) {
            var _this = this;
            var data = {
                "accountId": localStorage.getItem('accountId'),
                "confirmDesc": '确认收货',
                "orderId": oId
            };
            apiAll.receiveOrder(data).then(function (res) {
                console.log(res);
                if (res.status == 'S') {
                    _this.messsage = '确认收货成功';
                    apiAll.orderList(localStorage.getItem('accountId')).then(function (res) {
                        console.log(res);
                        if (res.status == 'S') {
                            _this.orderList = res.data;
                            console.log(_this.orderList)
                        }
                    })

                }
            })
        },
        confirmpay: function (oId) {

            var _this = this;
            apiAll.confirmpay(oId + '?accountId=' + localStorage.getItem('accountId')).then(function (res) {
                console.log(res);
                if (res.status == 'S') {
                    _this.messsage = '恭喜您兌換成功';
                    _this.activeFlag = 2;
                } else {
                    _this.messsage = '后台错误,兑换失败';
                    return;
                }
            })
        }
    },
    mounted: function () {
        var _this = this;

        apiAll.orderList(localStorage.getItem('accountId')).then(function (res) {
            console.log(res);
            if (res.status == 'S') {
                _this.orderList = res.data;
                console.log(_this.orderList)
            }
        })

        this.activeFlag = localStorage.getItem('routeFlag');
    }
};


