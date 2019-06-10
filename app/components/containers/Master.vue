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

import Checkout from '@/components/views/order/Checkout'
import AfterCheckout from '@/components/views/order/AfterCheckout'
import OrderDetailsBase from '@/components/views/order/OrderDetailsBase'

import Login from '@/components/views/account/Login'
import Register from '@/components/views/account/Register'
import Profile from '@/components/views/account/Profile'
import EditProfile from '@/components/views/account/EditProfile'
import PaymentDetails from '@/components/views/order/PaymentDetails'

import EventBus from '@/services/event-bus'

export default {
  created() {
    EventBus.$on('menuPageChanged', (index) => {
      let comp = null
      switch (index) {
        case 0:
          comp = 'ProductFeed'
          break
        case 4:
          comp = 'Profile'
          break
      }
      this.navigateTo(comp)
    })
    EventBus.$on('auth:noUser', () => {
      this.navigateTo('Login')
    })
    EventBus.$on('auth:loggedIn', () => {
      this.navigateTo('ProductFeed')
    })
    EventBus.$on('navigateTo', this.navigateTo)
  },
  destroyed() {
    EventBus.$off('menuPageChanged')
    EventBus.$off('auth:noUser')
    EventBus.$off('auth:loggedIn')
    EventBus.$off('navigateTo')
  },
  methods: {
    navigateTo(viewName, props) {
      let comp = null
      switch (viewName) {
        case 'ProductFeed':
          comp = ProductFeed
          break
        case 'ProductDetails':
          comp = ProductDetails
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
    }
  },
}
</script>