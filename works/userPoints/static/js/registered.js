import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
export default {
    name: "HelloWorld",
    data() {
        return {
            Verification: "获取验证码",
            disabledFlag: false,
            smsCode: '',
            messsage: '',
            pwType: 'password',
            phoneNumber: '',
            passWord: '',
            single: ''


        };
    },
    methods: {
        goPasswordLogin: function () {
            this.$router.push({ path: "/passwordLogin" });
        },
        getVerification: function () {
            if (!this.phoneNumber) {
                this.messsage = '手机号不能为空';
                return;
            }
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(this.phoneNumber)) {
                this.messsage = '手机号格式不正确';
                return;
            }
            var getData = {
                phoneNumber: this.phoneNumber,
                source: 1
            }
            apiAll.checkMobile(getData).then(function (res) {
                console.log(res);
                if (res.status == 'F') {
                    this.messsage = '该手机号不存在';
                    return;
                }
            })
            this.Verification = "60";
            this.disabledFlag = true;
            var getVerification = setInterval(() => {
                this.Verification = this.Verification -= 1;
                console.log("函数内======" + this.Verification);
                if (this.Verification == 1) {
                    this.Verification = "获取验证码";
                    clearInterval(getVerification);
                    this.disabledFlag = false;
                }
            }, 1000);
            apiAll.sendSMSCode({ phoneNumber: this.phoneNumber, useful: 1 }).then(function (res) {

            })

        },
        creatAccount: function () {

            var _this = this;
            this.$validator.validateAll().then(function (res) {
                console.log(res);
                if (!res) {
                    _this.messsage = '注册信息不完整'
                    return;
                } else {
                    var postData = {
                        "password": _this.passWord,
                        "phoneNumber": _this.phoneNumber,
                        "phoneNumberPart": _this.phoneNumber.replace(/(\d{3})\d{4}(\d*)/, '$1****$2'),
                        "smsCode": _this.smsCode,
                        "source": 1,
                        // "status": "string",
                        "termAndConditionId": 1,
                        "type": 1
                    }
                    apiAll.creatAccount(postData).then(function (res) {
                        if (res.status == 'S') {
                            _this.messsage = "注册成功~";
                            _this.$router.push({
                                path: '/passwordLogin'
                            })
                        }
                    })
                }
            })

        },
        showPw: function () {
            this.pwType = this.pwType == 'text' ? 'password' : 'text';
        },
        inputblur: function (name) {
            var _this = this;
            this.$validator.validate(name).then(function (res) {
                if (!res) {
                    _this.messsage = _this.errors.first(name);
                    return;
                }
            })
        },

    }
};

