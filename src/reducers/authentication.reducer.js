import { userConstants } from "../constants/user.constants"

const user = JSON.parse(window.localStorage.getItem("userToken"))
const initialState = user ? { loggedIn: true, user } : {}

export const authentication = (state = initialState, action) => {
  switch(action.type) {
  case userConstants.LOGIN_REQUEST:
    return {
      loggingIn: true,
      user: action.user
    }
  case userConstants.LOGIN_SUCCESS:
    return {
      loggedIn: true,
      user: action.user
    }
  case userConstants.LOGIN_FAILURE:
    return {}
  case userConstants.LOGOUT:
    return {}
  case userConstants.UPDATE_REQUEST:
    return {
      updatingUser: true,
      ...state
    }
  case userConstants.UPDATE_SUCCESS:
    return {
      loggedIn: true,
      updatedUser: true,
      user: action.user
    }
  case userConstants.UPDATE_FAILURE:
    return {
      ...state
    }
  default:
    return state
  }
}