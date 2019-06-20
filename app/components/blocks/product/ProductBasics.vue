<template>
  <FlexRow alignItems="center" width="100%" v-if="!vertical">
    <Image :src="firstImage" width="20%"/>
    <FlexCol justifyContent="center" marginLeft="15">
      <Label :text="product.title" fontWeight="bold" color="black" fontSize="18" padding="3"/>
      <Label v-if="product.category" :text="product.category.name" fontSize="16" padding="3"/>
    </FlexCol>
  </FlexRow>
  <FlexCol alignItems="center" width="100%" v-else>
    <Image :src="firstImage" width="30%"/>
    <Split size="2"/>
    <Label :text="product.title" fontWeight="bold" color="black" fontSize="20" padding="3"/>
  </FlexCol>
</template>

<script>
// do we want this with 'vertical' like this? maybe create another one if needed
// as in, 'vertical' means more than just orientation :p

import System from '@/data/system'

export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    vertical: Boolean
  },
  computed: {
    firstImage() {
      if (!this.product.images.length) return ''
      return `${System.apiUrl}${this.product.images[0].url}`
    }
  }
}
</script>
