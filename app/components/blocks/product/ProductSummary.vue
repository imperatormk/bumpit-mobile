<template>
  <StackLayout @tap="$emit('selected', product)">
    <FlexCol padding="5">
      <Image :class="classes" :src="firstImage"/>
      <StackLayout v-if="!simple" padding="4" backgroundColor="#dee1e7" class="rounded-bot" width="100%">
        <Label :text="product.title" fontSize="12"/>
        <Label :text="getPrice" fontSize="12"/>
      </StackLayout>
    </FlexCol>
  </StackLayout>
</template>

<script>
import System from '@/data/system'

export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    simple: Boolean
  },
  computed: {
    getPrice() { // move to helpers
      return `${this.product.price} ${this.product.currency}`
    },
    firstImage() {
      if (!this.product.images.length) return ''
      return `${System.serverUrl}${this.product.images[0].url}`
    },
    classes() {
      return {
        'rounded-top': true,
        'rounded-bot': this.simple
      }
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
