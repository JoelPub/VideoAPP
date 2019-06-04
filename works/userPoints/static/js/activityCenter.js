import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
import { mapGetters, mapActions, Store } from "vuex";
// import { testComponents } from "@/plugins/components"; //导入自定义组件

export default {
    name: "activityCenter",
    data() {
        return {
            activeFlag: 1,
            activityList: '',
            messsage: '',
            AexcitingActivities: '',
            favoriteFlag: '',
            showDrawer: false,
            activityTarget:'all'
        };
    },
    methods: {
        ...mapActions([
            //与vuex中的actions关联
            "increment",
            "decrement"
        ]),
        changeActive: function (num) {
            console.log(num);
            this.activeFlag = num;
        },
        goPage: function (path) {
            this.$router.push({
                path: path
            })
        },
        openModal: function () {

            this.showDrawer = true;

        },
        changeActiveTarget: function (target) {
          this.activityTarget = target;
          this.showDrawer = false;

        }
        // favorite: function (flag) {
        //     console.log()
        //     var _this = this;
        //     var data = {
        //         "addOrRemove": flag,
        //         "productId": this.productInfo.productId,
        //         "profileId": JSON.parse(localStorage.getItem('ProfileInfo')).profileId
        //     }
        //     apiAll.favoriteAct(data).then(function (res) {
        //         if (res.status == 'SUCCESS') {
        //             _this.messsage = _this.favoriteFlag ? '取消收藏成功' : '收藏成功';
        //             apiAll.isfavoriteAct(data).then(function (res) {
        //                 console.log(res.status);
        //                 _this.favoriteFlag = res.status == 'FAVORITE' ? true : false;


        //             })
        //         }
        //     })
        // }

    },
    mounted: function () {
        var getData = {
            status: 1,
            transactionId: 1
        }
        var _this = this;
        apiAll.activityList(getData).then(function (res) {
            console.log(res);
            if (res.httpCode == 200) {
                _this.activityList = res.data;
                localStorage.setItem('activityList', _this.activityList)
            }
        })

        apiAll.excitingActivities().then(function (res) {
            console.log(res);
            if (res.status == 'SUCCESS') {
                _this.AexcitingActivities = res.data;
            }
        })



    },

};




