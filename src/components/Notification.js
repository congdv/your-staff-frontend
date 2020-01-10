import React from "react"
import {Alert} from "react-bootstrap"

const Notification = (props) => {
  const notification = props.notification

  if(notification.message === undefined || notification.message === "") {
    return null
  }
  return (
  <div> {notification.message && <Alert variant={notification.type}>{notification.message}</Alert>}</div>
  )
}

export default Notification