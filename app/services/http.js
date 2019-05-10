import axios from 'axios'

const http = axios.create({
  baseURL: 'http://18.188.233.81/api'
})

export default http