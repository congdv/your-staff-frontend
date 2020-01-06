import React from "react"
import {connect} from "react-redux"

import loginService from "../services/login"
import LoginForm from "./LoginForm"
import { useField } from "../hooks"
import staffService from "../services/staffs"
import incomeOfStaffService from "../services/incomeOfStaff"
import { loginAction } from "../reducers/loginReducer"

const Login = (props) => {
  const username = useField("text")
  const password = useField("password")

  const handleLogin = async(event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      window.localStorage.setItem("userToken", JSON.stringify(user))
      staffService.setToken(user.token)
      incomeOfStaffService.setToken(user.token)
      props.login(user)
    }catch(exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <LoginForm 
      username={username}
      password={password}
      handleSubmit={handleLogin}/>
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
export default connect(null, mapDispatchToProps)(Login)