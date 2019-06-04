const mutations = {
  increment(state, payload) {
    state.count = state.count + payload
  },
  decrement(state, payload) {
    state.count = state.count - payload
  },
  showloading(state) {
    console.log('vuex');
    state.loadingFlag = true;
  },
  hideloading(state) {
    state.loadingFlag = false;
  },
  shopCartCount(state, payload) {
    state.shopCartCount = payload;
  },
  addressClick(state, payload) {
   state.addressId = payload;
  },

}


export default mutations;
