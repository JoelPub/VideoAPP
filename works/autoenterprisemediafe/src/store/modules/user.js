const userInfo = {
  state: {
    type: localStorage.getItem('role') || ''
  },
  mutations: {
    SET_ROLE: (state, role) => {
      state.type = role
    }
  }
}

export default userInfo
