import React from "react"
import { connect } from "react-redux"

import LoginForm from "./LoginForm"
import { useField } from "../hooks"

import userAction from "../actions/user.action"
import alertAction from "../actions/alert.action"
import { Redirect } from "react-router-dom"

const Login = (props) => {
  const username = useField("text")
  const password = useField("password")
  const { alert } = props
  console.log(props.authentication)
  const handleLogin = async(event) => {
    event.preventDefault()
    if(username && password) {
      props.login(username.value, password.value)
    }
    setTimeout(() => {
      props.clearAlert()
    }, 3000)
  }

  return (
    <>
      {props.authentication.loggedIn ?
        <Redirect to="/"/> :
        <div className="container">
          { alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
          <div className="login">
            <p className="login-title">Your Staff</p>
            <LoginForm md="auto"
              username={username}
              password={password}
              handleSubmit={handleLogin}
              authentication={props.authentication}/>
          </div>
        </div>
      }
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    authentication : state.authentication,
    alert: state.alert
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => {
      dispatch(userAction.login(username,password))
    },
    clearAlert: () => {
      dispatch(alertAction.clear())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)