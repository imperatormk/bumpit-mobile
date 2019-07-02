<template>
  <Page :verticalAlignment="loading ? 'center' : 'top'" ref="pageRef" :style="getStyle" height="100%">
    <ActionBar title="Laced">
      <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="goBack"/>
    </ActionBar>
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
    },
    paddingConfig: Object
  },
  created() {
    EventBus.$on('getPageRef', (cb) => {
      cb(this.$refs.pageRef.nativeView)
    })
    EventBus.$on('auth:noUser', () => {
      this.$store.dispatch('authentication/logout')
    })
  },
  destroyed() {
    EventBus.$off('getPageRef')
    EventBus.$off('auth:noUser')
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
  },
  methods: {
    goBack() {
      this.$navigateBack()
    }
  },
  components: {
    LoadingIndicator
  }
}
</script>