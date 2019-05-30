<template>
  <StackLayout @tap="$emit('selected', product)">
    <FlexCol padding="5">
      <Image class="rounded-top" :src="product.images[0].url"/>
      <GridLayout verticalAlignment="bottom">
        <StackLayout padding="4" backgroundColor="#dee1e7" class="rounded-bot" width="100%">
          <Label :text="product.title" fontSize="12"/>
          <Label :text="getPrice" fontSize="12"/>
        </StackLayout>
      </GridLayout>
    </FlexCol>
  </StackLayout>
</template>

<script>

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    getPrice() { // move to helpers
      return `${this.product.price} ${this.product.currency}`
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
