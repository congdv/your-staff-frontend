import { alertConstants } from "../constants/alert.constants"

const success = (message) => {
  return { type: alertConstants.SUCCESS , message }
}

const error = (message) => {
  return { type: alertConstants.ERROR, message }
}

const clear = () => {
  return { type: alertConstants.CLEAR }
}

export default { success, error, clear }