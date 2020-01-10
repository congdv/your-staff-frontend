import staffService from "../services/staffs"
import incomeService from "../services/incomeOfStaff"

import moment from "moment"

const updateDateofStaffs = (oldDataStaff, newDataStaff) => {
  const restStaff = oldDataStaff.filter( oldStaff => !newDataStaff.find(newStaff => newStaff._id === oldStaff._id))
  return [...newDataStaff,...restStaff]
}

const updateIncomeOfStaff = (staffs, newIncomeOfDay) => {
  const newStaffs = staffs.map(
    staff => {
      if(staff._id === newIncomeOfDay.staff) {
        staff.incomeOfDays = staff.incomeOfDays.map(incomeOfDay => {
          if(incomeOfDay._id === newIncomeOfDay._id) {
            return newIncomeOfDay
          }
          return incomeOfDay
        })

      }
      return staff
    }
  )

  return newStaffs
}
const addNewIncomeOfStaff = (staffs, newIncomeOfDay) => {
  const newStaffs = staffs.map(
    staff => {
      if(staff._id === newIncomeOfDay.staff) {
        let foundDate = false
        
        staff.incomeOfDays = staff.incomeOfDays.map(incomeOfDay => {
          if(incomeOfDay._id === newIncomeOfDay._id) {
            foundDate = true
            return newIncomeOfDay
          }
          return incomeOfDay
          
        })
        if(!foundDate){
          staff.incomeOfDays = staff.incomeOfDays.concat(newIncomeOfDay)
        }
        staff.incomeOfDays = staff.incomeOfDays.concat(newIncomeOfDay)
        return staff
      }
      return staff
    }
  )
  console.log(newStaffs,"new")
  return newStaffs
}

const staffReducer = (state=[], action) => {
  switch(action.type) {
    case "NEW_STAFF":
      return [...state, action.data]
    case "INIT_STAFFS":
      return action.data
    case "GET_ACTIVE_STAFFS":
      return action.data
    case "UPDATE_INCOME_OF_STAFF":
      return updateIncomeOfStaff(state,action.data)
    case "ADD_NEW_INCOME_OF_STAFF":
      return addNewIncomeOfStaff(state,action.data)
    case "UPDATE_DISPLAY_STAFFS":
      return updateDateofStaffs(state,action.data)
    case "DEACTIVE_STAFF":
      return state.map(staff => staff._id === action.data._id ? action.data : staff)
    case "ACTIVE_STAFF":
      return state.map(staff => staff._id === action.data._id ? action.data : staff)
    default:
      return state
  }
}

export const initializeStaffsAction = () => {
  return async dispatch => {
    const staffs = await staffService.getAll()
    dispatch({
      type: "INIT_STAFFS",
      data: staffs
    })
  }
}
export const getAllActiveStaffsAction = () => {
  return async dispatch => {
    const staffs = await staffService.getAllActiveStaffs()
    dispatch({
      type: "GET_ACTIVE_STAFFS",
      data: staffs
    })
  }
}
export const newStaffAction = (newObj) => {
  return async dispatch => {
    const savedStaff = await staffService.create(newObj)
    console.log(typeof savedStaff,"Saved Staff")
    dispatch({
      type: "NEW_STAFF",
      data: savedStaff
    })
  }
}
export const deactiveStaffAction = (id) => {
  return async dispatch => {
    const deactivedStaff = await staffService.deactiveStaff(id)
    dispatch({
      type: "DEACTIVE_STAFF",
      data: deactivedStaff
    })
  }
}

export const activeStaffAction = (id) => {
  return async dispatch => {
    const activedStaff = await staffService.activeStaff(id)
    dispatch({
      type: "ACTIVE_STAFF",
      data: activedStaff
    })
  }
}

export const updateDisplayStaffsAction = (today) => {
  return async dispatch => {
    const dateRange = {
      fromDate: moment(today).startOf("isoWeek"),
      toDate: moment(today).endOf("isoWeek")
    }
    const fetchedStaffs = await staffService.getAllStaffInDateRange(dateRange)
    dispatch({
      type: "UPDATE_DISPLAY_STAFFS",
      data: fetchedStaffs
    })
  }
}

export const updateIncomeOfStaffAction = (id,data) => {
  return async dispatch => {
    const updateIncomeOfStaff = await incomeService.update(id,data)
    console.log(updateIncomeOfStaff,"hahah")
    dispatch({
      type: "UPDATE_INCOME_OF_STAFF",
      data: updateIncomeOfStaff
    })
  }
}
export const addNewIncomeOfStaffAction  = (id, data) => {
  return async dispatch => {
    const savedIncomeOfStaff = await incomeService.create(id,data)

    dispatch({
      type: "ADD_NEW_INCOME_OF_STAFF",
      data: savedIncomeOfStaff
    })
  }
}
export default staffReducer