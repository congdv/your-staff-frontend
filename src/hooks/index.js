import { useState } from "react"

export const useField = (type) => {
  const [value, setValue] = useState("")

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