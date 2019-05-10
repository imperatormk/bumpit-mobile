import http from './http'

export default {
  performPurchase(purchase) {
    return http.post('/payments/charge', purchase)
      .then(resp => resp.data)
  }
}