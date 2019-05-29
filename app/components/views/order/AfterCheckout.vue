<template>
  <ViewContainer>
    <FlexCol alignItems="center" height="100%">
      <FlexCol alignItems="center" justifyContent="space-around" width="70%">
        <Label :text="'Your payment is being processed, ' + order.buyer.name" fontSize="22" color="black" textWrap="true" textAlignment="center"/>
        <Split size="10"/>
        <Label text="We'll let you know once your payment is successful. You can check the status of your orders in the profile tab." fontSize="18" color="#8c8c8c" textWrap="true" textAlignment="center"/>
      </FlexCol>
      <Split size="50"/>
      <ItemBasics :item="order.item"/>
      <Split big/>
      <DataGrid :data="chargeItems"/>
      <Split fill/>
      <StateButton block text="See details"/>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import ItemBasics from '@/components/blocks/item/ItemBasics'
import mocks from '@/services/mocks'

export default {
  props: {
    orderProp: {
      type: Object,
      required: false
    }
  },
  created() {
    this.order = mocks.order
  },
  data: () => ({
    order: {}
  }),
  computed: {
    getPrice() { // TODO: move this to helpers
      return `${this.order.item.price / 100} ${this.order.item.currency}`
    },
    chargeItems() { // rename later
      return [
        { label: 'Item price', value: '$2.00' },
        { label: 'Shipping price', value: 'Free' },
        { label: 'Total', value: '$2.00' }
      ]
    }
  },
  components: {
    ItemBasics
  }
}
</script>