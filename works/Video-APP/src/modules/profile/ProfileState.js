const INITIAL_STATE = {
  user_id: '',
  login: false,
};

const UPDATE_PROFILE = 'UPDATE_PROFILE'

const profileStateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      console.log('delete');
      return {
        user_id: action.payload,
        login: action.payload==''?false:true,
      }
    default:
      return state
  }
};
export function updateprofile(id) {
  console.log('deletenote id=',id);
  return {
    type: UPDATE_PROFILE,
    payload: id
  }
}
// Reducer
export default profileStateReducer;
