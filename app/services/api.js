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
  getProducts() {
    return http.get('/products')
      .then(resp => resp.data)
  },
  getProduct(productId) {
    return http.get(`/products/${productId}`)
      .then(resp => resp.data)
  },
  getOrder(orderId) {
    return http.get(`/orders/${orderId}`)
      .then(resp => resp.data)
  },
  performOrder(order) {
    return http.post('/payments/charge', order)
      .then(resp => resp.data)
  },
  getConnections(userId, config) {
    const data = config || {}
    return http.post(`/accounts/${userId}/connections`, data)
      .then(resp => resp.data)
  }
}