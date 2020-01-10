import React from "react"
import {Form, Button, Row, Col} from "react-bootstrap"
import DatePicker from "react-datepicker"


const StaffForm = ({firstName, lastName, handleSubmit, handleClose, selectedDate}) => {

  return (
    <>
      <Form onSubmit={handleSubmit}>
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
            <div className="float-right">
              <Button onClick={handleClose} className="mr-3"> Cancel</Button>
              <Button type="submit">Create</Button>
            </div>
            

        </Form.Group>
        </Form>
    </>
  )
}

export default StaffForm