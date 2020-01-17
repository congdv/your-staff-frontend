import axios from "axios"

const baseURL = "/api/staffs"

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async(id, data) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(`${baseURL}/${id}`, data, config)
  return response.data
}

const update = async(id,data) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseURL}/${id}`,data,config)
  return response.data
}

const getTotal = async(data) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(`${baseURL}/week-total`,data,config)
  return response.data
}


export default { setToken, create, update, getTotal }