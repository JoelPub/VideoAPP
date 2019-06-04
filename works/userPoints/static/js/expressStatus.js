import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
import { mapGetters, mapActions, Store } from "vuex";

export default {
    name: "expressStatus",
    data() {
        return {
            activeFlag: 2,
            preActiveFlag: 2,
            modal2: false,
            messsage: '',
            orderNumber: '',
            orderTodoArr: [],
            orderDoneArr: [],
            orderAll: [],
            orderId:'',
            expressCompany:'',
            expressNo:'',
            searched: false
        };
    },

    methods: {
        ...mapActions([
            //与vuex中的actions关联
            "increment",
            "decrement"
        ]),
        changeActive: function (num) {
          if(this.activeFlag !== num) {
            var _this = this;
            console.log(num);
            if(num==3) {
              var data = {
                              "accountId": 30,
                              "orderStatus": 4
                          }
              apiAll.orderList(data).then(function (res) {
                  console.log("已发货订单列表");
                  console.log(res);
                  if (res.httpCode == 200) {
                      console.log(res.data);
                      if(!_this.searched)  _this.orderAll=_this.orderAll.filter(n => !_this.orderDoneArr.includes(n));
                      _this.orderDoneArr = res.data;
                      if(!_this.searched) _this.orderAll=_this.orderAll.concat(_this.orderDoneArr);
                  }
              })
            }
            else if(num==2) {
             var data = {
                             "accountId": 30,
                             "orderStatus": 2
                         }
             apiAll.orderList(data).then(function (res) {
                 console.log("未发货订单列表");
                 console.log(res);
                 if (res.httpCode == 200) {
                     console.log(res.data);
                     if(!_this.searched)  _this.orderAll=_this.orderAll.filter(n => !_this.orderTodoArr.includes(n));
                     _this.orderTodoArr = res.data;
                     if(!_this.searched) _this.orderAll=_this.orderAll.concat(_this.orderTodoArr);
                 }
             })
           }
            this.preActiveFlag = this.activeFlag
            this.activeFlag = num;
          }
        },

        goPage: function (path) {

            this.$router.push({
                path: path
            })
        },
        processOrder: function (orderId) {
           this.modal2 = true;
           this.orderId = orderId;
        },
        submitOrder: function () {
           var _this = this;
           console.log(this.expressNo);
           console.log(this.expressCompany);
            var data = {
                          "expressCompanyName": _this.expressCompany,
                          "expressNumber": _this.expressNo,
                          "operAccountId": 30,
                          "orderId": _this.orderId,

                      }
            console.log('更新物流',data)
            apiAll.updateExpress(data).then(function (res) {
            //apiAll.orderList1(data).then(function (res) {
              console.log("更新物流api");
              console.log(res);
              if (res.httpCode == 200) {
                  console.log('更新物流');
                  _this.orderTodoArr.find(k => k.orderId == _this.orderId).statusId=3;
                  //_this.orderTodoArr.find(function(element){
                    //return element.orderId == _this.orderId
                  //}).statusId=3;
                  _this.orderAll.find(k => k.orderId == _this.orderId).statusId=3;
                  //_this.orderAll.find(function(element){
                  //  return element.orderId == _this.orderId
                  //}).statusId=3;
                  //_this.orderTodoArr[0].statusId=3;
                  _this.modal2 = false;
              }
              else {
                  alert('更新物流失败');
                  _this.modal2 = false;
              }
            })
        },
        searchOrder: function () {
            var _this = this;
            console.log(_this.orderNumber);
            _this.orderAll=[];
            if(_this.orderNumber=='') {
                _this.fetchOrder();
            }
            else {
              var data = {
                              "orderId": _this.orderNumber
                          }
              apiAll.orderInfo(_this.orderNumber).then(function (res) {
                  console.log("搜索订单");
                  console.log(res);
                  if (res.httpCode == 200) {
                      console.log(res.data);
                      var orderResult = {};
                      orderResult.orderId=res.data.orderId;
                      orderResult.statusId=res.data.statusId;
                      orderResult.price=res.data.price;
                      orderResult.quality=res.data.quality;
                      orderResult.singleProductName=res.data.orderItemList[0].name;
                      orderResult.imageList=[res.data.orderItemList[0].imageUrl];
                      _this.orderAll.push(orderResult);
                      _this.searched = true;
                  }
              })
            }
            this.activeFlag = 1;
        },
        fetchOrder: function(){
            var _this = this;
            var data = {
                            "accountId": 30,
                            "orderStatus": 2
                        }
            apiAll.orderList(data).then(function (res) {
                console.log("未发货订单列表");
                console.log(res);
                if (res.httpCode == 200) {
                    console.log(res.data);
                    _this.orderTodoArr = res.data;
                    console.log(_this.orderTodoArr.length);
                    //_this.orderAll =  _this.orderAll.concat(_this.orderTodoArr);
                }

                data.orderStatus=4;
                apiAll.orderList(data).then(function (res) {
                    console.log("已发货订单列表");
                    console.log(res);
                    if (res.httpCode == 200) {
                        console.log(res.data);
                        _this.orderDoneArr = res.data;
                        console.log(_this.orderDoneArr.length);
                        _this.orderAll =  _this.orderAll.concat(_this.orderDoneArr,_this.orderTodoArr);
                    }
                });
            })
        }
    },
    mounted: function () {
        this.activeFlag = this.$route.query.param || 2;
        this.preActiveFlag = this.activeFlag;
        var _this = this;
        _this.fetchOrder();
    }
};


