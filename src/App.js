import React, { useEffect } from "react"
import { connect } from "react-redux"

import staffService from "./services/staffs"
import incomeOfStaffService from "./services/incomeOfStaff"
import Login from "./components/Login"
import NavBar from "./components/NavBar"

import { loginAction } from "./reducers/loginReducer"
import { getAllActiveStaffsAction } from "./reducers/staffReducer"
import SideBar from "./components/SideBar"


const Header = () => {
  return (
    <>
      <NavBar/>
      <SideBar/>
    </>
  )
}


const App = (props) => {

  const hook = () => {
    const loggedUserJSON = window.localStorage.getItem("userToken")
    if(loggedUserJSON) {

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
        <>
          <Header/>
        </>
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
    allActiveStaffs : () => {
      dispatch(getAllActiveStaffsAction())
    },
    login: (user) => {
      dispatch(loginAction(user))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
