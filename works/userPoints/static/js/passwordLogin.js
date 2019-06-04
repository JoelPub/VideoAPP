import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";

export default {
    name: "passwordLogin",
    data() {
        return {
            pwType: 'password',
            messsage: '',
            phone: '',
            password: '',
            single: ''
        };
    },
    methods: {
        goLogin: function () {

            this.$router.push({ path: "/login" });
        },
        showPw: function () {
            this.pwType = this.pwType == 'text' ? 'password' : 'text';
        },
        goRegistered: function () {
            this.$router.push({ path: "/registered" });
        },
        resetPassword: function () {
            this.$router.push({ path: "/resetPassword" });
        },
        submit: function () {
            if (!this.phone) {
                this.messsage = '手机号不能为空';
                return;
            }
            if (!this.password) {
                this.messsage = '密码不能为空';
                return;
            }
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(this.phone)) {
                this.messsage = '手机号格式不正确';
                return;
            }

            if (!this.single) {
                this.messsage = '请阅读福特积分平台服务条款';
                return;
            }
            var postData = {
                "password": this.password,
                "phoneNumber": this.phone,
                "source": 1,
                "type": 1
            }
            var _this = this;
            apiAll.login(postData).then(function (res) {
                if (res.httpCode == 200) {
                    console.log(res);
                    localStorage.setItem('accountId', res.data.accountId);
                    localStorage.setItem('token', res.data.access_token);
                    localStorage.setItem('refresh_token', res.data.access_token);
                    _this.messsage = '登录成功';
                    _this.$router.push({
                        path: '/indexPage'
                    })
                }
            });
        }
    }
};













