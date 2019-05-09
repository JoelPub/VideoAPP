import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import iView from 'iview'
import './my-theme/index.less'
// import 'iview/dist/styles/iview.css'
import touch from 'vue-directive-touch'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(iView)
Vue.use(touch)
Vue.use(VueRouter)

new Vue({
  render: h => h(App)
}).$mount('#app')
