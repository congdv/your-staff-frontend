import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"

import loginReducer from "./reducers/loginReducer"
import staffReducer from "./reducers/staffReducer"
import currentDateReducer from "./reducers/selectedDateReducer"
import currentWeekReducer from "./reducers/selectedWeekReducer"
import incomeTotalReducer from "./reducers/incomeTotalReducer"


const appReducers = combineReducers({
  user: loginReducer,
  staff: staffReducer,
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