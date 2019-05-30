const p = (obj) => {
  return Promise.resolve(obj)
}

const product = {
  id: 100,
  title: 'Mock product',
  category: {
    name: 'Mock category'
  },
  price: 1421,
  currency: 'USD',
  images: [{ url: 'https://via.placeholder.com/300x300' }],
  seller: {
    username: '<Username>'
  }
}

const order = {
  shippingAddress: '<Address>',
  product,
  buyer: {
    name: '<Name>',
    username: '<Username>'
  },
  createdAt: '<Time>'
}

export default {
  product,
  order
}