import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
export default {
    name: "vinSubmit",
    data() {
        return {
            modal1: false,
            vinCode: '',
            messsage: ''

        };
    },
    computed: {},
    methods: {
        qrVin: function () {
            $('#img-upload').click();
        },
        certificationVin: function () {
            var _this = this;
            var myreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{17}$/;
            if (!myreg.test(this.vinCode)) {

                this.messsage = '车辆识別码格式不符合规范';
                return;
            }
            apiAll.checkVin('?vin=' + this.vinCode + '&vinNickName=JJ&accountId=' + localStorage.getItem('accountId')).then(function (res) {

                if (res.status == 'SUCCESS') {
                    _this.messsage = '恭喜您成为认证车主 ~';
                    setTimeout(function () {
                        _this.$router.push({
                            path: '/personalCenter'
                        })
                    }, 1500)

                } else if (res.status == 'INTERNAL_SERVER_ERROR') {
                    _this.messsage = '服务端错误,请稍后再试~';
                    return;
                } else if (res.status == 'INVALID_VIN') {
                    _this.messsage = 'VIN校验失败~';
                    return;
                } else if (res.status == 'VIN_ALREADY_EXISTS') {
                    _this.messsage = '该vin码已被添加';
                    return;
                } else if (res.status == 'TRY_LATER') {
                    _this.messsage = '服务器繁忙 请稍后再试';
                    return;
                }

            })
        },
        changeVin: function ($event) {


        }
    },
    mounted() {
        var vinModal = $("body > div.v-transfer-dom > div.ivu-modal-wrap.vinModal > div > div");
        console.log(vinModal);
        vinModal.css('background', '#2d96cd').css('text-align', 'center').css('color', '#fff');
    },

};
