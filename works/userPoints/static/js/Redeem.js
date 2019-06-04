import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
import { mapGetters, mapActions, Store } from "vuex";
// import { testComponents } from "@/plugins/components"; //导入自定义组件

export default {
    name: "PersonalCenter",
    data() {
        return {

            buttonArr: ["1", "2", "3"],
            productList: '',
            activeFlag: 1,
            modal1: false,
            messsage: '',
            accountPoint: '',
            accountId: '',
            showDrawer: false,
            parentArray: [],
            shopCartArrLength: '',
            upon: true,
        };
    },

    methods: {
        ...mapActions([
            //与vuex中的actions关联
            "increment",
            "decrement"
        ]),
        changeActive: function (num, showDrawerFlag) {
            this.activeFlag = num;
            var _this = this;

            this.showDrawer = false;
            apiAll.productList(num).then(function (res) {
                console.log("this is prodocudt list data")
                console.log(res);
                if (num === 2) {
                    if (_this.upon) {
                        for (var i = 0; i < res.data.length - 1; i++) {
                            for (var j = 0; j < res.data.length - 1; j++) {
                                if (res.data[j].sales < res.data[j + 1].sales) {
                                    var temp = res.data[j];
                                    res.data[j] = res.data[j + 1];
                                    res.data[j + 1] = temp
                                }
                            }
                        }
                    }

                } else if (num === 3) {

                    if (_this.upon == true) {
                        for (var i = 0; i < res.data.length - 1; i++) {
                            for (var j = 0; j < res.data.length - 1; j++) {
                                if (res.data[j].price > res.data[j + 1].price) {
                                    var temp = res.data[j];
                                    res.data[j] = res.data[j + 1];
                                    res.data[j + 1] = temp
                                }
                            }
                        }


                        _this.upon = false
                    } else {

                        for (var i = 0; i < res.data.length - 1; i++) {
                            for (var j = 0; j < res.data.length - 1; j++) {
                                if (res.data[j].price < res.data[j + 1].price) {
                                    var temp = res.data[j];
                                    res.data[j] = res.data[j + 1];
                                    res.data[j + 1] = temp
                                }
                            }
                        }
                        _this.upon = true

                    }

                } else if (num === 4) {
                    if (_this.accountId != '' && _this.accountId != undefined) {
                        var newresdata = res.data.filter(function (item, index) {
                            return item.price <= _this.accountPoint;
                        })
                        res.data = newresdata
                    } else {
                        _this.$router.push({
                            path: '/login'
                        })
                    }
                } else if (num === 5) {

                    for (var i = 0; i < res.data.length - 1; i++) {
                        for (var j = 0; j < res.data.length - 1; j++) {
                            if (res.data[j].publishTime < res.data[j + 1].publishTime) {
                                var temp = res.data[j];
                                res.data[j] = res.data[j + 1];
                                res.data[j + 1] = temp
                            }
                        }
                    }
                } else {

                }

                _this.productList = res.data;
            })


        },
        openModal: function () {

            this.showDrawer = true;

        },
        goTop: function () {
            $("html,body").animate({ scrollTop: "0px" }, 400);
        },
        goShop: function () {
            this.$router.push({
                path: '/shoppCart'
            })
        },
        goProductInfo: function (productId) {
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

        },


    },
    created: function () {
    },
    mounted: function () {
        var _this = this;
        _this.accountId = localStorage.getItem("accountId");
        apiAll.points(_this.accountId).then(function (response) {
            if (response.httpCode == 200) {
                _this.accountPoint = response.status;
            }
        })
        apiAll.shoppingCart(localStorage.getItem('accountId')).then(function (res) {
            console.log(res);
            if (res.status == 'S') {
                _this.shopCartArrLength = res.data ? res.data.length : 0;

            } else if (res.status == 'F') {
                if (res.errorCode == '200010') {
                    _this.shopCartArrLength = 0;
                }

            }
        })
        apiAll.productList(1).then(function (res) {
            if (res.httpCode == 200) {
                console.log(res);
                _this.productList = res.data;
            }

        })
    }
    // components: {
    //     "child-component": testComponents
    // }
};


