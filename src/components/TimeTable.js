import React, { useEffect } from "react"
import Moment from "react-moment"
import { Table } from "react-bootstrap"
import { connect } from "react-redux"
import moment from "moment"

import IncomeModal from "./IncomeModal"
import { updateDisplayStaffsAction, getAllActiveStaffsAction } from "../reducers/staffReducer"
import { initializeIncomesTotalAction } from "../reducers/incomeTotalReducer"

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

  const hook = () => {
    props.allActiveStaffs()
    props.fetchedStaffs(props.date)
    props.initIncomesTotal(props.date)
  }
  useEffect(hook,[])

  if(props.allStaffs === undefined) {
    return null
  }

  const getTotalOfStaff = (staff) => {
    const totals = props.totals.find(totalOfstaff => totalOfstaff._id === staff._id)
    if(totals) {
      return totals.totalOfWeek
    }
    return 0
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
            props.allStaffs.map(
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
                      getTotalOfStaff(staff)
                    }
                  </td>
                </tr>
              )
            )
          }
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
    allStaffs:staffsToShow(state.staff),
    date: state.date,
    week: state.week,
    totals: state.totals
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    allActiveStaffs : () => {
      dispatch(getAllActiveStaffsAction())
    },
    fetchedStaffs: (date) => {
      dispatch(updateDisplayStaffsAction(date))
    },
    initIncomesTotal: (date) => {
      dispatch(initializeIncomesTotalAction(date))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TimeTable)