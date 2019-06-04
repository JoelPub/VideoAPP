import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
import { mapGetters, mapActions, Store } from "vuex";
// import { testComponents } from "@/plugins/components"; //导入自定义组件

export default {
    name: "caraList",
    data() {
        return {
            activeFlag: 1,
            checkBoxArr: ["1", "2", "3", "4"],
            messsage: ''

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
        goBuy: function () {
            this.$router.push({
                path: 'Redeem'
            })
        }
    },

};


