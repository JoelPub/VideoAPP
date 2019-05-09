import Vue from 'vue'
import vuex from 'vuex'

import TryTheTech from './modules/TryTheTech'
import Talk from './modules/Talk'

Vue.use(vuex)

export default new vuex.Store({
  modules: {
    TryTheTech,
    Talk
  }
})