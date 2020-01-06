import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"

import loginReducer from "./reducers/loginReducer"
import staffReducer from "./reducers/staffReducer"
import currentDateReducer from "./reducers/selectedDateReducer"
import currentWeekReducer from "./reducers/selectedWeekReducer"


const reducers = combineReducers({
  user: loginReducer,
  staff: staffReducer,
  date: currentDateReducer,
  week: currentWeekReducer
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store