import staffService from "../services/staffs"
import { staffConstants } from "../constants/staff.constants"
import alertAction from "../actions/alert.action"

import moment from "moment"

const request = (staffs,type=staffConstants.FETCH_REQUEST) => { return { type, staffs }}
const success = (staffs,type=staffConstants.FETCH_SUCCESS) => { return { type, staffs }}
const failure = (error, type=staffConstants.FETCH_FAILURE) => { return { type, error }}
const getStaffs = (currentDate, staffs) => {
  return async dispatch => {
    dispatch(request(staffs))
    try {
      const week = {
        fromDate: moment(currentDate).startOf("isoWeek").toDate(),
        toDate: moment(currentDate).endOf("isoWeek").toDate()
      }
      const staffs = await staffService.getAllStaffInDateRange(week)
      dispatch(success(staffs))
      console.log(staffs,"---")
    } catch (exception) {
      console.log(exception.error)
      dispatch(failure(exception.error))
      dispatch(alertAction.error(exception.error))
    }
  }
}


const addStaff = (staff) => {
  return async dispatch => {
    dispatch({
      type: staffConstants.ADD_REQUEST,
      staff:{}
    })
    try {
      const addedStaff = await staffService.create(staff)
      dispatch(
        {
          type: staffConstants.ADD_SUCCESS,
          staff: addedStaff
        }
      )
    }catch (exception) {
      console.log(exception.error)
      dispatch(failure(exception.error,staffConstants.ADD_FAILURE))
      dispatch(alertAction.error(exception.error))
    }
  }
}

export default { getStaffs, addStaff }