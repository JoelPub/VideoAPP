<template>
    <div class="bg-grey" @click.self="toParent" v-if="!show">
        <mt-picker :slots="slots" @change="onValuesChange" value-key="value" showToolbar>
            <mt-header title="">
                <mt-button slot="left" class="cancle" @click="toCancel" style="color: orange;">取消</mt-button>
                <mt-button slot="right" class="sure" @click="sure" style="color: orange;">确定</mt-button>
            </mt-header>
        </mt-picker>
    </div>
</template>


<script>
import { iosProvinces ,iosCitys} from '../assets/provinceCityData'
import { get, post } from "@/request/https";
import store from '@/vuex/store'

export default {
    data(){
        return{
            result: '',
            provinceValue: '',
            cityValue: '',
            dealerValue: '',
            first: '',
            second: '',
            third: '',
            preProvinceValue: '',
            preCityValue: '',
            dealerArray: [],
            slots: [{
                    flex: 1,
                    values: iosProvinces,
                    className: 'slot1',
                    textAlign: 'left',
                    defaultIndex: 0
                }, {
                    flex: 1,
                    values: iosCitys,
                    className: 'slot2',
                    textAlign: 'center',
                    defaultIndex: 0
                }, {
                    flex: 1,
                    values: '',
                    className: 'slot3',
                    textAlign: 'right',
                    defaultIndex: 0
                }]
        }
    },
    props: ['show', 'province', 'city', 'dealer','selectedData'],

    watch:{
        selectedData(val, oldVal){
            var newData = [];
             if(val.length>0){
                 for(let j=0; j<val.length; j++){
                         var filterData = {};
                         filterData.value = val[j].value;
                         newData.push(filterData);
                 }
                 this.slots[2].values = newData;
             }else{
                 this.slots[2].values  = [];
             }

            store.commit('hideloading');
        }

    },
    methods: {

        doEmit(event,city,province){

            this.$emit(event,city,province);

        },

        // 筛选器值变化时调用
        onValuesChange(picker, values) {

            if($(".bg-grey .picker-slot").length){
              $(".bg-grey .picker-slot-left").css('flex','none');
              $(".bg-grey .picker-slot-center").css('flex','none');
              $(".bg-grey .picker-slot-right").css('text-align','left');
              $(".bg-grey .picker-slot").css('font-size','15px');
              $(".bg-grey .picker-items").css('background-color','#efe0e06b');
            }
            if(typeof(values[2]) == 'object'){
                 this.dealerValue = values[2].value;
                 for(var j=0; j<this.selectedData.length; j++){
                        if(this.dealerValue == this.selectedData[j].value){
                            this.third = j;
                        }
                   }
             }
            var cityArray = [],
                preProvinceValue,
                preCityValue;

            if(values[0]){
                for(let i=0; i<iosCitys.length; i++){
                    if(values[0].provinceKey == iosCitys[i].parentkey){
                        cityArray.push(iosCitys[i]);
                    }
                }
                picker.setSlotValues(1, cityArray);
            }

            var result = this.result;

            if(typeof(values[1]) == 'object'){
                result = values[0].value + values[1].value;
                this.provinceValue = values[0].value;
                this.cityValue = values[1].value;
                for(let i=0; i<iosProvinces.length; i++){
                    if(iosProvinces[i].value == this.provinceValue){
                        this.first = i;
                    }
                }
                for(let i=0; i<cityArray.length; i++){
                    if(this.cityValue == cityArray[i].value){
                        this.second = i;
                    }
                }
                this.slots[0].defaultIndex = parseInt(this.first);
                this.slots[1].defaultIndex = parseInt(this.second);
            }else if(typeof(values[1]) != 'object'){
                values[1] = this.iosCitys;
                result = values[0].value + this.city;
                this.provinceValue = values[0].value;
                this.cityValue = this.city;
            }
            this.result = result;
            var _this = this;
            if(values[0] && values[1] && !(values[0].value == _this.preProvinceValue && values[1].value == _this.preCityValue)){
                   console.log("getDealer");
                            if(_this.provinceValue&&_this.cityValue){
                                store.commit('showloading');
                                    console.log("doEmit");
                                    _this.doEmit('getCityLocation',_this.provinceValue,_this.cityValue);
                                    _this.preProvinceValue = _this.provinceValue;
                                    _this.preCityValue = _this.cityValue;
                            }
            }

        },
        // 传值
        toParent(){
            var show = false;
            var result, province, city, dealer;
            if(this.province + this.city + this.dealer){
                result = this.province + this.city + this.dealer;
                province = this.province;
                city = this.city;
                dealer = this.dealer;
            }
            this.$emit('changeValue', {show, result, province, city, dealer});
        },

        toCancel(){
            this.$emit('cancel');
        },
        // 点击确定按钮
        sure(){
            var show = false;
            var result = this.result;
            var province = this.provinceValue;
            var city = this.cityValue;
            var dealer = this.dealerValue;
            var index = this.third;
            this.$emit('changeValue', {show, result, province, city, dealer,index});
        }
    },
    mounted(){

        this.slots[0].values = iosProvinces;
        this.slots[1].values = [];
    },
    updated: function () {
        this.$nextTick(function () {
            console.log(this.province + this.city + this.county);
            this.slots[2].defaultIndex = parseInt(this.third);
        })
    }
}
</script>
<style scoped>
    .bg-grey{
        background: rgba(0,0,0,.5);
        height: 100%;
        width: 100%;
        position: fixed;
        z-index: 200;
        top: 0;
        left: 0;
    }
    .picker{
        position: fixed;
        bottom: 0;
        background: #fff;
        width: 100%;
    }
    .mint-header{
        background: #f7f7f8;
        color: #333;
    }
    .cancle{
        color: #999;
    }
    .sure{
        color: #0575f2;
    }

</style>


