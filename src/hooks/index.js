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

export const useDate = () => {
  const [date, setDate] = useState(new Date())

  const selectingDate = (date) => {
    setDate(date)
  }
  return {
    date,
    selectingDate
  }
}