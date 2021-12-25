import Vue from 'vue'
import Vuex from 'vuex'
// import permission from './modules/permission'
import user from './modules/user'
import editor from './modules/editor'
import video from './modules/video'
import { Message } from 'element-ui'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ifMenuSwitch: true,
    ifAsideNav: false,
    ifDialog: false,
    userInfo: {},
    routeFrom: '',
    ifRememberMe: true
  },
  mutations: {
    MODIFY_ASIDE (state) {
      state.ifAsideNav = !state.ifAsideNav
    },
    MODIFY_Dialog (state) {
      state.ifDialog = !state.ifDialog
    },
    MODIFY_Menu_Switch (state) {
      state.ifMenuSwitch = !state.ifMenuSwitch
    },
    MODIFY_User (state, user) {
      const _user = user || {}
      for (const key in _user) {
        state.userInfo[key] = _user[key]
      }
    },
    MODIFY_ROUTE_FROM (state, path) {
      state.routeFrom = path
    },
    MODIFY_REMEBER (state) {
      state.ifRememberMe = !state.ifRememberMe
    }
  },
  actions: {
    /**
     * 显示提示 msg.type 类型  msg.data 消息内容
     * @param commit
     * @param msg
     */
    showMassage (store, msg) {
      console.log(msg)
      Message({
        type: msg.type,
        message: msg.message || msg.data
      })
    },

    // 控制左侧侧边导航显示隐藏
    setIfAsideNav ({ commit, state, dispatch }, data) {
      const flag = data
      commit('MODIFY_ASIDE', flag)
    }
  },
  modules: {
    user,
    editor,
    video
  }
})
