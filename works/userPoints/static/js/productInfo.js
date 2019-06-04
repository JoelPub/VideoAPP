import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
import store from '@/vuex/store';
export default {
    name: "productInfo",
    data() {
        return {
            value2: 0,
            modal2: false,
            count: 1,
            messsage: '',
            productInfo: '',
            activeVal: '',
            skus: '',
            sel: [],
            selectArr: [],
            skusArr: '',
            skusInfo: '',
            clickFlag: '',
            shareModalFlag: '',
            favoriteFlag: '',
            shopCartArrLength: '',
            buyFlag: false,
            detail: '',
            detailObj: ''
        };
    },


    methods: {
        addCount: function () {
            this.count++;

            if (this.count > this.skusInfo.inventory) {
                this.messsage = '超出库存范围';
                this.count--;
            }
        },
        delCount: function () {
            if (this.count > 1) {
                this.count--;
            }

        },
        goPage: function (path) {
            this.$router.push({
                path: path
            })
        },
        addShopCart: function () {
            this.clickFlag = 2;
            this.modal2 = true;
        },
        exchange: function () {
            this.clickFlag = 1;
            this.modal2 = true;
        },
        shareProduct: function () {
            this.shareModalFlag = true;

        },
        submitOrder: function () {
            var _this = this;
            console.log(_this);
            if (!this.buyFlag) {
                this.messsage = '请先选择商品规格';
                return;
            }
            if (this.clickFlag == 2) {
                //处理加入购物车逻辑
                console.log(this.skusInfo);
                if (this.skusInfo.inventory == 0) {
                    this.messsage = '该规格库存不足~';
                    return;
                }

                console.log(this.skusInfo);


                var data = {
                    "accountId": localStorage.getItem('accountId'),
                    "operateType": 1,
                    "productInDTOList": [
                        {
                            "productId": this.productInfo.productId,
                            "productType": this.productInfo.productType,
                            "quality": this.count,
                            "skuId": this.skusInfo.skuId
                        }
                    ]
                }
                apiAll.updateShopCart(data).then(function (res) {
                    console.log(res);
                    _this.modal2 = false;
                    if (res.status == 'S') {
                        _this.messsage = '添加到购物车成功';
                        apiAll.shoppingCart(localStorage.getItem('accountId')).then(function (res) {
                            console.log(res);
                            if (res.status == 'S') {
                                _this.shopCartArrLength = res.data ? res.data.length : 0;

                            }
                        })
                    }
                })



            } else if (this.clickFlag == 1) {
                //处理立即兑换逻辑
                if (this.skusInfo.inventory == 0) {
                    this.messsage = '该规格库存不足~';
                    return;
                }
                var str = this.productInfo.productId + '?isPayed=true&skuId=' + this.skusInfo.skuId + '&quality=' + this.count + '&accountId=' + localStorage.getItem('accountId');
                apiAll.quickorder(str).then(function (res) {
                    console.log(res);
                    if (res.status == 'S') {
                        _this.messsage = '恭喜您兑换成功';
                        setTimeout(function () {
                            _this.$router.push({
                                path: '/logisticsStatus'
                            })
                        }, 2000)

                    } else if (res.status == 'F') {
                        _this.messsage = res.errorMessage;
                        return;
                    }
                })

            }

        },
        favorite: function (flag) {
            console.log()
            var _this = this;
            var data = {
                "addOrRemove": flag,
                "productId": this.productInfo.productId,
                "profileId": JSON.parse(localStorage.getItem('ProfileInfo')).profileId
            }
            apiAll.favoritePro(data).then(function (res) {
                if (res.status == 'SUCCESS') {
                    _this.messsage = _this.favoriteFlag ? '取消收藏成功' : '收藏成功';
                    apiAll.isfavoritePro(data).then(function (res) {
                        console.log(res.status);
                        _this.favoriteFlag = res.status == 'FAVORITE' ? true : false;


                    })
                }
            })
        },
        spliceSkus: function (attrValueId, index, ind, attrId) {

            var findStr = attrId + '' + attrValueId;

            var matchSkusInfo = this.skusArr.find(function (x) {
                return x.identificationInfo.indexOf(findStr) > -1
            })
            if (matchSkusInfo && matchSkusInfo.identificationInfo) {
                // console.log(matchSkusInfo.identificationInfo);

            }

            var _this = this;
            var minIndex = index * 2 + 1;
            var maxIndex = index * 2 + 2;
            this.selectArr[minIndex] = attrId;
            this.selectArr[maxIndex] = attrValueId;
            this.$set(this.sel, index, ind);
            var skusInfo = this.skusArr.find(function (x) {

                return x.identificationInfo == _this.selectArr.join('')
            })

            if (skusInfo) {
                console.log('选择有库存====')
                this.skusInfo = skusInfo;
                this.buyFlag = true;
                console.log(this.skusInfo);
            } else {
                console.log('选择没有库存====')
                this.skusInfo = '';
            }
        },
        quickOrder: function () {


        }

    },
    watch: {},
    created: function () {
        var _this = this;
        this.productInfo = JSON.parse(localStorage.getItem('productInfo'));
        console.log(this.productInfo.detail)
        this.detail = this.productInfo.detail.split(';');
        console.log(this.detail);
        var x;
        var detailObj = [];
        for (x in this.detail) {
            console.log(this.detail[x]);

            console.log(this.detail[x].split(':'))
            detailObj.push({
                'name': this.detail[x].split(':')[0],
                'val': this.detail[x].split(':')[1]
            })
        }
        console.log(detailObj);
        this.detailObj = detailObj;
        console.log(this.detailObj);
        this.selectArr.push(this.productInfo.productId)
        this.skusArr = this.productInfo.skus;
        this.skusInfo = this.productInfo.skus[0];
        console.log(this.skusArr);

        var data = {

            "productId": this.productInfo.productId,
            "profileId": JSON.parse(localStorage.getItem('ProfileInfo')).profileId
        }
        apiAll.isfavoritePro(data).then(function (res) {
            console.log(res.status);
            _this.favoriteFlag = res.status == 'FAVORITE' ? true : false;


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
    }
};












