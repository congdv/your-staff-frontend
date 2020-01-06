import staffService from "../services/staffs"
import incomeService from "../services/incomeOfStaff"

const updateDateofStaffs = (oldDataStaff, newDataStaff) => {
  const restStaff = oldDataStaff.filter( oldStaff => !newDataStaff.find(newStaff => newStaff._id === oldStaff._id))
  return [...newDataStaff,...restStaff]
}

const updateIncomeOfStaff = (staffs, newIncomeOfDay) => {
  const newStaffs = staffs.map(
    staff => {
      if(staff._id === newIncomeOfDay.staff) {
        staff.incomeOfDays = staff.incomeOfDays.map(incomeOfDay => {
          if(incomeOfDay.id === newIncomeOfDay.id) {
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
          if(incomeOfDay.id === newIncomeOfDay.id) {
            foundDate = true
            return newIncomeOfDay
          }
          return incomeOfDay
          
        })
        if(!foundDate){
          staff.incomeOfDays = staff.incomeOfDays.concat(newIncomeOfDay)
        }
        return staff
      }
      return staff
    }
  )
  return newStaffs
}

const staffReducer = (state=[], action) => {
  switch(action.type) {
    case "NEW_STAFF":
      return [...state, action.data]
    case "INIT_STAFFS":
      return action.data
    case "UPDATE_SINGLE_STAFF":
      return ""
    case "UPDATE_INCOME_OF_STAFF":
      return updateIncomeOfStaff(state,action.data)
    case "ADD_NEW_INCOME_OF_STAFF":
      return addNewIncomeOfStaff(state,action.data)
    case "UPDATE_DISPLAY_STAFFS":
      return updateDateofStaffs(state,action.data)
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

export const updateDisplayStaffsAction = () => {
  return async dispatch => {
    const week = generateDaysOfWeek(new Date())
    const dateRange = {
      fromDate: week[0],
      toDate: week[6]
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
    console.log("---------",id,data)
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