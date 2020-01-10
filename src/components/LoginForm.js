import React from "react"
import { Form, Button } from "react-bootstrap"

const LoginForm = ({
  handleSubmit,
  username,
  password
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control value={username.value}
          type={username.type}
          onChange={username.onChange}/>

        <Form.Label>Password:</Form.Label>
        <Form.Control
          value={password.value}
          type={password.type}
          onChange={password.onChange}/>
      </Form.Group>
      <Form.Row className="justify-content-md-center">
        <Button variant="primary" type="submit">Login</Button>
      </Form.Row>
    </Form>
  )
}

export default LoginForm