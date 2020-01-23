import React, { useState, useEffect } from "react"
import { Table, Button, Form, Row, Col, InputGroup , Modal } from "react-bootstrap"
import { connect } from "react-redux"
import { FaEdit } from "react-icons/fa"

import incomeAction from "../actions/income.action"

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
    if(isNaN(amount) || amount === "" || Number(amount) <= 0){
      setValidated(true)
      return
    }
    setValidated(false)
    setAmounts(amounts.concat(Number(amount)))

    const data = {
      date: props.day,
      amount: amount
    }

    props.addIncome(props.staff._id,data)
    setAmount("")

  }

  const setToAmounts = (value) => {
    setAmounts(value)
    const data = {
      date: props.day,
      amounts: value,
    }
    props.removeIncome(props.staff._id, data)
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
    addIncome: (id, data) => {
      dispatch(incomeAction.addIncome(id,data))
    },
    removeIncome: (id, data) => {
      dispatch(incomeAction.removeIncome(id,data))
    }
  }
}

export default connect(mapStateToPros,mapDispatchToPros)(IncomeModal)