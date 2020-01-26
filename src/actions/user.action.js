import userService from "../services/user"
import { userConstants } from "../constants/user.constants"
import { history } from "../helpers/history"
import alertAction from "../actions/alert.action"

const request = (user, type = userConstants.LOGIN_REQUEST) => { return { type, user }}
const success = (user, type = userConstants.LOGIN_SUCCESS) => { return { type, user }}
const failure = (error, type = userConstants.LOGIN_FAILURE ) => { return { type , error }}
const login = (username, password) => {
  return async dispatch => {
    dispatch(request({ username }))
    try {
      const user = await userService.login({ username,password })
      window.localStorage.setItem("userToken", JSON.stringify(user))
      dispatch(success(user))
      history.push("/")
    }catch(exception) {
      console.log(exception.error)
      dispatch(failure(exception.error))
      dispatch(alertAction.error(exception.error))
    }

  }
}

const update = (props) => {
  return async dispatch => {
    const {
      username,
      name,
      oldPassword,
      newPassword,
      confirmationPassword
    } = props
    dispatch(request({ username },userConstants.UPDATE_REQUEST))
    try {
      const updatedUser = await userService.update({
        username,
        name,
        oldPassword,
        newPassword,
        confirmationPassword
      })
      window.localStorage.setItem("userToken", JSON.stringify(updatedUser))
      dispatch(success(updatedUser, userConstants.UPDATE_SUCCESS))
    }catch(exception) {
      dispatch(failure(exception.error,userConstants.UPDATE_FAILURE))
      dispatch(alertAction.error(exception.error))
    }
  }
}

const logout = () => {
  return async dispatch => {
    dispatch({ type: userConstants.LOGOUT })
    dispatch({ type: userConstants.GLOBAL_LOGOUT })
  }
}

export default { login, logout, update }