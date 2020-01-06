import moment from "moment"

const selectedWeekReducer = (state=[], action) => {
  console.log("Weeek reducer ",state)
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
  console.log(startWeekOf, endWeekOf)
  const weekMoment = moment(day).week()
  console.log("week", weekMoment)
  let week = []
  let today = new Date(day)
  today.setDate(today.getDate() - today.getDay() + 1)
  for(let day = 0; day < 7; day++) {
    week.push(new Date(today))
    //Move next day
    today.setDate(today.getDate() + 1)
  }
  // for(let dayIndex = startWeekOf; !moment(dayIndex).isSame(endWeekOf); dayIndex = moment(dayIndex).add(1,"days")) {
  //   console.log(dayIndex)
  // }
  let dayIndex = startWeekOf
  while(dayIndex.isSameOrBefore(endWeekOf)) {
    dayIndex.add(1,"days")
  }
  return week
}

export const selectingWeekAction = (date) => {
  return async dispatch => {
    const newDate = date
    const week = generateDaysOfWeek(newDate)
    console.log("After ",week)
    dispatch( {
      type: "CURRENT_WEEK",
      data: week
    }
    )
  }
}

export default selectedWeekReducer