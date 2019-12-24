import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
import axios from 'axios';
export default {
    name: "HelloWorld",
    data() {
        return {
            Verification: "获取验证码",
            disabledFlag: false,
            postData: {},
            messsage: '',
            single: '',
            href: '',
            redirect: ''

        };
    },
    methods: {
        goPasswordLogin: function () {
            this.$router.push({ path: "/passwordLogin" });
        },
        getVerification: function () {
            if (!this.postData.mobile) {
                this.messsage = '手机号不能为空';
                return;
            }
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(this.postData.mobile)) {
                this.messsage = '手机号格式不正确';
                return;
            }
            apiAll.sendSMSCode({ phoneNumber: this.postData.mobile, useful: 1 }).then(function (res) {

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
        login: function () {
            if (!this.postData.mobile) {

                this.messsage = '手机号不能为空';
                return;
            }
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(this.postData.mobile)) {
                this.messsage = '手机号格式不正确';
                return;
            }
            if (!this.postData.smsCode) {

                this.messsage = '验证码不能为空';
                return;
            }
            if (!this.single) {
                this.messsage = '请阅读XX积分平台服务条款';
                return;
            }
            var postData = {
                "password": (this.postData.smsCode).toString(),
                "phoneNumber": this.postData.mobile,
                "source": 1,
                "type": 2
            }
            var _this = this;
            apiAll.login(postData).then(function (res) {
                if (res.httpCode == 200) {
                    console.log(res);
                    localStorage.setItem('accountId', res.data.accountId);
                    // localStorage.setItem('accountId', '14');
                    localStorage.setItem('token', res.data.access_token);
                    localStorage.setItem('refresh_token', res.data.access_token);
                    apiAll.profile(res.data.accountId).then(function (res) {
                        console.log(res);
                        if (res.httpCode == 200) {
                            console.log(res);
                            localStorage.setItem('ProfileInfo', JSON.stringify(res.data))
                        }
                    })
                    _this.messsage = '登录成功';
                    _this.$router.push({
                        path: '/indexPage'
                    })
                }
            });
        },
        weChatLogin: function () {
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxca895002b23a333f&redirect_uri=https%3a%2f%2ftdpfe.apps.pp01.cneast.cf.ford.com.cn%2f%23%2findexPage&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'

        },
        getQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        },
        replaceParamVal: function (paramName, replaceWith) {
            var oUrl = this.location.href.toString();
            var re = eval('/(' + paramName + '=)([^&]*)/gi');
            var nUrl = oUrl.replace(re, paramName + '=' + replaceWith);
            this.location = nUrl;
            window.location.href = nUrl
        }
    }
};






