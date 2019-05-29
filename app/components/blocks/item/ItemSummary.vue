<template>
  <FlexCol padding="5" @tap="$emit('selected', item)">
    <Image class="rounded-top" :src="item.images[0].url" stretch="aspectFill"/>
    <GridLayout verticalAlignment="bottom">
      <StackLayout padding="4" backgroundColor="#dee1e7" class="rounded-bot" width="100%">
        <Label :text="item.title" fontSize="12"/>
        <Label :text="getPrice" fontSize="12"/>
      </StackLayout>
    </GridLayout>
  </FlexCol>
</template>

<script>

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    getPrice() {
      return `${this.item.price} ${this.item.currency}`
    }
  }
}
</script>

<style lang="scss" scoped>
.rounded-top {
  border-top-left-radius: 5;
  border-top-right-radius: 5;
}
.rounded-bot {
  border-bottom-left-radius: 5;
  border-bottom-right-radius: 5;
}
</style>
