import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import loginReducer from "./reducers/loginReducer"
import staffReducer from "./reducers/staffReducer"
import currentDateReducer from "./reducers/selectedDateReducer"
import currentWeekReducer from "./reducers/selectedWeekReducer"
import incomeTotalReducer from "./reducers/incomeTotalReducer"
import { authentication } from "./reducers/authentication.reducer"
import { alert } from "./reducers/alert.reducer"
import { staffs } from "./reducers/staff.reducer"


const appReducers = combineReducers({
  alert,
  authentication,
  user: loginReducer,
  staff: staffReducer,
  staffs, // latest one
  date: currentDateReducer,
  week: currentWeekReducer,
  totals: incomeTotalReducer
})

const rootReducers = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined
  }
  return appReducers(state, action)
}

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)))

export default store