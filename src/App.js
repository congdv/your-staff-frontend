import React, { useEffect} from 'react';
import {connect} from "react-redux"

import staffService from "./services/staffs"
import incomeOfStaffService from "./services/incomeOfStaff"
import TimeTable from "./components/TimeTable";
import Login from "./components/Login"
import Logout from './components/Logout';
import NewStaff from './components/NewStaff';

import {loginAction} from "./reducers/loginReducer"
import {initializeStaffsAction} from "./reducers/staffReducer"
import DateOfWeek from "./components/DateOfWeek"

const App = (props) => {

  const hook = () => {
    const loggedUserJSON = window.localStorage.getItem("userToken")
    if(loggedUserJSON) {
      props.allStaffs()
      const user = JSON.parse(loggedUserJSON)
      staffService.setToken(user.token)
      incomeOfStaffService.setToken(user.token)
      props.login(user)
    }
  }
  useEffect(hook, [])
  console.log(props)
  return (
    <div>
      {!props.user ?  <Login/> : 
        <div>
          <Logout/>
          <NewStaff/>
          <div>
            <DateOfWeek/>
          </div>
          <TimeTable/>
        </div>
      }
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    allStaffs : () => {
      dispatch(initializeStaffsAction())
    },
    login: (user) => {
      dispatch(loginAction(user))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
