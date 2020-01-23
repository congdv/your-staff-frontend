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
      console.log(addedIncome,"addedIncome")
      dispatch({
        type: incomeConstants.ADD_SUCCESS,
        addedIcome: addedIncome
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

export default { addIncome }