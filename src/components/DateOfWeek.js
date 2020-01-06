import DatePicker from "react-datepicker"
import React, {useState} from "react"
import {connect} from "react-redux"
import "react-datepicker/dist/react-datepicker.css"

import {selectingDateAction} from "../reducers/selectedDateReducer"
import {selectingWeekAction} from "../reducers/selectedWeekReducer"
import { Button } from "react-bootstrap"
import moment from "moment"

const DateOfWeek = (props) => {
  const [startDate, setStartDate] = useState(new Date())
  const selectingDate = (date) => {
    setStartDate(date)
    props.selectWeek(date)
    // props.selectDate(date)
    
  }
  const previousWeek = () => {
    const day = moment(startDate).subtract(7,"days")
    console.log(day)
    selectingDate(day._d)
  }
  const nextWeek = () => {
    const day = moment(startDate).add(7,"days")
    console.log(day)
    selectingDate(day._d)
  }
  console.log(startDate,"selecting ------")
  return (
    <div>
      <Button variant="outline-info" onClick={previousWeek}>Previous Week</Button>
      <DatePicker
      selected={startDate}
      onChange= {date => selectingDate(date)}
      dateFormat="MMMM dd, yyyy"/>
      <Button variant="outline-info" onClick={nextWeek}>Next Week</Button>
    </div>
  )
}

const mapStateToPros = (state) => {
  return {
    date: state.date
  }
}

const mapDispatchToPros = (dispatch) => {
  return {
    selectDate: (date) => {
      dispatch(selectingDateAction(date))
    },
    selectWeek: (date) => {
      dispatch(selectingWeekAction(date))
    }
  }
}

export default connect(mapStateToPros,mapDispatchToPros)(DateOfWeek)