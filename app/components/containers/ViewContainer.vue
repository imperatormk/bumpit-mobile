<template>
  <Page :verticalAlignment="loading ? 'center' : 'top'" actionBarHidden="true" ref="pageRef" :style="getStyle" height="100%">
    <StackLayout v-if="loading" verticalAlignment="center">
      <LoadingIndicator :full="true">
        <Label v-if="loadingText" :text="loadingText" textAlignment="center" fontSize="22" color="#8c8c8c" padding="10"/>
      </LoadingIndicator>
    </StackLayout>
    <StackLayout v-else verticalAlignment="top" height="100%" padding="10">
      <slot/>
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
    }
  },
  components: {
    LoadingIndicator
  }
}
</script>