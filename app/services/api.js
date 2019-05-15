import http from './http'
import auth from './auth'

const getAuthHeaders = (opts) => {
  const options = opts || {}

  return auth.getJwt()
    .then((token) => {
      const optionsRes = options
      optionsRes.headers = {
        Authorization: `JWT ${token}`
      }
      return optionsRes
    })
}

export default {
  getItems() {
    return http.get('/items')
      .then(resp => resp.data)
  },
  getItem(itemId) {
    return http.get(`/items/${itemId}`)
      .then(resp => resp.data)
  },
  performOrder(order) {
    return http.post('/payments/charge', order)
      .then(resp => resp.data)
  }
}