import http from './http'
import auth from './auth'

const getAuthHeaders = (opts) => {
  return getAuthHeadersMock(opts)
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

const getAuthHeadersMock = (opts) => {
  const options = opts || {}
  return Promise.resolve('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImltcGVyYXRvcm1rIiwiaWF0IjoxNTU3ODY5ODg5fQ.-6PWoE1CT303idkQ7VzS-5BisSneKUy9og3sCdyj6MI')
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
  prepareOrder(order) {
    return getAuthHeaders()
      .then((options) => {
        return http.post('/orders/prepare', order, options)
      })
      .then(resp => resp.data)
  },
  performOrder(order) {
    return getAuthHeaders()
      .then((options) => {
        return http.post('/orders/create', order, options)
      })
      .then(resp => resp.data)
  },
  getConnections(userId, config) {
    const data = config || {}
    return http.post(`/accounts/${userId}/connections`, data)
      .then(resp => resp.data)
  },
  getUser(userId) {
    return http.get(`/accounts/${userId}`)
      .then(resp => resp.data)
  }
}