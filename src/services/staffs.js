import axios from "axios"
import { authHeader } from "../helpers/authHeader"
const baseURL = "/api/staffs"


const getAll = async () => {

  const config = {
    headers: authHeader()
  }
  const response = await axios.get(baseURL,config)
  return response.data
}
const getAllActiveStaffs = async() => {
  const config = {
    headers: authHeader()
  }
  const response = await axios.get(`${baseURL}/active`,config)
  return response.data
}

const create = async (newStaff) => {
  const config = {
    headers: authHeader()
  }
  const response = await axios.post(baseURL, newStaff, config)
  return response.data
}

const getAllStaffInDateRange = async (rangeDate) => {
  const config = {
    headers: authHeader()
  }
  const response = await axios.post(`${baseURL}/incomes`, rangeDate, config)
  return response.data
}
const deactiveStaff = async (id) => {
  const config = {
    headers: authHeader()
  }
  const response = await axios.put(`${baseURL}/${id}/deactive`,null,config)
  return response.data
}

const activeStaff = async (id) => {
  const config = {
    headers: authHeader()
  }
  const response = await axios.put(`${baseURL}/${id}/active`,null,config)
  return response.data
}

const deleteStaff = async(id) => {
  const config = {
    headers: authHeader()
  }
  const response = await axios.delete(`${baseURL}/${id}`,config)
  return response.data
}

const updateStaff = async(staff) => {
  const config = {
    headers: authHeader()
  }
  try {
    const response = await axios.put(baseURL,staff,config)
    return response.data
  } catch(error) {
    throw error.response.data
  }
}


export default { getAll, getAllActiveStaffs, create, getAllStaffInDateRange, deactiveStaff, activeStaff, deleteStaff,updateStaff }