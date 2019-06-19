import axios from 'axios'
import System from '@/data/system'

const http = axios.create({
  baseURL: `${System.apiUrl}/api`
})

import EventBus from '@/services/event-bus'

http.interceptors.response.use(response => response, (error) => {
  if (error && error.response && error.response.status === 401) {
    // clear jwt here
    EventBus.$emit('auth:noUser')
  }
  return Promise.reject(error)
})

export default http