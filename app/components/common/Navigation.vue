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
  data: () => ({
    selectedIndex: 0
  }),
  methods: {
    menuPageChanged(e) {
      const selectedIndex = e.value
      this.selectedIndex = selectedIndex
      EventBus.$emit('menuPageChanged', selectedIndex)
    }
  }
}
</script>