import React, { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { useField } from "../hooks"
import Notification from "./Notification"
import { updateAction }  from "../reducers/loginReducer"
import userService from "../services/user"
import staffService from "../services/staffs"
import incomeOfStaffService from "../services/incomeOfStaff"

const notify = (message, type, setNotification) => {
  setNotification({ message,type })
  setTimeout(() => {
    setNotification({ message: undefined, type: undefined })
  }, 3000)
}


const UserProfileForm = (props) => {
  const name = useField("text",props.user.name)
  const oldPassword = useField("password")
  const newPassword = useField("password")
  const confirmationPassword = useField("password")
  const [user, setUser] = useState(props.user)
  const [notification, setNotification] = useState({ message: undefined, type: undefined })

  const hook = () => {
    props.updateUser(user)
  }
  useEffect(hook ,[])

  const handleOnSubmit = async (event) => {
    event.preventDefault()
    if(newPassword.value !== confirmationPassword.value) {
      notify("The new password and confirmation password are not match","danger",(value) => setNotification(value))
      return
    }
    try {
      const updatedUser = await userService.update({
        username:props.user.username,
        name: name.value,
        oldPassword : oldPassword.value,
        newPassword : newPassword.value,
        confirmationPassword: confirmationPassword.value
      })
      notify("Successfully update your information","success",(value) => setNotification(value))
      window.localStorage.setItem("userToken", JSON.stringify(updatedUser))
      staffService.setToken(updatedUser.token)
      incomeOfStaffService.setToken(updatedUser.token)
      setUser(updatedUser)
      oldPassword.reset()
      newPassword.reset()
      confirmationPassword.reset()
      reRender()
    } catch(exception) {
      notify(exception.error,"danger",(value) => setNotification(value))
    }

  }
  const reRender = () => {
    this.forceUpdate()
  }

  return (
    <>
      <Notification notification={notification}/>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control value={props.user.username} disabled/>

          <Form.Label>Name:</Form.Label>
          <Form.Control value={name.value} onChange={name.onChange} type={name.type} required/>

          <Form.Label>Old Password:</Form.Label>
          <Form.Control value={oldPassword.value} onChange={oldPassword.onChange} type={oldPassword.type} required/>
          <Form.Label>New Password:</Form.Label>
          <Form.Control value={newPassword.value} onChange={newPassword.onChange} type={newPassword.type} required/>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control value={confirmationPassword.value} onChange={confirmationPassword.onChange} type={confirmationPassword.type} required/>
        </Form.Group>
        <Form.Row className="justify-content-md-center">
          <Button variant="primary" type="submit">Submit</Button>
        </Form.Row>
      </Form>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => {
      dispatch(updateAction(user))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserProfileForm)