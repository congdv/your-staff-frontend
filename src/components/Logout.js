import React from "react"
import {Button} from "react-bootstrap"
import {connect} from "react-redux"

import { loginAction } from "../reducers/loginReducer"

const Logout = (props) => {
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem("userToken")
    props.login(null)
  }

  return (
    <div>
      <Button variant="primary" onClick={handleLogout}>Log out</Button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => {
      dispatch(loginAction(user))
    }
  }
}

export default connect(null, mapDispatchToProps)(Logout)