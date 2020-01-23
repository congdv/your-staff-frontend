import { staffConstants } from "../constants/staff.constants"
import { incomeConstants } from "../constants/income.constants"

export const staffs = (state=[], action) => {
  switch(action.type) {
  //Fetch staffs list
  case staffConstants.FETCH_REQUEST:
    return {
      isFetching: true,
      data: action.staffs
    }
  case staffConstants.FETCH_SUCCESS:
    console.log(action)
    return {
      isFetched: true,
      data: action.staffs
    }
  case staffConstants.FETCH_FAILURE:
    return {
      ...state
    }

  //Add new staff
  case staffConstants.ADD_REQUEST:
    return {
      isAdding: true,
      data: state.data
    }
  case staffConstants.ADD_SUCCESS:
    return {
      isAdded: true,
      data: [...state.data,action.staff]
    }
  case staffConstants.ADD_FAILURE:
    return {
      ...state
    }

  // Modify income of staffs
  case incomeConstants.ADD_REQUEST:
    return {
      isAddingInCome: true,
      data: state.data
    }
  case incomeConstants.ADD_SUCCESS:
    return {
      isAddedIncome: true,
      data: state.data
    }
  case incomeConstants.ADD_FAILURE:
    return {
      ...state
    }
  default:
    return state
  }
}
