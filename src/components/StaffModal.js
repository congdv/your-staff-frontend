import React, { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { connect } from "react-redux"
import { useField, useDate } from "../hooks"


import StaffForm from "./StaffForm"
import staffAction from "../actions/staff.action"
import employeeAction from "../actions/employee.action"
import moment from "moment"

const StaffModal = (props) => {
  const { isUpdating, employee } = props
  const [show, setShow] = useState(false)
  const firstName = useField("text", isUpdating? employee.firstName : "")
  const lastName = useField("text", isUpdating ? employee.lastName : "")
  const percent = useField("number", isUpdating ? employee.percentageIncome: "")
  const [validated, setValidated] = useState(false)
  const selectedDate = useDate(isUpdating? moment(employee.employmentStartDate).toDate() : new Date())

  const addNewStaff = () => {
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
      selectedDate.reset()
      handleClose()
    }catch(exception) {
      console.log(exception)
    }
  }
  const updateEmployee = () => {
    const toUpdateStaff = {
      ...employee,
      firstName: firstName.value,
      lastName: lastName.value,
      employmentStartDate: selectedDate.date,
      percentageIncome: Number(percent.value),
    }
    try {
      props.updateEmployee(toUpdateStaff)
      handleClose()
    } catch(exception) {
      console.log(exception)
    }
  }
  const handleSubmit = async(event) => {
    event.preventDefault()
    if(isNaN(percent.value) || percent.value === ""){
      setValidated(true)
      return
    }
    setValidated(false)
    if(!isUpdating) {
      addNewStaff()
    } else {
      updateEmployee()
    }
  }

  const handleClose = () => {
    setShow(false)
    if(!isUpdating) {
      firstName.reset()
      lastName.reset()
      percent.reset()
      selectedDate.reset()
    }
    setValidated(false)
  }
  const handleShow = () => setShow(true)
  return (
    <>
      {
        !isUpdating
          ? <Button variant="primary" onClick={ handleShow } className="float-left">New Staff</Button>
          : <Button variant="link" onClick={ handleShow }>{ employee.firstName +" "+ employee.lastName }</Button>
      }
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{ isUpdating ? "Update Staff" : "New Staff"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StaffForm firstName={firstName} lastName={lastName}
            handleSubmit={handleSubmit} handleClose={handleClose}
            selectedDate={selectedDate} percent={percent}
            validated={validated} isUpdating={isUpdating}  />
        </Modal.Body>
      </Modal>

    </>
  )
}
const mapDispatchToPros = (dispatch) => {
  return {
    addStaff: (staff) => {
      dispatch(staffAction.addStaff(staff))
    },
    updateEmployee: (employee) => {
      dispatch(employeeAction.updateEmployee(employee))
    }
  }
}

export default connect(null,mapDispatchToPros)(StaffModal)