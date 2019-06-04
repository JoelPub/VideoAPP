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
            apiAll.sendSMSCode({ phoneNumber: this.phoneNumber, useful: 2 }).then(function (res) {

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
        },
        resetPassWord: function () {
            var _this = this;
            if (!this.single) {
                _this.messsage = '请阅读福特积分平台服务条款';
                return;
            }
            this.$validator.validateAll().then(function (res) {
                console.log(res);
                if (!res) {
                    _this.messsage = '注册信息不完整'
                    return;
                } else {
                    console.log($myForm);
                    var postData = {
                        "password": _this.passWord,
                        "phoneNumber": _this.phoneNumber,
                        "smsCode": _this.smsCode
                    }
                    apiAll.resetPassword(postData).then(function (res) {
                        if (res.httpCode == 200) {
                            _this.$router.push({
                                path: '/passwordLogin'
                            })
                        }
                    })
                }
            })

        },
        blur: function (name) {
            var _this = this;
            this.$validator.validate(name).then(function (res) {
                if (!res) {
                    _this.messsage = _this.errors.first(name)
                    return;
                }
            })
        },
        showPw: function () {
            this.pwType = this.pwType == 'text' ? 'password' : 'text';
        }
    }
};


