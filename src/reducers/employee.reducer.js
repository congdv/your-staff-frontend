import { employeeConstants } from "../constants/employee.constants"

export const employees = (state={}, action) => {
  switch(action.type) {
  case employeeConstants.FETCH_REQUEST:
    return {
      isFetching: true,
    }
  case employeeConstants.FETCH_SUCCESS:
    return {
      isFetched: true,
      data: action.employees
    }
  case employeeConstants.FETCH_FAILURE:
    return {
      ...state
    }

  //Deative
  case employeeConstants.DEACTIVE_REQUEST:
    return {
      isDeactiving: true,
      employeeID: action.employeeID,
      ...state
    }
  case employeeConstants.DEACTIVE_SUCCESS:
    return {
      isDeactived: true,
      data: state.data.map(employee => employee.id === action.deactivedEmployee.id ? action.deactivedEmployee : employee)
    }
  case employeeConstants.DEACTIVE_FAILURE:
    return {
      ...state
    }

  //Active
  case employeeConstants.ACTIVE_REQUEST:
    return {
      isActiving: true,
      employeeID: action.employeeID,
      ...state
    }
  case employeeConstants.ACTIVE_SUCCESS:
    return {
      isActived: true,
      data: state.data.map(employee => employee.id === action.activedEmployee.id ? action.activedEmployee : employee),
    }
  case employeeConstants.ACTIVE_FAILURE:
    return {
      ...state
    }
  default:
    return state
  }
}