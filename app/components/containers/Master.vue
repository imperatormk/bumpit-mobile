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
import HomeScreen from '@/components/views/HomeScreen'
import Profile from '@/components/views/Profile'

import EventBus from '@/services/event-bus'

export default {
  created() {
    EventBus.$on('menuPageChanged', (index) => {
      let comp = null
      switch (index) {
        case 0:
          comp = ItemFeed
          break
        case 4:
          comp = Profile
          break
      }
      comp && this.$navigateTo(comp, {
        animated: true,
        transition: {
          name: 'fade'
        }
      })
    })
  },
  destroyed() {
    EventBus.$off('menuPageChanged')
  },
}
</script>