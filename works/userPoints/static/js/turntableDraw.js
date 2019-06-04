import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";
import store from '../../src/vuex/store';

export default {
    name: "turntableDraw",
    data() {
        return {
            index: 1,  // 当前转动到哪个位置，起点位置
            count: 8,  // 总共有多少个位置
            timer: 0,  // 每次转动定时器
            speed: 200,  // 初始转动速度
            times: 0,  // 转动次数
            cycle: 50,  // 转动基本次数：即至少需要转动多少次再进入抽奖环节
            prize: '',  // 中奖位置
            click: true,
            showToast: false,
            toastType: 'luck',
            modal1: false,
            parentArray: [1, 2],
            allPoints: '',
            apiPrize: '',
            prizeArray: [],
            num: 1,
            modalMessage: '',
            secondClick: true,
            stop: false,
            modal2: false,
            title: true,
            Id: '',
            buttonText:'点击抽奖',
        };
    },
    computed: {
    },
    mounted() {
        var _this = this
        _this.Id = localStorage.getItem('accountId');
        apiAll.luckwheelFrist({ 'accountId': _this.Id }).then(function (res) {
          if (res.httpCode == 200) {
            if (res.first == true) {
                _this.num = 1;
                _this.buttonText = '点击抽奖';
                // _this.modal2 = true;
            }else{
              _this.num = 0;
              _this.buttonText = '10积分/次'
            }
          }
        })
        $('.ivu-modal').css({
          'padding':'0 30px'
        })
        $('.ivu-modal-content').css({
          'border-radius':'30px'
        })

        $('.ivu-modal-body').css({
          'text-align':'center'
        })
    },
    methods: {
        // 开始抽奖
        startLottery() {
            var _this = this
            if (!this.click) {
                return
            }
            _this.title = true;
            _this.num = 0;
            _this.buttonText = '10积分/次'
            apiAll.playwheel({ 'accountId': _this.Id }).then(function (res) {
              console.log(res)
                if (res.httpCode == 200) {
                    _this.apiPoint = res.point
                    if (_this.apiPoint == 0) {
                        _this.modalMessage = '谢谢参与'
                        _this.title = false;
                    } else if (_this.apiPoint == 10) {
                        _this.modalMessage = _this.apiPoint + '积分'
                    } else if (_this.apiPoint == 30) {
                        _this.modalMessage = _this.apiPoint + '积分'
                    } else {
                        _this.modalMessage = _this.apiPoint + '积分'
                    }
                    _this.startRoll()
                    _this.speed = 200
                    _this.click = false
                }
            })
        },
        // 开始转动
        startRoll() {
            this.times += 1 // 转动次数
            this.oneRoll() // 转动过程调用的每一次转动方法，这里是第一次调用初始化
            // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
            if (this.times > this.cycle + 10 && this.prize === this.index) {
                clearTimeout(this.timer)  // 清除转动定时器，停止转动
                // this.prize = 2
                this.times = 0
                this.click = true
                this.showToast = true
                this.modal1 = true
                console.log('中奖')
            } else {
                if (this.times < this.cycle) {
                    this.speed -= 10  // 加快转动速度
                } else if (this.times === this.cycle) {  // 随机获得一个中奖位置
                    if (this.apiPoint == 0) {
                        this.prizeArray = [2, 4, 6, 8]
                        this.prize = this.prizeArray[Math.floor((Math.random() * this.prizeArray.length))];
                    } else if (this.apiPoint == 30) {
                        this.prize = 3
                    } else if (this.apiPoint == 50) {
                        this.prize = 7
                    } else if (this.apiPoint == 10) {
                        this.prizeArray = [1, 5]
                        this.prize = this.prizeArray[Math.floor((Math.random() * this.prizeArray.length))];
                    }
                } else if (this.times > this.cycle + 10 &&
                    ((this.prize === 0 && this.index === 7) || this.prize === this.index + 1)) {
                    this.speed += 110
                } else {
                    this.speed += 20
                }
                if (this.speed < 40) {
                    this.speed = 40
                }
                this.timer = setTimeout(this.startRoll, this.speed)
            }
        },
        // 每一次转动
        oneRoll() {
            let index = this.index // 当前转动到哪个位置
            const count = this.count // 总共有多少个位置
            index += 1
            if (index > count) {
                index = 0
            }
            this.index = index
        },
        // 关闭弹出框
        modalShow() {
            console.log(this.apiPoint)
        },
        confirmButton(){
          this.modal1 = false;
        }

    },
};




