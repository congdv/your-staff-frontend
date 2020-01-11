import incomeService from "../services/incomeOfStaff"
import moment from "moment"

const updateIncomesTotalState = (stateData, newData) => {
  const staff = stateData.find(staff => staff._id === newData._id)
  if(staff) {
    const updatedStaff = {
      _id: staff._id,
      staff: staff._id,
      totalOfWeek: Number(staff.totalOfWeek) + Number(newData.totalOfWeek),
      dates: staff.dates.find(date => moment(date).isSame(newData.dates[0],"day")) ? staff.dates : [...staff.dates,newData.dates[0]]
    }
    const updatedState = stateData.map(staff => staff._id === newData._id ? updatedStaff : staff)
    return updatedState
  } else {
    return [...stateData,newData]
  }
}

const incomeTotalReducer = (state=[],action) => {
  switch (action.type) {
  case "INIT_INCOMES_TOTAL":
    return action.data
  case "UPDATE_INCOMES_TOTAL":
    return action.data
  case "UPDATE_INCOMES_TOTAL_LOCAL":
    return updateIncomesTotalState(state,action.data)
  default:
    return state
  }
}


export const initializeIncomesTotalAction = (date) => {
  return async dispatch => {
    const data = {
      date: date
    }
    const staffs = await incomeService.getTotal(data)
    dispatch({
      type: "INIT_INCOMES_TOTAL",
      data: staffs
    })
  }
}

export const updateIncomesTotalAction = (date) => {
  return async dispatch => {
    const data = {
      date: date
    }
    const staffs = await incomeService.getTotal(data)
    dispatch({
      type: "UPDATE_INCOMES_TOTAL",
      data: staffs
    })
  }
}

export const updateIncomesTotalLocalAction = (staff, amount,date) => {
  return async dispatch => {
    //Need to Refactor this one
    const data = {
      _id: staff._id,
      staff: staff._id,
      totalOfWeek: amount,
      dates: [date]
    }
    dispatch({
      type: "UPDATE_INCOMES_TOTAL_LOCAL",
      data: data
    })
  }
}
export default incomeTotalReducer