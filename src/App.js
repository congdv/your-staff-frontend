import React, { useEffect, useState,useRef } from "react"
import { connect } from "react-redux"

import staffService from "./services/staffs"
import incomeOfStaffService from "./services/incomeOfStaff"
import Login from "./components/Login"

import { loginAction } from "./reducers/loginReducer"
import { getAllActiveStaffsAction } from "./reducers/staffReducer"
import SideBar from "./components/SideBar"


const Header = () => {
  return (
    <>
      {/* <NavBar/> */}
      <SideBar/>
    </>
  )
}
const useInMounted = () => {
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    return () => (isMounted.current = false)
  },[isMounted])
  return isMounted
}

const App = (props) => {
  const [user,setUser] = useState(null)
  const isMounted = useInMounted()
  const hook = () => {
    const loggedUserJSON = window.localStorage.getItem("userToken")
    if(loggedUserJSON) {

      const user = JSON.parse(loggedUserJSON)
      staffService.setToken(user.token)
      incomeOfStaffService.setToken(user.token)
      props.login(user)
      setUser(user)
    } else {
      if(props.user) {
        setUser(props.user)
      }
    }
  }
 
  useEffect(hook ,[])
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
