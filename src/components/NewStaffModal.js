import React, { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { connect } from "react-redux"
import { useField, useDate } from "../hooks"


import NewStaffForm from "./NewStaffForm"
import staffAction from "../actions/staff.action"

const NewStaffModal = (props) => {
  const [show, setShow] = useState(false)
  const firstName = useField("text")
  const lastName = useField("text")
  const percent = useField("number")
  const [validated, setValidated] = useState(false)
  const selectedDate = useDate()

  const addNewStaff = async(event) => {
    event.preventDefault()
    if(isNaN(percent.value) || percent.value === ""){
      setValidated(true)
      return
    }
    setValidated(false)
    const newStaff = {
      firstName: firstName.value,
      lastName: lastName.value,
      employmentStartDate: selectedDate.date,
      percentageIncome: Number(percent.value)
    }
    try {

      props.addStaff(newStaff)
      firstName.reset()
      lastName.reset()
      handleClose()
    }catch(exception) {
      console.log(exception)
    }

  }

  const handleClose = () => {
    setShow(false)
    firstName.reset()
    lastName.reset()
    percent.reset()
    setValidated(false)
  }
  const handleShow = () => setShow(true)
  return (
    <>
      <Button variant="primary" onClick={ handleShow } className="float-left">New Staff</Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewStaffForm firstName={firstName} lastName={lastName}
            handleSubmit={addNewStaff} handleClose={handleClose}
            selectedDate={selectedDate} percent={percent}
            validated={validated}/>
        </Modal.Body>
      </Modal>

    </>
  )
}
const mapDispatchToPros = (dispatch) => {
  return {
    addStaff: (staff) => {
      dispatch(staffAction.addStaff(staff))
    }
  }
}

export default connect(null,mapDispatchToPros)(NewStaffModal)