import React, { useEffect } from "react"
import { Table, Button } from "react-bootstrap"
import { connect } from "react-redux"
import moment from "moment"
import StaffModal from "./StaffModal"

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
  const deleteStaff = (id) => {
    props.deleteEmployee(id)
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
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.data.map(
            employee =>
              <tr key={employee._id}>
                <td><StaffModal isUpdating={true} employee={employee}/></td>
                <td style={{ paddingTop:"22px" }}>{moment(employee.employmentStartDate).toDate().toDateString()}</td>
                <td style={{ paddingTop:"22px" }}>
                  {
                    !employee.isActive
                      ? moment(employee.employmentEndDate).toDate().toDateString()
                      : ""
                  }</td>
                {
                  employee.isActive
                    ? <>
                      <td style={{ paddingTop:"22px" }}>Working</td>
                      <td>
                        <span>
                          {
                            (employees.isDeactiving || employees.isActiving) && employees.employeeID === employee.id &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                              style={{ margin: "5px auto" }} alt="loading"/>
                          }
                        </span>
                        <Button style={{ float: "right" }} variant="danger" onClick={() => deactive(employee.id)}>Deactive</Button>
                      </td>
                    </>
                    : <>
                      <td style={{ paddingTop:"22px" }} >Not Working</td>
                      <td>
                        <span>
                          {
                            (employees.isDeactiving || employees.isActiving) && employees.employeeID === employee.id &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                              style={{ margin: "5px auto" }} alt="loading"/>
                          }
                        </span>
                        <Button style={{ float: "right" }} variant="primary" onClick={() => active(employee.id)}>Active</Button>
                      </td>
                    </>
                }
                <td>
                  {
                    employees.isDeleting && employees.employeeID === employee.id &&
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                      style={{ margin: "5px auto" }} alt="loading"/>
                  }
                  <Button style={{ float: "right" }} variant="danger" onClick={() => deleteStaff(employee.id)}>Delete</Button>
                </td>
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
    },
    deleteEmployee: (id) => {
      dispatch(employeeAction.deleteEmployee(id))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EmployeeTable)