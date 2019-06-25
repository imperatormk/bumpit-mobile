import http from './http'
import auth from './auth'

import uploadImage from './upload-image'
import System from '@/data/system'

const { getAuthHeaders } = auth

const brand = {
  getBrands() {
    return http.get('/brands')
      .then(resp => resp.data)
  }
}

const category = {
  getCategories() {
    return http.get('/categories')
      .then(resp => resp.data)
  }
}

const product = {
  getProducts(filter, pageData) {
    const params = {
      ...filter,
      ...pageData
    }
    return http.get('/products', { params })
      .then(resp => resp.data)
  },
  getProduct(productId) {
    return http.get(`/products/${productId}`)
      .then(resp => resp.data)
  },
  postProduct(product) {
    return getAuthHeaders()
      .then((options) => {
        return http.post('/products', product, options)
      })
      .then(resp => resp.data)
  },
  postProductImages(productId, productImages) {
    const endpoint = `${System.apiUrl}/api/products/${productId}/images`

    return getAuthHeaders()
      .then((options) => {
        return productImages.map((image) =>
          uploadImage.startUpload({
            path: image,
            fieldName: 'productImage'
          },
          endpoint,
          options.headers['Authorization']))
      })
  }
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
      .then((options) => http.get('/user/shippingInfo', options))
      .then(resp => resp.data)
  },
  updateShippingInfo(data) {
    return getAuthHeaders()
      .then((options) => {
        return http.post('/user/shippingInfo', data, options)
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
  registerUser(userObj) {
    return http.post(`/accounts/register`, userObj)
      .then(resp => resp.data)
  },
  updateAvatar(avatar) {
    const endpoint = `${System.apiUrl}/user/avatar`

    return getAuthHeaders()
      .then(options => uploadImage.startUpload({
          path: avatar,
          fieldName: 'avatar'
        },
        endpoint,
        options.headers['Authorization']))
      .then(resp => resp.data)
  }
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
  ...brand,
  ...category,
  ...product,
  ...order,
  ...shippingInfo,
  ...user,
  ...conversation,
}