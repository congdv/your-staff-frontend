import React from "react"
import { Form, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { useField } from "../hooks"
import userAction from "../actions/user.action"
import alertAction from "../actions/alert.action"


const UserProfileForm = (props) => {
  const name = useField("text",props.user.name)
  const oldPassword = useField("password")
  const newPassword = useField("password")
  const confirmationPassword = useField("password")
  const { alert } = props

  const handleOnSubmit = async (event) => {
    event.preventDefault()
    if(newPassword.value !== confirmationPassword.value) {
      props.errorAlert("The new password and confirmation password are not match")
      setTimeout(() => {
        props.clearAlert()
      }, 3000)
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
      props.successAlert("Successfully update your information")
    } catch(exception) {
      props.errorAlert(exception.error)
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
    update: (props) => {
      dispatch(userAction.update(props))
    },
    clearAlert: () => {
      dispatch(alertAction.clear())
    },
    errorAlert: (message) => {
      dispatch(alertAction.error(message))
    },
    successAlert: (message) => {
      dispatch(alertAction.success(message))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserProfileForm)