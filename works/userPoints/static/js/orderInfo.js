import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
import { mapGetters, mapActions, Store } from "vuex";
// import { testComponents } from "@/plugins/components"; //导入自定义组件

export default {
    name: "logisticsStatus",
    data() {
        return {
            messsage: '',
            orderInfo: ''
        };
    },

    methods: {

    },
    mounted: function () {
        this.orderInfo = JSON.parse(localStorage.getItem('orderInfoPage'));
        console.log(this.orderInfo);
    }
};



