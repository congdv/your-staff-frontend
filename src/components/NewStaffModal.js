import React, {useState} from "react"
import { Button, Modal} from "react-bootstrap"
import {connect} from "react-redux"
import { useField, useDate } from "../hooks"


import {newStaffAction} from "../reducers/staffReducer"
import NewStaffForm from "./NewStaffForm"

const NewStaffModal = (props) => {
  const [show, setShow] = useState(false)
  const firstName = useField("text")
  const lastName = useField("text")
  const selectedDate = useDate()

  const addNewStaff = async(event) => {
    event.preventDefault()
    const newStaff = {
      firstName: firstName.value,
      lastName: lastName.value,
      employmentStartDate: selectedDate.date
    }
    console.log("New Staff", newStaff)
    try {
      
      props.addNewStaff(newStaff)
      firstName.reset()
      lastName.reset()
      handleClose()
    }catch(exception) {
      console.log(exception)
    }

  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    <Button variant="primary" onClick={ handleShow } className="float-left">New Staff</Button>
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
          <Modal.Title>New Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewStaffForm firstName={firstName} lastName={lastName} handleSubmit={addNewStaff} handleClose={handleClose} selectedDate={selectedDate}/>
      </Modal.Body>
    </Modal>
   
    </>
  )
}
const mapDispatchToPros = (dispatch) => {
  return {
    addNewStaff: (newStaff) => {
      dispatch(newStaffAction(newStaff))
    }
  }
}

export default connect(null,mapDispatchToPros)(NewStaffModal)