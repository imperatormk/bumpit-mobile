<template>
  <StackLayout @tap="gotoOrderDetails">
    <FlexRow alignItems="center" width="100%">
      <Image :src="firstImage" width="20%" class="rounded-top rounded-bot"/>
      <FlexRow justifyContent="space-around" alignItems="center" flexGrow="1">
        <FlexCol justifyContent="center">
          <Label :text="product.title" fontWeight="bold" color="black" fontSize="18" padding="3"/>
          <Label :text="createdAt" fontSize="16" padding="3"/>
          <Label :text="order.status" fontSize="16" padding="3"/>
        </FlexCol>
        <FlexRow alignSelf="flex-start">
          <Label :text="getPrice" borderRadius="20" backgroundColor="#dee1e7" fontSize="13" padding="5 10" color="black"/>
        </FlexRow>
      </FlexRow>
    </FlexRow>
  </StackLayout>
</template>

<script>
import System from '@/data/system'
import EventBus from '@/services/event-bus'
import helpers from '@/helpers'

export default {
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  computed: {
    product() {
      return this.order.product
    },
    getPrice() { // move to helpers
      return `${this.product.price}`
    },
    firstImage() {
      if (!this.product.images.length) return ''
      return `${System.serverUrl}${this.product.images[0].url}`
    },
    createdAt() {
      return helpers.formatDate(this.order.createdAt)
    }
  },
  methods: {
    gotoOrderDetails() {
      EventBus.$emit('navigateTo', 'OrderDetailsBase', { orderId: this.order.id })
    }
  }
}
</script>