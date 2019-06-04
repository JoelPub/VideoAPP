

const actions = {
    increment: ({ commit }, payload) => commit('increment', payload), // 提交到mutations中处理
    decrement: ({ commit }, payload) => commit('decrement', payload),
    showloading: ({ commit }) => commit('showloading'),
    hideloading: ({ commit }) => commit('hideloading'),
    shopCartCount: ({ commit }, payload) => commit('shopCartCount', payload),
    addressClick: ({ commit }, payload) => commit('addressClick', payload),

}

export default actions;
