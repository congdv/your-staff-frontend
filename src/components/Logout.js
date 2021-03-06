import React from "react"
import { NavDropdown } from "react-bootstrap"
import { connect } from "react-redux"
import userAction from "../actions/user.action"


const Logout = (props) => {
  const handleLogout = (event) => {
    event.preventDefault()
    props.logout()
    //history.push("/")
  }

  return (
    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(userAction.logout())
    }
  }
}

export default connect(null, mapDispatchToProps)(Logout)