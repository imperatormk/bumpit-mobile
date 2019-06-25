<template>
  <Page verticalAlignment="top" actionBarHidden="true" ref="pageRef" :style="getStyle" height="100%">
    <StackLayout verticalAlignment="top" height="100%">
      <StackLayout v-if="hasDefaultSlot" :padding="paddings.def">
        <slot/>
      </StackLayout>
      <ScrollView v-if="hasScrollableSlot" orientation="vertical">
        <StackLayout :padding="paddings.scr">
          <slot name="scrollable"/>
        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
import EventBus from '@/services/event-bus'

export default {
  props: {
    backgroundImage: {
      type: String,
      default: ''
    },
    paddingConfig: Object
  },
  created() {
    EventBus.$on('getPageRef', (cb) => {
      cb(this.$refs.pageRef.nativeView)
    })
  },
  destroyed() {
    EventBus.$off('getPageRef')
  },
  computed: {
    getStyle() {
      return {
        'background-image': this.backgroundImage,
        'background-size': 'cover'
      }
    },
    hasDefaultSlot() {
      return !!this.$slots.default
    },
    hasScrollableSlot() {
      return !!this.$slots['scrollable']
    },
    paddings() {
      let def = this.hasScrollableSlot ? '20 20 0 20' : '20'
      let scr = this.hasDefaultSlot ? '0 20 20 20': '20'
      if (this.paddingConfig) {
        if (this.paddingConfig.def) def = this.paddingConfig.def
        if (this.paddingConfig.scr) scr = this.paddingConfig.scr
      }
      return { def, scr }
    }
  }
}
</script>