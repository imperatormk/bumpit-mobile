import axios from 'axios'
import System from '@/data/system'
import { Alert } from '@/services/ui-utils'

const http = axios.create({
  baseURL: `${System.serverUrl}/api`
})

import EventBus from '@/services/event-bus'

http.interceptors.response.use(response => response, (error) => {
  if (error && error.response) {
    if (error.response.status === 401) {
      // clear jwt here
      EventBus.$emit('auth:noUser')
    } else {
      Alert.showAlert({
        title: 'Error!',
        message: error.response.data.msg,
        type: 'error'
      })
    }
  }
  return Promise.reject(error)
})

export default http