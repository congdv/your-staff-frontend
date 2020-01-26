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

  case employeeConstants.DELETE_REQUEST:
    return {
      isDeleting: true,
      employeeID: action.employeeID,
      ...state
    }
  case employeeConstants.DELETE_SUCCESS:
    return {
      isDeleted: true,
      data: state.data.filter(employee => employee.id !== action.deletedEmployee.id)
    }
  case employeeConstants.DELETE_FAILURE:
    return {
      ...state
    }

  // update employee
  case employeeConstants.UPDATE_REQUEST:
    return {
      isUpdating:true,
      data: state.data
    }
  case employeeConstants.UPDATE_SUCCESS:
    return {
      isUpdated: true,
      data: state.data.filter(employee => employee.id !== action.updatedEmployee.id).concat(action.updatedEmployee)
    }
  case employeeConstants.UPDATE_FAILURE:
    return {
      ...state
    }
  default:
    return state
  }
}