
const state = {
    dialog: [
        { side: 'left', text: '有什么想要对我说的吗？' }
    ],
    value: ''
}

const getters = {

}

const mutations = {

    SET_INPUT_VALUE: (state, value) => {
        state.value = value
    },

    SET_DIALOG_VALUE: (state) => {
        state.dialog.push({
            side: 'right',
            text: state.value
        })

        setTimeout(() => {
            state.dialog.push({
                side: 'left',
                text: '今天天气很晴朗～'
            })
        }, 700)
    }
}

const actions = {
    setInputValue : ({commit}, value) => {
        commit('SET_INPUT_VALUE', value)
    },
    submit: ({commit}) => {
        commit('SET_DIALOG_VALUE')
        commit('SET_INPUT_VALUE', '')
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}