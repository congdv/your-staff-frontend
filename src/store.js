import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import currentDateReducer from "./reducers/selectedDateReducer"
import currentWeekReducer from "./reducers/selectedWeekReducer"
import { authentication } from "./reducers/authentication.reducer"
import { alert } from "./reducers/alert.reducer"
import { staffs } from "./reducers/staff.reducer"
import { employees } from "./reducers/employee.reducer"


const appReducers = combineReducers({
  alert,
  authentication,
  employees,
  staffs, // latest one
  date: currentDateReducer,
  week: currentWeekReducer,
})

const rootReducers = (state, action) => {
  return appReducers(state, action)
}

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)))

export default store