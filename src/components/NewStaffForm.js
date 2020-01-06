import React from "react"
import {Form, Button} from "react-bootstrap"

const StaffForm = ({firstName, lastName, handleSubmit}) => {
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            value={firstName.value}
            type={firstName.type}
            onChange = {firstName.onChange}
            />
        </Form.Group>
        <Form.Label>Last Name:</Form.Label>
        <Form.Control
          value={lastName.value}
          type={lastName.type}
          onChange={lastName.onChange}/>
        <Button type="submit" >Create</Button>
      </Form>
    </div>
  )
}

export default StaffForm