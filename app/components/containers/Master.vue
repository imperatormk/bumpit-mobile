<template>
  <FlexCol justifyContent="space-around" height="100%">
    <Frame height="92%">
      <slot/>
    </Frame>
    <StackLayout>
      <Navigation/>
    </StackLayout>
  </FlexCol>
</template>

<script>
import ProductFeed from '@/components/views/product/ProductFeed'
import ProductDetails from '@/components/views/product/ProductDetails'
import NewProduct from '@/components/views/product/NewProduct'

import Likes from '@/components/views/account/Likes'
import Connections from '@/components/views/account/Connections'

import Checkout from '@/components/views/order/Checkout'
import AfterCheckout from '@/components/views/order/AfterCheckout'
import OrderDetailsBase from '@/components/views/order/OrderDetailsBase'

import Login from '@/components/views/account/Login'
import Register from '@/components/views/account/Register'
import Profile from '@/components/views/account/Profile'
import EditProfile from '@/components/views/account/EditProfile'
import PaymentDetails from '@/components/views/order/PaymentDetails'
import ShippingDetails from '@/components/views/account/ShippingDetails'

import EventBus from '@/services/event-bus'

export default {
  created() {
    EventBus.$on('menuPageChanged', (index) => {
      let comp = null
      switch (index) {
        case 0:
          comp = 'ProductFeed'
          break
        case 1:
          comp = 'Likes'
          break
        case 4:
          comp = 'Profile'
          break
      }
      this.navigateTo(comp)
    })
    EventBus.$on('auth:noUser', () => {
      this.navigateTo('Login', { canGoBack: true })
    })
    EventBus.$on('auth:loggedIn', (canGoBack) => {
      if (canGoBack) {
        this.$navigateBack()
      } else {
        this.navigateTo('EditProfile')
      }
    })
    EventBus.$on('navigateTo', this.navigateTo)
  },
  destroyed() {
    EventBus.$off('menuPageChanged')
    EventBus.$off('auth:noUser')
    EventBus.$off('auth:loggedIn')
    EventBus.$off('navigateTo')
  },
  data: () => ({
    currentView: null
  }),
  methods: {
    navigateTo(viewName, props) {
      if (this.currentView === viewName) return

      let comp = null
      switch (viewName) {
        case 'ProductFeed':
          comp = ProductFeed
          break
        case 'ProductDetails':
          comp = ProductDetails
          break
        case 'NewProduct':
          comp = NewProduct
          break
        case 'Likes':
          comp = Likes
          break
        case 'Connections':
          comp = Connections
          break
        case 'Conversation':
          break
        case 'Checkout':
          comp = Checkout
          break
        case 'AfterCheckout':
          comp = AfterCheckout
          break
        case 'OrderDetailsBase':
          comp = OrderDetailsBase
          break
        case 'PaymentDetails':
          comp = PaymentDetails
          break
        case 'ShippingDetails':
          comp = ShippingDetails
          break
        case 'EditProfile':
          comp = EditProfile
          break
        case 'Profile':
          comp = Profile
          break
        case 'Login':
          comp = Login
          break
        case 'Register':
          comp = Register
          break
      }
      if (!comp) return
      this.$navigateTo(comp, {
        animated: true,
        transition: {
          name: 'fade'
        },
        props
      })
      this.currentView = viewName
    }
  },
}
</script>