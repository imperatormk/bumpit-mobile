<template>
  <StackLayout>
    <ScrollView orientation="horizontal" :scrollBarIndicatorVisible="false">
      <FlexRow>
        <StackLayout v-for="(item, idx) in items" :key="idx" @tap="selectItem(item, idx)" :backgroundColor="selectedIndex === idx ? 'black' : 'white'" :padding="padding">
          <Label :text="getText(item)" :color="selectedIndex === idx ? 'white' : 'black'"/>
        </StackLayout>
      </FlexRow>
    </ScrollView>
  </StackLayout>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    padding: {
      type: String,
      default: '0'
    }
  },
  data: () => ({
    selectedIndex: -1
  }),
  methods: {
    selectItem(item, index) {
      this.selectedIndex = index
      this.$emit('selected', item)
    },
    getText(item) {
      return item.text || item.name || item
    }
  }
}
</script>