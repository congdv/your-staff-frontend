import React, { useState, useEffect } from "react"
import Moment from "react-moment"
import {Table} from "react-bootstrap"
import {connect} from "react-redux"
import moment from "moment"

import IncomeModal from "./IncomeModal"
import {updateDisplayStaffsAction} from "../reducers/staffReducer"

const generateDaysOfWeek = (day) => {
  let week = []
  let today = day
  today.setDate(today.getDate() - today.getDay() + 1)
  for(let day = 0; day < 7; day++) {
    week.push(new Date(today))
    //Move next day
    today.setDate(today.getDate() + 1)
  }

  return week
}

const getIncomeOfDay = (day, incomeOfDays,staff) => {
  let total = "$0"
  let amounts = []
  if(incomeOfDays !== undefined){
    const incomeOfDay = incomeOfDays.find(incomePerDay => moment(incomePerDay.date).isSame(day,"day"))
    if(incomeOfDay) {
          total = `$${incomeOfDay.amounts.reduce((a,b)=> a+b,0)}`
          amounts = incomeOfDay.amounts
    }
  }
  return (
  <>
    {total}
    <IncomeModal amounts={amounts} day={day} staff={staff}/>
  </>)
}

const TimeTable = (props) => {
  const [days, setDays] = useState(generateDaysOfWeek(props.date))

  const hook = () => {
    props.fetchedStaffs()
  }
  useEffect(hook,[])

  if(props.allStaffs === undefined) {
    return null
  }

  console.log("Time week",props.week)

  return (
    <div>
      <h2>Staff</h2>
      <Table bordered responsive >
        <thead>
          <tr>
            <th>Staff</th>
            {
              props.week.map(day =>
                <th key={day}>
                  <span ><Moment format="dddd">{day}</Moment></span><br/>
                  <Moment format="MMM Do">{day}</Moment>
                </th>
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            props.allStaffs.map(
              staff => (
                <tr key={staff._id}>
                  <td >{staff.firstName}</td>
                  {props.week.map(day => 
                    <td key={day}> 
                      {getIncomeOfDay(day, staff.incomeOfDays,staff)}
                      
                    </td>)}
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
  console.log(staffs,"------------")
  const newStaffs =  staffs.sort((firstStaff, secondStaff) => {
    if(secondStaff.firstName > firstStaff.firstName) {
      return -1
    }
    if(secondStaff.firstName < firstStaff.firstName) {
      return 1
    }
    return 0
  })
  console.log(newStaffs,"----")
  return newStaffs
}

const mapStateToProps = (state) => {
  
  return {
    allStaffs:staffsToShow(state.staff),
    date: state.date,
    week: state.week
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchedStaffs: () => {
      dispatch(updateDisplayStaffsAction())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TimeTable)