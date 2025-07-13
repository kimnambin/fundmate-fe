import axios from "axios"

const TEMP_ADDRESS = 'http://localhost:5000'

export const axiosInstance = axios.create({
  baseURL: TEMP_ADDRESS,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
})
