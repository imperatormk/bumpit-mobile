<template>
  <ViewContainer>
    <FlexCol height="100%">
      <FlexCol alignItems="center">
        <Label :text="'Your payment is being processed, ' + order.buyer.name" fontSize="22" color="black" textWrap="true" textAlignment="center"/>
        <Split big/>
        <Label text="We'll let you know once your payment is successful. You can check the status of your orders in the profile tab." fontSize="18" color="#8c8c8c" textWrap="true" textAlignment="center"/>
      </FlexCol>
      <Split big/>
      <Split big/>
      <Split big/>
      <ProductBasics :product="order.product"/>
      <Split big/>
      <DataGrid :data="chargeItems"/>
      <Split fill/>
      <StateButton @onTap="gotoOrder" block text="See details"/>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import ProductBasics from '@/components/blocks/product/ProductBasics'
import EventBus from '@/services/event-bus'
import mocks from '@/services/mocks'

export default {
  props: {
    orderProp: {
      type: Object,
      default: null
    }
  },
  created() {
    this.order = this.orderProp || mocks.order
  },
  data: () => ({
    order: {}
  }),
  computed: {
    getPrice() { // TODO: move this to helpers
      return `${this.order.product.price / 100} ${this.order.product.currency}`
    },
    chargeItems() { // rename later
      return [
        { label: 'Item price', value: '$2.00' },
        { label: 'Shipping price', value: 'Free' },
        { label: 'Total', value: '$2.00' }
      ]
    }
  },
  methods: {
    gotoOrder() {
      EventBus.$emit('navigateTo', 'OrderDetailsBase', { orderId: this.order.id }) // should be orderProp?
    }
  },
  components: {
    ProductBasics
  }
}
</script>