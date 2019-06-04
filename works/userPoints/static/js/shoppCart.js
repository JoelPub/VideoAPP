import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
import store from '@/vuex/store';
import { mapState } from "vuex";
import provinces from "../json/provinces.json";
export default {
  name: "PersonalCenter",
  data() {
    return {
      activeFlag: 1,
      social: [],
      checkBoxArr: '',
      indeterminate: false,
      checkAll: false,
      addressFlag: false,
      formData: {},
      provincesData: [],
      count: 10,
      messsage: '',
      modal1: false,
      addressList: '',
      defaultAddress: '',
      shopCartArr: '',
      selectArr: [],
      total: 0

    };
  },
  computed: {
    ...mapState(["addressId"])
  },
  methods: {
    checkboxChange: function () {
      console.log(this.selectArr);


    },
    checkGroup: function (item) {

      var _this = this;
      var data = {
        "accountId": localStorage.getItem('accountId'),
        "operateType": 1,
        "productInDTOList": [
          {
            "isChecked": item.isChosed ? false : true,
            "productId": item.productId,
            "productType": "p",
            "quality": 0,
            "skuId": item.skuId
          }
        ]
      }

      apiAll.updateShopCart(data).then(function (res) {

        if (res.status == 'S') {
          apiAll.shoppingCart(localStorage.getItem('accountId')).then(function (res) {

            if (res.status == 'S') {
              _this.shopCartArr = res.data;

              _this.selectArr = [];
              _this.total = 0;
              var i;

              for (i in _this.shopCartArr) {
                if (_this.shopCartArr[i].isChosed == true) {
                  _this.selectArr.push(_this.shopCartArr[i].price);

                  _this.total += _this.shopCartArr[i].price * _this.shopCartArr[i].quality;
                }
              }

            }
          })

        }
      })

    },
    goAddress: function () {
      this.$router.push({
        path: '/addressList'
      })
    },

    submitOk() {
      var str = localStorage.getItem('accountId') + '?totalPoint=' + this.total + '&isPayed=true';
      console.log(str);
      var _this = this;
      apiAll.createorder(str).then(function (res) {
        console.log('================' + res);
        if (res.status == 'S') {
          _this.messsage = '恭喜您兌換成功!';
          setTimeout(function () {
            _this.$router.push({
              path: '/logisticsStatus'
            })
          }, 2000)

        }
      })
    },
    disabled: function () {
      this.messsage = '暂不支持到店自取'
    },
    cancelOrder() {
      var _this = this;
      var str = localStorage.getItem('accountId') + '?totalPoint=' + this.total + '&isPayed=false';
      console.log(str);
      apiAll.createorder(str).then(function (res) {
        console.log(res);
        if (res.status == 'S') {
          _this.messsage = '订单在待兑换列表';
          setTimeout(function () {
            _this.$router.push({
              path: '/logisticsStatus'
            })
          }, 2000)

        }
      })
    },
    addCount: function (item) {
      console.log(item);
      var _this = this;
      item.quality += 1;
      var data = {
        "accountId": localStorage.getItem('accountId'),
        "operateType": 1,
        "productInDTOList": [
          {
            "quality": +1,
            "productId": item.productId,
            "skuId": item.skuId

          }
        ]
      }
      apiAll.updateShopCart(data).then(function (res) {
        console.log(res);
        if (res.status == 'S' && item.isChosed == true) {
          _this.total += item.price * 1;

        }
      })
    },
    delCount: function (item) {
      console.log(item);
      if (item.quality == 1) {
        return;
      }
      var _this = this;
      item.quality -= 1;
      console.log(item);
      var data = {
        "accountId": localStorage.getItem('accountId'),
        "operateType": 1,
        "productInDTOList": [
          {
            "quality": -1,
            "productId": item.productId,
            "skuId": item.skuId

          }
        ]
      }
      apiAll.updateShopCart(data).then(function (res) {
        console.log(res);
        if (res.status == 'S' && item.isChosed == true) {

          _this.total -= item.price * 1;

        }
      })
    },
    submitOrder: function () {
      var _this = this;
      apiAll.checkorder(localStorage.getItem('accountId')).then(function (res) {
        console.log(res);
        if (res.status == 'F') {
          _this.messsage = res.errorMessage;
          return;
        } else if (res.status == 'S') {
          _this.modal1 = true;
        }
      })
      // this.modal1 = true;
    },
    goAddressList: function () {
      this.$router.push({
        path: '/addressList'
      })
    },
    isChecked: function (item) {
      console.log(item);
    },
    //删除产品
    delProduct: function (item) {
      console.log(item);
      var _this = this;
      var data = {
        "accountId": localStorage.getItem('accountId'),
        "operateType": 2,
        "productInDTOList": [
          {

            "productId": item.productId,
            "skuId": item.skuId

          }
        ]
      }
      apiAll.updateShopCart(data).then(function (res) {
        console.log(res);
        if (res.status == 'S') {
          _this.messsage = '删除成功';
          apiAll.shoppingCart(localStorage.getItem('accountId')).then(function (res) {
            console.log(res);
            if (res.status == 'S') {
              _this.shopCartArr = res.data;
              console.log(_this.shopCartArr);
              store.commit('shopCartCount', res.data.length ? res.data.length : 0)

            }
          })
        }
      })
    }
  },
  mounted() {
    console.log(provinces.data);
    var _this = this;
    this.provincesData = provinces.data;
    var label = $("#app > div > div.shopCartList > div > div:nth-child(1) > div.ivu-col.ivu-col-span-3.labelSpan > label > span:nth-child(2)");


    apiAll.shoppingCart(localStorage.getItem('accountId')).then(function (res) {
      console.log(res);
      if (res.status == 'S') {
        _this.shopCartArr = res.data;
        if (_this.addressId == '') {
          if (res.shippingAddressId) store.commit('addressClick', res.shippingAddressId);
        }
        else {
          //user selected address , use it
          apiAll.shoppingCartAddress(_this.addressId).then(function (response) {
            if (response.status == 'S') {
              console.log('更新地址成功');
            }
          });
        }

        console.log(_this.shopCartArr);
        setTimeout(function () {
          $('.ivu-checkbox+span').css('display', 'none');

        }, 5)
        var i;
        for (i in _this.shopCartArr) {
          if (_this.shopCartArr[i].isChosed == true) {
            _this.selectArr.push(_this.shopCartArr[i].price);
            console.log(_this.selectArr);
            _this.total += _this.shopCartArr[i].price * _this.shopCartArr[i].quality;
          }
        }
        // store.commit('shopCartCount', res.data.length)

        apiAll.addressList(localStorage.getItem('accountId')).then(function (res) {
          console.log(res);
          if (res.status == 'S') {
            _this.addressList = res.data;
            var useDefault = false;
            console.log(_this.addressList);
            if (res.data) {
              if (_this.addressId !== '' && !res.data.find(k => k.addressId == _this.addressId)) {
                store.commit('addressClick', '');
              }
              for (var i = 0; i < res.data.length; i++) {
                if (_this.addressId == '' && res.data[i].isDefault == true) {
                  _this.defaultAddress = res.data[i];
                  useDefault = true;
                  console.log(_this.defaultAddress);
                }
                else if (!useDefault && res.data[i].addressId == _this.addressId) {
                  _this.defaultAddress = res.data[i];
                  console.log(_this.defaultAddress);
                }
              }
              store.commit('addressClick', '');

            }
          }
        })
      }
    })
   
  },
  watch: {}
};
