import { userConstants } from "../constants/user.constants"

const user = JSON.parse(window.localStorage.getItem("userToken"))
const initialState = user ? { loggedIn: true, user } : {}

export const updateUser = (state = initialState, action) => {
  switch(action.type) {
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