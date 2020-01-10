
const loginReducer = (state = null, action) => {
  switch (action.type) {
    case "LOG_IN":
      return action.data
    default:
      return state
  }
}

export const loginAction = (user) => {
  return async dispatch => {
    dispatch({
      type: "LOG_IN",
      data: user
    })
  }
}
export const logoutAction = () => {
  return dispatch => {
    dispatch({
      type: "USER_LOGOUT"
    })
  }
}
export default loginReducer