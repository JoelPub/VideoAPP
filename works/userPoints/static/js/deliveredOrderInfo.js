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

    },
    mounted: function () {
        this.orderInfo = JSON.parse(localStorage.getItem('orderInfoPage'));
        console.log(this.orderInfo.shippingAddressInfo);
        this.activeFlag = this.$route.query.param || 1;
    }
};




