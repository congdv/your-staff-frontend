import { useState } from "react"

export const useField = (type , valueDefault="") => {
  const [value, setValue] = useState(valueDefault)

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue("")
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useDate = (defaultDate=new Date()) => {
  const [date, setDate] = useState(defaultDate)

  const selectingDate = (date) => {
    setDate(date)
  }
  const reset = () => {
    setDate(new Date())
  }
  return {
    date,
    selectingDate,
    reset
  }
}