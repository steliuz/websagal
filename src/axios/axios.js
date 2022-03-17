import axios from "axios"

const baseURL = 'http://localhost:8000/api/v1/'
const token = localStorage.getItem('access_token')

const instance = axios.create({
  baseURL: `${baseURL}`,
  headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token
    }
})

export default instance