import React, { useState, useEffect, useRef } from "react"
import { Form, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { useField } from "../hooks"
import { updateAction }  from "../reducers/loginReducer"
import userAction from "../actions/user.action"
import alertAction from "../actions/alert.action"

const notify = (message, type, setNotification) => {
  setNotification({ message,type })
  setTimeout(() => {
    setNotification({ message: undefined, type: undefined })
  }, 3000)
}
const useInMounted = () => {
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    return () => (isMounted.current = false)
  },[isMounted])
  return isMounted
}

const UserProfileForm = (props) => {
  const name = useField("text",props.user.name)
  const oldPassword = useField("password")
  const newPassword = useField("password")
  const confirmationPassword = useField("password")
  const [user, setUser] = useState(props.user)
  const [notification, setNotification] = useState({ message: undefined, type: undefined })
  const { alert } = props

  const isMounted = useInMounted()
  const hook = () => {
    if(isMounted.current){
      props.updateUser(user)
    }
  }
  useEffect(hook ,[])

  const handleOnSubmit = async (event) => {
    event.preventDefault()
    if(newPassword.value !== confirmationPassword.value) {
      notify("The new password and confirmation password are not match","danger",(value) => setNotification(value))
      return
    }
    try {
      props.update({
        username:props.user.username,
        name: name.value,
        oldPassword : oldPassword.value,
        newPassword : newPassword.value,
        confirmationPassword: confirmationPassword.value
      })
      oldPassword.reset()
      newPassword.reset()
      confirmationPassword.reset()
    } catch(exception) {
      notify(exception.error,"danger",(value) => setNotification(value))
    }
    setTimeout(() => {
      props.clearAlert()
    }, 3000)
  }



  return (
    <div className="updateUser">
      { alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
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
    </div>
  )
}
const mapStateToProps = (state) => {
  const { user } = state.authentication
  return {
    user,
    alert: state.alert
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => {
      dispatch(updateAction(user))
    },
    update: (props) => {
      console.log(props)
      dispatch(userAction.update(props))
    },
    clearAlert: () => {
      dispatch(alertAction.clear())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserProfileForm)