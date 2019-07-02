<template>
  <StackLayout @tap="$emit('selected', product)">
    <GridLayout columns="*" :rows="rows" padding="5">
      <StackLayout col="0" row="0">
        <Image :class="classes" :src="firstImage"/>
      </StackLayout>

      <StackLayout v-if="product.status === 'SOLD'" col="0" row="0" paddingRight="10" marginBottom="10">
        <FlexRow justifyContent="flex-end" alignItems="flex-end" height="100%">
          <Label text="SOLD" borderRadius="20" backgroundColor="#dee1e7" fontSize="13" padding="5 10" color="black"/>
        </FlexRow>
      </StackLayout>

      <StackLayout col="0" row="1" v-if="!simple" padding="5" backgroundColor="#dee1e7" class="rounded-bot" width="100%">
        <Label :text="product.title" fontSize="12"/>
        <Label v-if="product.status === 'AVAILABLE'" :text="getPrice" fontSize="12"/>
      </StackLayout>
    </GridLayout>
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
      return `${this.product.price}`
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
    },
    rows() {
      if (this.simple) return '*'
      return '* auto'
    }
  }
}
</script>
