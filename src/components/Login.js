import React,{ useState } from "react"
import { connect } from "react-redux"

import loginService from "../services/login"
import LoginForm from "./LoginForm"
import { useField } from "../hooks"
import staffService from "../services/staffs"
import incomeOfStaffService from "../services/incomeOfStaff"
import { loginAction } from "../reducers/loginReducer"
import Notification from "../components/Notification"

const Login = (props) => {
  const username = useField("text")
  const password = useField("password")
  const [notification, setNotification] = useState({ message: undefined, type: undefined })

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
      setNotification({ message:"wrong username or password", type:"danger" })
      setTimeout(() => {
        setNotification({ message: undefined, type: undefined })
      }, 3000)
    }
  }

  return (
    <div className="container">
      <Notification notification={notification}/>
      <div className="login">
        <p className="login-title">Your Staff</p>
        <LoginForm md="auto"
          username={username}
          password={password}
          handleSubmit={handleLogin}/>
      </div>
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