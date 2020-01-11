import React, { useState, useEffect } from "react"
import { Table, Button, Form, Row, Col, InputGroup , Modal } from "react-bootstrap"
import { connect } from "react-redux"
import { FaEdit } from "react-icons/fa"

import { updateIncomeOfStaffAction, addNewIncomeOfStaffAction } from "../reducers/staffReducer"
import { updateIncomesTotalLocalAction } from "../reducers/incomeTotalReducer"

const AmountsTable = (props) => {
  const removeAmount = (index) => {
    props.setToAmounts(props.amounts.filter((_, i) => i !== index))
  }
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          props.amounts.map((amount, index) =>
            <tr key={index}>
              <td>{index + 1}</td>
              <td>${amount}</td>
              <td><Button variant="outline-danger" onClick={() => removeAmount(index)}>Remove</Button></td>
            </tr>
          )
        }
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>${props.amounts.reduce((a,b) => a+b,0)}</td>
          <td></td>
        </tr>
      </tfoot>
    </Table>
  )
}

const IncomeModal = (props) => {
  const [show, setShow] = useState(false)
  const [amount, setAmount] = useState("")
  const [amounts, setAmounts] = useState(props.amounts)
  const [validated, setValidated] = useState(false)

  useEffect(() => setAmounts(props.amounts),[props.amounts])
  const addAmount = () => {
    if(isNaN(amount) || amount === ""){
      setValidated(true)
      return
    }
    setValidated(false)
    setAmounts(amounts.concat(Number(amount)))

    const data = {
      date: props.day,
      amount: amount
    }

    props.addNewIcomeOfStaff(props.staff._id,data)
    props.updateTotalIncomes(props.staff, amount, props.date)
    setAmount("")

  }

  const setToAmounts = (value) => {
    //Get total before removing
    const beforeRemovingTotal = amounts.reduce((a,b) => a + b, 0)
    //Get total after removing
    const afterRemovingTotal = value.reduce((a,b) => a + b, 0)
    //Get different to compare
    const differentTotal = afterRemovingTotal - beforeRemovingTotal // Expected to negative number

    setAmounts(value)
    const data = {
      date: props.day,
      amounts: value,
    }
    props.updateIncomeOfStaff(props.staff._id, data)
    props.updateTotalIncomes(props.staff, differentTotal, props.date)
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      <button className="icon-btn float-right" onClick={ handleShow } ><FaEdit/></button>
      <Modal show={show} onHide={handleClose} centered>

        <Modal.Header closeButton>
          <Modal.Title>Income</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated}>
            <Form.Group controlId="validationCustom02">
              <Form.Label>Earned:</Form.Label>
              <Row>
                <Col sm={9}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="number"
                      name="amount"
                      value={amount}
                      onChange={({ target }) => setAmount(target.value)}
                      required/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid number.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Col>
                <Col sm={3}><Button variant="primary" onClick={addAmount}>Add</Button></Col>
              </Row>
            </Form.Group>
          </Form>
          <AmountsTable amounts={amounts} setToAmounts={(value) => setToAmounts(value)}/>
        </Modal.Body>

      </Modal>
    </>
  )
}

const mapStateToPros = (state) => {
  return {
    date: state.date,
    staffs: state.staff
  }
}

const mapDispatchToPros = (dispatch) => {
  return {
    updateIncomeOfStaff: (id, data) => {
      dispatch(updateIncomeOfStaffAction(id,data))
    },
    addNewIcomeOfStaff: (id, data) => {
      dispatch(addNewIncomeOfStaffAction(id,data))
    },
    updateTotalIncomes: (staff, amount,date) => {
      dispatch(updateIncomesTotalLocalAction(staff, amount, date))
    }
  }
}

export default connect(mapStateToPros,mapDispatchToPros)(IncomeModal)