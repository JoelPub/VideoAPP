import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
export default {
    name: "testDriveRecord",
    data() {
        return {
            testDriveList: '',
            messsage: ''

        };
    },
    computed: {},
    methods: {

    },
    watch: {

    },
    mounted() {
        var _this = this;
        apiAll.testDriveList(localStorage.getItem('accountId')).then(function (res) {
            console.log(res);
            if (res.status == 'S') {
                _this.testDriveList = res.testDrives;
                console.log(_this.testDriveList);
                for (var i = 0; i < _this.testDriveList.length; i++) {

                    var timer = _this.testDriveList[i].lastModifyTime.split('T')[0].replace(/\-/g, "/");
                    console.log(_this.testDriveList[i].dealerId)
                    _this.testDriveList[i].dealerName = _this.testDriveList[i].dealerId.split(',')[0];
                    _this.testDriveList[i].dealerAddress = _this.testDriveList[i].dealerId.split(',')[1];
                    _this.testDriveList[i].lastModifyTime = new Date(timer).getFullYear() + '年' + (new Date(timer).getMonth() + 1) + '月' + new Date(timer).getDate() + '号';
                    
                }
            }
        })

    },
    created: function () { }
};

