import incomeService from "../services/incomeOfStaff"
import { incomeConstants } from "../constants/income.constants"
import alertAction from "../actions/alert.action"

const addIncome = (id, data) => {
  return async dispatch => {
    dispatch({
      type: incomeConstants.ADD_REQUEST
    })
    try {
      const addedIncome = await incomeService.create(id,data)
      dispatch({
        type: incomeConstants.ADD_SUCCESS,
        data: addedIncome
      })
    }catch(exception) {
      console.log(exception.error)
      dispatch({
        type: incomeConstants.ADD_FAILURE,
        error: exception.error
      })
      dispatch(alertAction.error(exception.error))
    }
  }
}

const removeIncome = (id, data) => {
  return async dispatch => {
    dispatch({
      type: incomeConstants.REMOVE_REQUEST
    })
    try {
      const removedIncome = await incomeService.update(id,data)
      dispatch({
        type: incomeConstants.REMOVE_SUCCESS,
        data: removedIncome
      })
    }catch(exception) {
      console.log(exception.error)
      dispatch({
        type: incomeConstants.REMOVE_FAILURE,
        error: exception.error
      })
      dispatch(alertAction.error(exception.error))
    }
  }
}

export default { addIncome, removeIncome }