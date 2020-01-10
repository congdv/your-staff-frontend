import React from "react"
import {NavDropdown} from "react-bootstrap"
import {connect} from "react-redux"


import { loginAction, logoutAction } from "../reducers/loginReducer"

const Logout = (props) => {
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem("userToken")
    props.login(null)
    props.logout()
  }

  return (
      <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => {
      dispatch(loginAction(user))
    },
    logout: () => {
      dispatch(logoutAction())
    }
  }
}

export default connect(null, mapDispatchToProps)(Logout)