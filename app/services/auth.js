import http from './http'
const appSettings = require('application-settings')

const getJwt = () => {
  const jwtToken = appSettings.getString('jwtToken') || ''
  return Promise.resolve(jwtToken)
}

const storeJwt = (jwtObject) => {
  const jwtToken = jwtObject.token
  appSettings.setString('jwtToken', jwtToken)
  return Promise.resolve({ status: 'success' })
}
const getAuthHeaders = (opts) => {
  const options = opts || {}

  return getJwt()
    .then((token) => {
      const optionsRes = options
      optionsRes.headers = {
        Authorization: `JWT ${token}`
      }
      return optionsRes
    })
}

export default {
  getAuthUser() {
    return getAuthHeaders()
      .then(options => http.get('/auth/user', options))
      .then(resp => resp.data)
  },
  login(username, password) {
    return http.post('/auth/login', { username, password })
      .then(resp => resp.data)
      .then(jwtObject => storeJwt(jwtObject))
  },
  logout() {
    appSettings.remove('jwtToken')
    return Promise.resolve({ status: 'success' })
  }
}