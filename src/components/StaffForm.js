import React from "react"
import { Form, Button,InputGroup } from "react-bootstrap"
import DatePicker from "react-datepicker"


const StaffForm = ({ firstName, lastName, handleSubmit, handleClose, selectedDate, percent, validated, isUpdating }) => {
  return (
    <>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Group>
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            value={firstName.value}
            type={firstName.type}
            onChange = {firstName.onChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            value={lastName.value}
            type={lastName.type}
            onChange={lastName.onChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Employment Start Date:</Form.Label>
          <Form.Row>
            <div className="datepickerWrap">
              <DatePicker
                todayButton="Today"
                selected={selectedDate.date}
                className="form-control"
                onChange= {(date) => selectedDate.selectingDate(date)}
                dateFormat="MMMM dd, yyyy"/>
            </div>
          </Form.Row>
        </Form.Group>
        <Form.Group>
          <Form.Label>Percentage Income:</Form.Label>
          <InputGroup>
            <Form.Control
              type="number"
              name="Percent"
              value={percent.value}
              onChange={percent.onChange}
              required/>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">%</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control.Feedback type="invalid">
              Please provide a valid number.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <div className="float-right">
            <Button onClick={handleClose} className="mr-3"> Cancel</Button>
            <Button type="submit">{ isUpdating ? "Update" : "Create" }</Button>
          </div>
        </Form.Group>
      </Form>
    </>
  )
}

export default StaffForm