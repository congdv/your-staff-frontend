import { staffConstants } from "../constants/staff.constants"
import { incomeConstants } from "../constants/income.constants"

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
  return newStaffs
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

export const staffs = (state={}, action) => {
  switch(action.type) {
  //Fetch staffs list
  case staffConstants.FETCH_REQUEST:
    return {
      isFetching: true,
      data: action.staffs
    }
  case staffConstants.FETCH_SUCCESS:
    return {
      isFetched: true,
      data: action.staffs
    }
  case staffConstants.FETCH_FAILURE:
    return {
      ...state
    }

  //Add new staff
  case staffConstants.ADD_REQUEST:
    return {
      isAdding: true,
      data: state.data
    }
  case staffConstants.ADD_SUCCESS:
    return {
      isAdded: true,
      data: [...state.data,action.staff]
    }
  case staffConstants.ADD_FAILURE:
    return {
      ...state
    }

  // add income of staffs
  case incomeConstants.ADD_REQUEST:
    return {
      isAddingIncome: true,
      data: state.data
    }
  case incomeConstants.ADD_SUCCESS:
    return {
      isAddedIncome: true,
      data: addNewIncomeOfStaff(state.data,action.data)
    }
  case incomeConstants.ADD_FAILURE:
    return {
      ...state
    }

    // add income of staffs
  case incomeConstants.REMOVE_REQUEST:
    return {
      isRemovingIncome: true,
      data: state.data
    }
  case incomeConstants.REMOVE_SUCCESS:
    return {
      isRemovedIncome: true,
      data: updateIncomeOfStaff(state.data,action.data)
    }
  case incomeConstants.REMOVE_FAILURE:
    return {
      ...state
    }

  default:
    return state
  }
}