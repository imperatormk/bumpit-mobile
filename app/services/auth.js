import http from './http'
const appSettings = require('tns-core-modules/application-settings')

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
  getAuthUser(includeSettings) {
    const params = { includeSettings: !!includeSettings }
    return getAuthHeaders({ params })
      .then(options => http.get('/user', options))
      .then(resp => resp.data)
  },
  getAuthHeaders(opts) {
    return getAuthHeaders(opts)
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