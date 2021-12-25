import './polyfills'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Api from './api/index'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import * as mUtils from '@/common/js/mUtils'

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './customTheme/theme/index.css'
import './assets/fonts/font.css'
import './assets/video/css/iconfont.css'
import './assets/video/icon2/iconfont.css'
import '@/common/styles/index.scss'
import '@/assets/font-awesome/css/font-awesome.css'

import plugin from './plugin'
import VueClipboard from 'vue-clipboard2'
plugin.install(Vue)
Vue.use(VueClipboard)

Vue.prototype.Event = new Vue()
Vue.prototype.$mUtils = mUtils

const requireComponent = require.context(
  './components/global',
  false,
  /g\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )
  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  )
})

Vue.use(ElementUI, {
  size: 'small'
})

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.prototype.$http = new Api()

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.fillUser) {
    if (!store.state.ifAsideNav) store.commit('MODIFY_ASIDE')
    if (store.state.ifMenuSwitch) store.commit('MODIFY_Menu_Switch')
  } else {
    if (store.state.ifAsideNav) store.commit('MODIFY_ASIDE')
    if (store.state.ifMenuSwitch) store.commit('MODIFY_Menu_Switch')
  }
  store.commit('MODIFY_ROUTE_FROM', to.path)
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
