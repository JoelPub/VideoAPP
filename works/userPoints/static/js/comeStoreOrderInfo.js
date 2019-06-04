import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
import { mapGetters, mapActions, Store } from "vuex";
// import { testComponents } from "@/plugins/components"; //导入自定义组件

export default {
    name: "comeStoreOrderInfo",
    data() {
        return {

            messsage: ''

        };
    },

    methods: {
        goNavigation: function () {

            navigator.geolocation.getCurrentPosition(function (position, error) {
                console.log(position);
                console.log(error);
            })
            window.location.href = "http://api.map.baidu.com/marker?location=40.047669,116.313082&title=我的位置&content=百度奎科大厦&output=html&src=webapp.baidu.openAPIdemo";

        }
    },
    mounted: function () {

    }

};



