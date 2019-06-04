import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
Vue.use(Vuex)


// state  全局状态管理
const state = {
    count: 0,
    loadingFlag: false,
    shopCartCount: '',
    addressId: '',
}

const getters = {
}


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
