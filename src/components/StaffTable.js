import React, { useEffect } from "react"
import { Table, Button } from "react-bootstrap"
import {connect} from "react-redux"
import moment from "moment"

import {initializeStaffsAction, deactiveStaffAction, activeStaffAction} from "../reducers/staffReducer"

const StaffTable = (props) => {
  const hook = () => {
    props.allStaffs()
  }
  useEffect( hook,[])
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
          {props.staffs.map(
            staff => 
            <tr key={staff._id}>
              <td>{staff.firstName + " " +staff.lastName}</td>
              <td>{moment(staff.employmentStartDate).toDate().toDateString()}</td>
              <td>{!staff.isActive ? moment(staff.employmentEndDate).toDate().toDateString(): ""}</td>
              <td>{staff.isActive ? <><span>Working</span> <Button style={{float: "right"}} variant="danger" onClick={() => props.deactiveStaff(staff._id)}>Deactive</Button></> 
                  : <> <span>Not Working</span><Button style={{float: "right"}} variant="primary" onClick={() => props.activeStaff(staff._id)}>Active</Button></>}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

const staffsToShow = (staffs) => {
  if(staffs === undefined) {
    return staffs
  }
  const newStaffs =  staffs.sort((firstStaff, secondStaff) => {
    if(secondStaff.firstName > firstStaff.firstName) {
      return -1
    }
    if(secondStaff.firstName < firstStaff.firstName) {
      return 1
    }
    return 0
  })
  return newStaffs
}
const mapStateToProps = (state) => {
  return {
    staffs: staffsToShow(state.staff)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    allStaffs : () => {
      dispatch(initializeStaffsAction())
    },
    deactiveStaff: (id) => {
      dispatch(deactiveStaffAction(id))
    },
    activeStaff: (id) => {
      dispatch(activeStaffAction(id))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(StaffTable)