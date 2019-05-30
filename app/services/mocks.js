const p = (obj) => {
  return Promise.resolve(obj)
}

const user = {
  username: 'imperatormk',
  name: 'Darko',
  avatar: 'https://cdn3.iconfinder.com/data/icons/fillies-small/64/id-card-512.png'
}

const product = {
  id: 100,
  title: 'Mock product',
  category: {
    name: 'Mock category'
  },
  price: 1421,
  currency: 'USD',
  images: [{ id: 1, url: 'https://via.placeholder.com/300x300' }],
  seller: {
    ...user
  }
}

const order = {
  shippingAddress: '<Address>',
  product,
  buyer: {
    ...user
  },
  createdAt: '<Time>'
}

export default {
  user,
  product,
  order
}