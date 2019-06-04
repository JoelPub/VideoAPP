import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
import { mapGetters, mapActions, Store } from "vuex";
// import { testComponents } from "@/plugins/components"; //导入自定义组件

export default {
    name: "expressStatus",
    data() {
        return {
            messsage: '',
            orderInfo: ''
        };
    },

    methods: {
        ...mapActions([
            //与vuex中的actions关联
            "increment",
            "decrement"
        ]),

        receiptOrder: function (oId) {
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
                    setTimeout(function () {
                        _this.$router.push({
                            path: '/logisticsStatus'
                        })
                    }, 1500)

                }
            })
        }

    },
    mounted: function () {
        this.orderInfo = JSON.parse(localStorage.getItem('orderInfoPage'));
        console.log(this.orderInfo);
        this.activeFlag = this.$route.query.param || 1;
    }
};




