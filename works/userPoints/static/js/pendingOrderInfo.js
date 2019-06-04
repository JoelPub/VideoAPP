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

        quickCreatOrder: function () {
            var _this = this;
            apiAll.confirmpay(this.orderInfo.orderId + '?accountId=' + localStorage.getItem('accountId')).then(function (res) {
                console.log(res);
                if (res.status == 'S') {
                    _this.messsage = '恭喜您兌換成功';
                    setTimeout(function () {
                        _this.$router.push({
                            path: '/logisticsStatus'
                        })
                    }, 1500)

                } else {
                    _this.messsage = '兑换失败,稍后再试';
                    return;
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




