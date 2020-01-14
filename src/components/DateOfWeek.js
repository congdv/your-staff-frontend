import DatePicker from "react-datepicker"
import React, { useState } from "react"
import { connect } from "react-redux"
import "react-datepicker/dist/react-datepicker.css"
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa"

import { selectingDateAction } from "../reducers/selectedDateReducer"
import { selectingWeekAction } from "../reducers/selectedWeekReducer"
import { updateDisplayStaffsAction } from "../reducers/staffReducer"
import { updateIncomesTotalAction } from "../reducers/incomeTotalReducer"
import { Button } from "react-bootstrap"
import moment from "moment"


const DateOfWeek = (props) => {
  const [startDate, setStartDate] = useState(moment().toDate())
  const selectingDate = (date) => {
    setStartDate(date)
    props.selectWeek(date)
    props.selectDate(date)
    props.fetchedStaffs(date)
    props.updateTotalIncomes(date)

  }
  const previousWeek = () => {
    const day = moment(startDate).subtract(7,"days")
    selectingDate(day.toDate())
  }
  const nextWeek = () => {
    const day = moment(startDate).add(7,"days")
    selectingDate(day.toDate())
  }
  return (
    <div className="col-centered">
      <Button onClick={previousWeek}><FaAngleDoubleLeft/></Button>
      <Button onClick={() => selectingDate( moment().toDate())} className="ml-1 mr-1">Today</Button>
      <DatePicker
        todayButton="Today"
        selected={startDate}
        onChange= {date => selectingDate(date)}
        className="form-control"
        dateFormat="MMMM dd, yyyy"/>
      <Button onClick={nextWeek} className="ml-1"><FaAngleDoubleRight/></Button>
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
    },
    fetchedStaffs: (date) => {
      dispatch(updateDisplayStaffsAction(date))
    },
    updateTotalIncomes: (date) => {
      dispatch(updateIncomesTotalAction(date))
    }
  }
}

export default connect(mapStateToPros,mapDispatchToPros)(DateOfWeek)