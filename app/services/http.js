import axios from 'axios'

const http = axios.create({
  baseURL: 'http://18.188.233.81/api'
})

import EventBus from '@/services/event-bus'

http.interceptors.response.use(response => response, (error) => {
  if (typeof error.response === 'undefined' || error.response.status === 401) {
    // clear jwt here
    EventBus.$emit('auth:noUser')
  }
  return Promise.reject(error)
})

export default http