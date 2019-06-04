import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";

export default {
    name: "PersonalCenter",
    data() {
        return {

            model1: '',
            Verification: '获取验证码',
            disabledFlag: false,
            single: '',
            postData: {
                'dealerId': ''
            },
            messsage: '',
            dealerParams: '',
            dealerName: ''

        };
    },
    computed: {},
    // components: {
    //     'foo-component': {
    //         props: {
    //             arr: {
    //                 type: Array,
    //                 default: () => []
    //             },

    //         },
    //         template: '<div  v-for="item  in  arr">{{item}}</div>'
    //     }
    // },
    methods: {
        getVerification: function () {
            if (!this.postData.phone) {
                this.messsage = '手机号不能为空';
                return;
            }
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(this.postData.phone)) {
                this.messsage = '手机号格式不正确';
                return;
            }
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


            let url = apiAll.sendSMSCode2()
            let data = {
                phoneNumber: this.postData.phone,
                useful: 4
            }
            this.$http(
                {
                    method: 'get',
                    url: url,
                    params: data,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => { })
                .catch(error => {

                })
        },
        submitTestDrive: function () {
            console.log(this.postData.phone.replace(/(\d{3})\d{4}(\d*)/, '$1****$2'))

            var _this = this;
            if (!this.postData.dealerId || !this.postData.smsCode || !this.postData.name || !this.postData.phone) {
                this.messsage = '您的预约信息不完整';
                return;
            }

            console.log(this.postData);
            var partPhoneNumber = this.postData.phone.replace(/(\d{3})\d{4}(\d*)/, '$1****$2')

            apiAll.createTestDrive('?name=' + this.postData.name + '&phone=' + this.postData.phone + '&dealerId=' + this.postData.dealerId + '&smsCode=' + this.postData.smsCode + '&activityId=9&accountId=' + localStorage.getItem('accountId') + '&partPhoneNumber=' + partPhoneNumber).then(function (res) {
                console.log(res);
                if (res.status == '200') {
                    localStorage.setItem('postData', '');
                    _this.messsage = '预约试驾成功';
                    setTimeout(function () {
                        _this.$router.push({
                            path: '/activityCenter'
                        })
                    }, 2000)

                } else {
                    _this.messsage = '后台服务错误';
                    return;
                }
            })
        },
        goDelaer: function () {
            localStorage.setItem('postData', JSON.stringify(this.postData));

            this.$router.push({
                path: '/dealer?callBack=testDrive'
            })
        }
    },
    mounted() {
        console.log(this.$route.params)
        if (this.$route.params && this.$route.params.name) {
            console.log(this.$route.params);

            this.dealerParams = this.$route.params;
            this.dealerName = this.$route.params.name;
            this.postData = JSON.parse(localStorage.getItem('postData'));
            this.postData.dealerId = this.$route.params.name + ',' + this.$route.params.address;

        }

    },
    watch: {}
};
