import staffService from "../services/staffs"
import { employeeConstants } from "../constants/employee.constants"
import alertAction from "../actions/alert.action"

const fetchEmployees = () => {
  return async dispatch => {
    dispatch({ type: employeeConstants.FETCH_REQUEST })
    try {
      const employees = await staffService.getAll()
      dispatch({
        type:employeeConstants.FETCH_SUCCESS,
        employees
      })
    }catch(exception) {
      console.log(exception.error)
      dispatch({
        type: employeeConstants.FETCH_FAILURE,
        error: exception.error
      })
      dispatch(alertAction.error(exception.error))
    }
  }
}

const deactiveEmployee = (id) => {
  return async dispatch => {
    dispatch(
      {
        type: employeeConstants.DEACTIVE_REQUEST,
        employeeID: id
      })
    try {
      const deactivedEmployee = await staffService.deactiveStaff(id)
      dispatch({
        type: employeeConstants.DEACTIVE_SUCCESS,
        deactivedEmployee
      })
    } catch (exception) {
      console.log(exception.error)
      dispatch({
        type: employeeConstants.DEACTIVE_FAILURE,
        error: exception.error
      })
      dispatch(alertAction.error(exception.error))
    }
  }
}

const activeEmployee = (id) => {
  return async dispatch => {
    dispatch(
      {
        type: employeeConstants.ACTIVE_REQUEST,
        employeeID: id
      })
    try {
      const activedEmployee = await staffService.activeStaff(id)
      dispatch({
        type: employeeConstants.ACTIVE_SUCCESS,
        activedEmployee
      })
    } catch (exception) {
      console.log(exception.error)
      dispatch({
        type: employeeConstants.ACTIVE_FAILURE,
        error: exception.error
      })
      dispatch(alertAction.error(exception.error))
    }
  }
}


const deleteEmployee = (id) => {
  return async dispatch => {
    dispatch (
      {
        type: employeeConstants.DELETE_REQUEST,
        employeeID: id
      }
    )
    try {
      const deletedEmployee = await staffService.deleteStaff(id)
      dispatch({
        type: employeeConstants.DELETE_SUCCESS,
        deletedEmployee
      })
    }catch (exception) {
      console.log(exception)
      dispatch({
        type: employeeConstants.DELETE_FAILURE,
        error: exception.error
      })
      dispatch(alertAction.error(exception.error))
    }
  }
}

const updateEmployee = (staff) => {
  return async dispatch => {
    dispatch({
      type: employeeConstants.UPDATE_REQUEST,
    })
    try {
      const updatedEmployee = await staffService.updateStaff(staff)
      dispatch(
        {
          type: employeeConstants.UPDATE_SUCCESS,
          updatedEmployee
        }
      )
    }catch (exception) {
      console.log(exception)
      dispatch( {
        type: employeeConstants.UPDATE_FAILURE,
        error: exception.error
      })
      dispatch(alertAction.error(exception.error))
    }
  }
}

export default { fetchEmployees,deactiveEmployee, activeEmployee, deleteEmployee, updateEmployee }