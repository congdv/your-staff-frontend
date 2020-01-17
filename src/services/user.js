import axios from "axios"
const baseURL = "/api/login"


const login = async (credentials) => {
  const response = await axios.post(baseURL,credentials )
  return response.data
}

const update = async (data) => {
  try {
    const response = await axios.post("/api/users/update",data)
    return response.data
  } catch(error) {
    throw error.response.data

  }
}

export default { login, update }