// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'

import router from './router'
import qs from 'qs'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import filter from './plugins/filter'
import store from './vuex/store'
import infiniteScroll from 'vue-infinite-scroll'
import '../upresource/font/iconfont.css'
import wechat from 'weixin-js-sdk'
import promptModal from '@/components/promptModal'
import paginatedList from '@/components/paginatedList'
import utils from '@/assets/utils'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'





import VeeValidate, { Validator } from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'// 引入中文文件
// 配置中文
//Validator.addLocale(zh)

const config = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'fieldBags',  // 报冲突时 可自定义修改字段名称
  delay: 0, // 错误提示的延迟时间
  strict: true, // 没有设置规则的表单不进行校验，
  enableAutoClasses: false,
  locale: 'zh_CN', // 对语言（中文）的配置
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'input|blur', //* *input|blur** 在用户输入和表单失去焦点时都进行校验 可单独写  blur或input
  inject: true
}

const dictionary = {
  zh_CN: {
    messages: {
      email: () => '请输入正确的邮箱格式',
      required: (field) => '请输入' + field
    },
    attributes: {
      smsCode: '验证码',
      password: '密码',
      phoneNumber: '手机号',
      passwordNew: '新密码'

    }
  }
}

Validator.extend('mobile', {
  messages: {
    zh_CN: field => field + '格式不正确',
  },
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});
Validator.extend('password', {
  messages: {
    zh_CN: field => field + '格式不正确',
  },
  validate: value => {
    return /^(?=.*[a-zA-Z\d])[!-~]{8,16}$/.test(value)
  }
});

//Validator.updateDictionary(dictionary)




// 全局导入过滤器
Object.keys(filter).forEach(key => Vue.filter(key, filter[key]))
Vue.config.productionTip = false
Vue.prototype.qs = qs
Vue.prototype.$wechat = wechat;
Vue.prototype.$utils = utils;
Vue.prototype.$http = axios;
Vue.use(iView);
Vue.use(infiniteScroll)            //下拉加载更多 插件
Vue.use(VeeValidate, config)
Vue.component('prompt-modal', promptModal)
Vue.component('paginated-list', paginatedList)
Vue.use(MintUI)



router.beforeEach((to, from, next) => {


  if (localStorage.getItem('token') !== null) {
    next()
  } else {
    //防止无限循环
    if (to.name === 'login' || to.name === 'indexPage') {
      next();
      return
    }
    next({
      path: '/login',
      query: { from: to.fullPath }
    });
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})








