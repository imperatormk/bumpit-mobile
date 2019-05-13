import http from './http'

export default {
  getItems() {
    return http.get('/items')
      .then(resp => resp.data)
  },
  getItem(itemId) {
    return http.get(`/items/${itemId}`)
      .then(resp => resp.data)
  },
  performPurchase(purchase) {
    return http.post('/payments/charge', purchase)
      .then(resp => resp.data)
  }
}