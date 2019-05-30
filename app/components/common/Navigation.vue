<template>
  <SegmentedBar @selectedIndexChange="menuPageChanged" :selectedIndex="selectedIndex">
    <SegmentedBarItem class="fas" :title="'\uf015'" />
    <SegmentedBarItem class="far" :title="'\uf004'" />
    <SegmentedBarItem class="fas" :title="'\uf02b'" />
    <SegmentedBarItem class="far" :title="'\uf27a'" />
    <SegmentedBarItem class="far" :title="'\uf007'" />
  </SegmentedBar>
</template>

<script>
import EventBus from '@/services/event-bus'

export default {
  mounted() {
    EventBus.$on('navigateTo', this.navigated)
  },
  destroyed() {
    EventBus.$off('navigateTo', this.navigated)
  },
  data: () => ({
    selectedIndex: 0,
    hasSelection: true,
    views: ['ProductFeed', 'Likes', 'OrderList', 'Messaging', 'Profile']
  }),
  methods: {
    menuPageChanged(e) {
      const selectedIndex = e.value
      this.selectedIndex = selectedIndex
      EventBus.$emit('menuPageChanged', selectedIndex)
    },
    navigated(viewName) {
      const index = this.views.indexOf(viewName)
      this.hasSelection = index >= 0
    }
  }
}
</script>