import axios from "axios"
const baseURL = "/api/staffs"

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const create = async (newStaff) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseURL, newStaff, config)
  return response.data
}

const getAllStaffInDateRange = async (rangeDate) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log(token,"token")
  const response = await axios.post(`${baseURL}/incomes`, rangeDate, config)
  return response.data
}


export default { setToken, getAll, create, getAllStaffInDateRange }