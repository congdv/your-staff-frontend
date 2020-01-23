import axios from "axios"
import { authHeader } from "../helpers/authHeader"
const baseURL = "/api/staffs"

const create = async(id, data) => {
  const config = {
    headers: authHeader()
  }

  const response = await axios.post(`${baseURL}/${id}`, data, config)
  return response.data
}

const update = async(id,data) => {
  const config = {
    headers: authHeader()
  }
  const response = await axios.put(`${baseURL}/${id}`,data,config)
  return response.data
}

const getTotal = async(data) => {
  const config = {
    headers: authHeader()
  }
  const response = await axios.post(`${baseURL}/week-total`,data,config)
  return response.data
}


export default {  create, update, getTotal }