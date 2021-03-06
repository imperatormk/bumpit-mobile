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

const product = {
  getProducts() {
    return http.get('/products')
      .then(resp => resp.data)
  },
  getProduct(productId) {
    return http.get(`/products/${productId}`)
      .then(resp => resp.data)
  },
}

const order = {
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
}

const shippingInfo = {
  getShippingInfo() {
    return getAuthHeaders()
      .then((options) => http.get('/auth/user/shippingInfo', options))
      .then(resp => resp.data)
  },
  updateShippingInfo(data) {
    return getAuthHeaders()
      .then((options) => {
        return http.post('/auth/user/shippingInfo', data, options)
      })
      .then(resp => resp.data)
  },
}

const user = {
  getConnections(userId, config) {
    const data = config || {}
    return http.post(`/accounts/${userId}/connections`, data)
      .then(resp => resp.data)
  },
  getUser(userId) {
    return http.get(`/accounts/${userId}`)
      .then(resp => resp.data)
  },
}

const conversation = {
  getConversation(productId) {
    return getAuthHeaders()
      .then(options => http.post('/conversations', { proId: productId }, options))
      .then(resp => resp.data)
  },
  sendMessage(conversationId, message) {
    return getAuthHeaders()
      .then(options => http.post(`/conversations/${conversationId}`, { content: message }, options))
      .then(resp => resp.data)
  }
}

export default {
  ...product,
  ...order,
  ...shippingInfo,
  ...user,
  ...conversation,
}