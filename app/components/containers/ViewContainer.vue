<template>
  <Page :verticalAlignment="loading ? 'center' : 'top'" actionBarHidden="true" ref="pageRef" :style="getStyle" height="100%">
    <StackLayout v-if="loading" verticalAlignment="center">
      <LoadingIndicator :full="true">
        <Label v-if="loadingText" :text="loadingText" textAlignment="center" fontSize="22" color="#8c8c8c" padding="10"/>
      </LoadingIndicator>
    </StackLayout>
    <StackLayout v-else verticalAlignment="top" height="100%">
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
import LoadingIndicator from '@/components/common/LoadingIndicator'
import EventBus from '@/services/event-bus'

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: String,
    backgroundImage: {
      type: String,
      default: ''
    }
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
      const def = this.hasScrollableSlot ? '20 20 0 20' : '20'
      const scr = this.hasDefaultSlot ? '0 20 20 20': '20'
      return { def, scr }
    }
  },
  components: {
    LoadingIndicator
  }
}
</script>