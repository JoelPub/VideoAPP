import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
import store from '@/vuex/store';
import provinces from "../json/provinces.json";
import PickerExtend from 'picker-extend';
export default {
    name: "addressList",
    data() {
        return {
            activeFlag: 1,
            vertical: "1",
            addressFlag: false,
            formData: {
                "accountId": localStorage.getItem('accountId'),
                "isDefault": false,
                "regionId": "string",
                "cityId": "string",
                "city" : ''
            },
            provincesData: [],
            addressArr: '',
            defaultAddress: '',
            messsage: '',
            clickFlag: '',
            addressList: '',
            provinceId: '',
            modal2: false,
            delId: '',
            historyUrl: ''

        };
    },

    methods: {
        showModal: function () {

        },
        addAddress: function () {
            this.addressFlag = true;
            this.formData = {};
            this.formData = {
                "accountId": localStorage.getItem('accountId'),
                "isDefault": false,
                "regionId": "string",
                "cityId": "string"
            };
            console.log(this.formData);
            this.clickFlag = 1;
        },
        editAddres: function (item) {
            this.addressFlag = true;
            this.clickFlag = 2;
            this.formData = JSON.parse(JSON.stringify(item));
            this.formData['accountId'] = localStorage.getItem('accountId');
            this.formData['city'] = item.fullInfo.replace(item.deailInfo,'');
            console.log(this.formData);
        },
        change: function () {

        },
        ok() {
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;

            if (!this.formData.contactPerson  ) {
                this.messsage = '请添加收货人';
                return;
            }
            else if (!this.formData.city ) {
                this.messsage = '请选择收货地区';
                return;
            }
            else if (!this.formData.deailInfo) {
                this.messsage = '请填写详细地址';
                return;
            }
            else if (!this.formData.contactNumber || !myreg.test(this.formData.contactNumber)) {
                this.messsage = '手机号格式不正确';
                return;
            }
            var _this = this;
            if (this.clickFlag == 1) {
                this.formData['fullInfo'] = this.formData.city + '' + this.formData.deailInfo;

                apiAll.customeraddress(this.formData).then(function (res) {
                    console.log(res);
                    if (res.status == 'S') {
                        _this.messsage = '添加地址成功';
                        _this.addressFlag = false;
                        apiAll.addressList(localStorage.getItem('accountId')).then(function (res) {
                            console.log(res);
                            if (res.status == 'S') {
                                _this.addressList = res.data;
                                _this.addressList.sort((a,b)=> Number(b.isDefault) - Number(a.isDefault));
                            }
                        })
                    }

                })
            } else {

                this.formData['fullInfo'] = this.formData.city + '' + this.formData.deailInfo;
                apiAll.updatecustomeraddress(this.formData).then(function (res) {
                    if (res.status == 'S') {
                        _this.messsage = '修改地址成功';
                        _this.addressFlag = false;
                        apiAll.addressList(localStorage.getItem('accountId')).then(function (res) {
                            console.log(res);
                            if (res.status == 'S') {
                                _this.addressList = res.data;
                                _this.addressList.sort((a,b)=> Number(b.isDefault) - Number(a.isDefault));
                            }
                        })
                    }

                })

            }

        },
        cancel() {

        },
        delAddres: function (delId) {
            this.modal2 = true;
            this.delId = delId;
        },
        delOk: function () {
            var _this=this;
           
            apiAll.delAddressList(this.delId).then(function (res) {
                console.log(res);
                if (res.status == 'S') {
                    _this.messsage = '删除地址成功';
                    apiAll.addressList(localStorage.getItem('accountId')).then(function (res) {
                        console.log(res);
                        if (res.status == 'S') {
                            _this.addressList = res.data;

                        }
                    })
                }
            })
        },
        delCancel: function () {

        },

        goPage: function (path, param) {
            if(this.historyUrl=='/shoppCart') {
              store.commit('addressClick', param);

              this.$router.push({
                  path: path
                  //query: {
                  //    param: param
                  //}
              })
            }
        }
    },
    beforeRouteEnter ( to, from, next ) {
       // console.log('Entering Bar')
       // Pass a callback to next (optional)
       next(vm => {
         // this callback has access to component instance (ie: 'this') via `vm`
         // console.log("Fully Entered Bar")

         vm.historyUrl =  from.fullPath;
       })
     },


    mounted: function () {
        console.log(provinces.data);
        var _this = this;
        var selectAddress = new PickerExtend({
            trigger: '#address',
            title: '',
            wheels: [
                {
                    data: provinces.data
                }
            ],
            keyMap: {
                id: 'label',
                value: 'value',
                childs: 'children'
            },
            // position: [9, 0, 0],
            callback: function (indexArr, data) {

                _this.formData.provinceId = indexArr.join('');

                var addressStr = '';
                data.forEach(el => {
                    console.log(el);
                    addressStr += el.value;

                });
                _this.formData.city = addressStr;
                $('#address').val(addressStr);

            }
        });

        var modalBody = $(".ivu-modal-wrap.addressModal > div > div > .ivu-modal-body");
        console.log(modalBody);
        modalBody.css('paddingBottom', '35px');
        apiAll.addressList(localStorage.getItem('accountId')).then(function (res) {
            console.log(res);
            if (res.status == 'S') {
                _this.addressList = res.data;
                if (_this.addressList&&_this.addressList.length) _this.addressList.sort((a,b)=> Number(b.isDefault) - Number(a.isDefault));
            }
        })
    }

};



