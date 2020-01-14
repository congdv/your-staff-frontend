import axios from "axios"
const baseURL = "/api/staffs"

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {

  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(baseURL,config)
  return response.data
}
const getAllActiveStaffs = async() => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(`${baseURL}/active`,config)
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
  const response = await axios.post(`${baseURL}/incomes`, rangeDate, config)
  return response.data
}
const deactiveStaff = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseURL}/${id}/deactive`,null,config)
  return response.data
}

const activeStaff = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseURL}/${id}/active`,null,config)
  return response.data
}


export default { setToken, getAll, getAllActiveStaffs, create, getAllStaffInDateRange, deactiveStaff, activeStaff }