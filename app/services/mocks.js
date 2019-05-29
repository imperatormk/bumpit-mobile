const p = (obj) => {
  return Promise.resolve(obj)
}

const item = {
  id: 100,
  title: 'Mock item',
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
  item,
  buyer: {
    username: '<Username>'
  },
  createdAt: '<Time>'
}

export default {
  item,
  order
}