import http from './http'

export default {
  performPurchase(purchase) {
    return http.get('/payments/charge', purchase)
      .then(resp => resp.data)
  }
}