import moment from "moment"

const selectedWeekReducer = (state=[], action) => {
  switch (action.type) {
    case "CURRENT_WEEK":
      return action.data
    default:
      return state.length < 1 ? generateDaysOfWeek(new Date()) : state
  }
}

const generateDaysOfWeek = (day) => {

  const startWeekOf = moment(day).startOf("isoWeek")
  const endWeekOf = moment(day).endOf("isoWeek")
  let dayIndex = startWeekOf.set({hour: day.getHours(), minute: day.getMinutes()})
  let weekDays = []
  console.log(startWeekOf.toDate())
  while(dayIndex.isSameOrBefore(endWeekOf)) {
    weekDays.push(dayIndex.toDate())
    dayIndex.add(1,"days")
    
  }
  return weekDays
}

export const selectingWeekAction = (date) => {
  return async dispatch => {
    const newDate = date
    const week = generateDaysOfWeek(newDate)
    dispatch( {
      type: "CURRENT_WEEK",
      data: week
    }
    )
  }
}

export default selectedWeekReducer