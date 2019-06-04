import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
export default {
    name: "sendPoints",
    data() {
        return {
            testSwith: {
                'one': true,
                'two': false,
                'three': false
            },
            messsage: ''

        };
    },
    computed: {},
    methods: {
        change(status) {
            console.log(this.testSwith.one)
        }
    },
    watch: {

    },
    mounted() {
        console.log(this.$wechat);
    },
    created: function () { }
};