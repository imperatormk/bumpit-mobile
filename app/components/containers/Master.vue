<template>
  <FlexboxLayout flexDirection="column" justifyContent="space-around" height="100%">
    <Frame height="92%">
      <slot/>
    </Frame>
    <StackLayout>
      <Navigation/>
    </StackLayout>
  </FlexboxLayout>
</template>

<script>
import ItemFeed from '@/components/views/ItemFeed'
import Checkout from '@/components/views/Checkout'
import ItemDetails from '@/components/views/ItemDetails'
import Profile from '@/components/views/Profile'
import Login from '@/components/views/Login'
import Register from '@/components/views/Register'

import EventBus from '@/services/event-bus'

export default {
  created() {
    EventBus.$on('menuPageChanged', (index) => {
      let comp = null
      switch (index) {
        case 0:
          comp = 'ItemFeed'
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
      this.navigateTo('ItemFeed')
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
        case 'ItemFeed':
          comp = ItemFeed
          break
        case 'ItemDetails':
          comp = ItemDetails
          break
        case 'Checkout':
          comp = Checkout
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