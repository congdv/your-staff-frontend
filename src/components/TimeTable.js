import React, { useEffect } from "react"
import Moment from "react-moment"
import { Table } from "react-bootstrap"
import { connect } from "react-redux"
import moment from "moment"

import IncomeModal from "./IncomeModal"
import staffAction from "../actions/staff.action"

const getIncomeOfDay = (day, incomeOfDays,staff) => {
  let total = "$0"
  let amounts = []
  if(incomeOfDays !== undefined){
    const incomeOfDay = incomeOfDays.find(incomePerDay => moment(incomePerDay.date).isSame(day,"day"))
    if(incomeOfDay && incomeOfDay.amounts) {
      total = `$${incomeOfDay.amounts.reduce((a,b) => a+b,0)}`
      amounts = incomeOfDay.amounts
      return (
        <>
          <span>{total}</span>
          <IncomeModal amounts={amounts} day={day} staff={staff}/>
        </>)
    }
  }
  return (
    <>
      <span>{total}</span>
      <IncomeModal amounts={amounts} day={day} staff={staff}/>
    </>)
}

const TimeTable = (props) => {
  const { staffs } = props
  console.log(staffs,"timetable")
  const hook = () => {
    props.getStaffs(props.date)
  }
  useEffect(hook,[])

  if(staffs.data === undefined) {
    return null
  }


  const getTotalFrom = (staff, week) => {
    let total = 0
    week.forEach(weekday => {
      const incomeOfDay = staff.incomeOfDays.find(incomePerDay => moment(incomePerDay.date).isSame(weekday,"day"))
      if(incomeOfDay && incomeOfDay.amounts) {
        total += incomeOfDay.amounts.reduce((a,b) => a+b,0)
      }
    })
    return total
  }

  return (
    <div className="mt-3">
      <Table bordered responsive >
        <thead className="thead-light">
          <tr>
            <th >Staff</th>
            {
              props.week.map(day =>
                <th key={day} style={{ width:"10%" }}>
                  <span ><Moment format="dddd">{day}</Moment></span><br/>
                  <Moment format="MMM Do">{day}</Moment>
                </th>
              )
            }
            <th>Total Incomes</th>
          </tr>
        </thead>
        <tbody>
          {
            staffs.data.map(
              staff => (
                <tr key={staff._id}>
                  <td >{staff.firstName + " " +staff.lastName}</td>
                  {props.week.map(day => {
                    if(moment(day).isSame(new Date(),"day")) {
                      return (
                        <td key={day} style={{ backgroundColor:"#e9ecef", color:"#000" }}>
                          {getIncomeOfDay(day, staff.incomeOfDays,staff)}
                        </td>
                      )
                    }
                    return (
                      <td key={day}>
                        {getIncomeOfDay(day, staff.incomeOfDays,staff)}
                      </td>
                    )
                  }
                  )}
                  <td> $
                    {
                      getTotalFrom(staff,props.week)
                    }
                  </td>
                </tr>
              )
            )
          }
        </tbody>
      </Table>
      <div style={{ textAlign: "center" }}>
        {
          staffs.isFetching &&
          <span><img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /></span>
        }
        {
          staffs.isAdding &&
          <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        }
      </div>
    </div>
  )
}

const staffsToShow = (staffs) => {
  if(staffs === undefined || staffs.data === undefined) {
    return staffs
  }
  console.log({ ...staffs },"sorted")
  const sortedStaffs =  staffs.data.sort((firstStaff, secondStaff) => {
    if(secondStaff.firstName > firstStaff.firstName) {
      return -1
    }
    if(secondStaff.firstName < firstStaff.firstName) {
      return 1
    }
    return 0
  })
  return {
    data: sortedStaffs,
    ...staffs
  }
}

const mapStateToProps = (state) => {
  return {
    date: state.date,
    week: state.week,
    staffs: staffsToShow(state.staffs)
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getStaffs: (date) => {
      dispatch(staffAction.getStaffs(date))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TimeTable)