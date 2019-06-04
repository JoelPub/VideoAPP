import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
import { mapGetters, mapActions, Store } from "vuex";
// import { testComponents } from "@/plugins/components"; //导入自定义组件

export default {
    name: "Collection",
    data() {
        return {
            activeFlag: 1,
            checkBoxArr: '',
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
            if (num == 2) {
                _this.messsage = '暂不支持活动收藏';
                return;
            }
        },
        goInfo: function (productId) {
            var _this = this;
            apiAll.productInfo(productId).then(function (res) {
                console.log(res);
                if (res.httpCode == 200) {
                    localStorage.setItem('productInfo', JSON.stringify(res.data))
                    if (res) {
                        _this.$router.push({
                            path: '/productInfo'
                        })
                    }
                }

            })

        }
    },

    created: function () {

        var _this = this;
        apiAll.favoriteProList(JSON.parse(localStorage.getItem('ProfileInfo')).profileId).then(function (res) {
            console.log(res);
            if (res.status == 'SUCCESS') {
                _this.checkBoxArr = res.favoriteProducts;
                console.log(_this.checkBoxArr);
            }
        })
    }

};


