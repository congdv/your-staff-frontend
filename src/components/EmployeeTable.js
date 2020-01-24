import React, { useEffect } from "react"
import { Table, Button } from "react-bootstrap"
import { connect } from "react-redux"
import moment from "moment"

import employeeAction from "../actions/employee.action"

const EmployeeTable = (props) => {
  const employees = props.employees
  const hook = () => {
    props.getEmployees()
  }
  useEffect( hook,[])
  if(employees === undefined || employees.data === undefined) {
    return null
  }
  const deactive = (id) => {
    props.deactiveEmployee(id)
  }
  const active = (id) => {
    props.activeEmployee(id)
  }
  return (
    <div className="container">
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Employment Start Date</th>
            <th>Employment End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.data.map(
            staff =>
              <tr key={staff._id}>
                <td>{staff.firstName + " " +staff.lastName}</td>
                <td>{moment(staff.employmentStartDate).toDate().toDateString()}</td>
                <td>
                  {
                    !staff.isActive
                      ? moment(staff.employmentEndDate).toDate().toDateString()
                      : ""
                  }</td>
                <td>
                  {
                    staff.isActive
                      ? <>
                        <span>Working</span>
                        <Button style={{ float: "right" }} variant="danger" onClick={() => deactive(staff.id)}>Deactive</Button></>
                      : <>
                        <span>Not Working</span>
                        <Button style={{ float: "right" }} variant="primary" onClick={() => active(staff.id)}>Active</Button></>}</td>
              </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

const employeesToShow = (employees) => {
  if(employees === undefined || employees.data === undefined) {
    return employees
  }
  const newEmployees =  employees.data.sort((firstStaff, secondStaff) => {
    if(secondStaff.firstName > firstStaff.firstName) {
      return -1
    }
    if(secondStaff.firstName < firstStaff.firstName) {
      return 1
    }
    return 0
  })
  return {
    data: newEmployees,
    ...employees
  }
}
const mapStateToProps = (state) => {
  return {
    employees: employeesToShow(state.employees)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEmployees: () => {
      dispatch(employeeAction.fetchEmployees())
    },
    deactiveEmployee: (id) => {
      dispatch(employeeAction.deactiveEmployee(id))
    },
    activeEmployee: (id) => {
      dispatch(employeeAction.activeEmployee(id))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EmployeeTable)