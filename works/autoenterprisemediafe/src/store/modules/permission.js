import { constantRouterMap } from '../../router/index'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = [...routers]
    },
    REMOVE_ROUTERS: (state) => {
      state.routers = constantRouterMap
      state.addRouters = []
    }
  },
  actions: {
    GenerateRoutes ({ commit }, menus) {
      commit('SET_ROUTERS', menus)
    }
  }
}

export default permission
