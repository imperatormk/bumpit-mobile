<template>
  <FlexboxLayout flexDirection="column" padding="5" @tap="$emit('selected', item)">
    <Image class="rounded-top" :src="getItemThumbnail" stretch="aspectFill" />
    <GridLayout verticalAlignment="bottom">
      <StackLayout padding="4" backgroundColor="#dee1e7" class="rounded-bot" width="100%">
        <Label :text="item.title" fontSize="12"/>
        <Label :text="item.price" fontSize="12"/>
      </StackLayout>
    </GridLayout>
  </FlexboxLayout>
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
    getItemThumbnail() {
      return 'https://via.placeholder.com/300'
    },
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
