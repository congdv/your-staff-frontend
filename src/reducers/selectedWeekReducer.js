import moment from "moment"

const selectedWeekReducer = (state=[], action) => {
  switch (action.type) {
  case "CURRENT_WEEK":
    return action.data
  default:
    return state.length < 1 ? generateDaysOfWeek(moment().toDate()) : state
  }
}

const generateDaysOfWeek = (day) => {
  //Modifying to ISO date
  const selectedDate = moment(day)
  console.log(selectedDate.format())
  const startWeekOf = moment(selectedDate).startOf("isoWeek")
  const endWeekOf = moment(selectedDate).endOf("isoWeek")
  let dayIndex = startWeekOf.set({ hour: selectedDate.hours(), minute: selectedDate.minutes() })
  let weekDays = []
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