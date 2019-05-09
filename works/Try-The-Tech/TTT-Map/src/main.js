import Vue from "vue"

import App from "./App.vue"

import router from "./router"

import store from "./store/index.js"

import "./plugins/element.js"

import iView from "iview"

import moment from "moment"

import "iview/dist/styles/iview.css"
import './plugins/element.js'

Vue.config.productionTip = false

Vue.use(iView)

window.moment = moment

moment.locale("zh-cn")

Vue.prototype.moment = moment

// moment.js test
// console.log('当前语言？', moment.locale())
// console.log('今天星期几？', moment().format('dddd'))
// console.log('这个月的第一天', moment().startOf('month').get)

window.addEventListener("load", () => {})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
