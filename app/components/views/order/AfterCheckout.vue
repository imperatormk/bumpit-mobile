<template>
  <ViewContainer>
    <FlexCol slot="scrollable">
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
      <Split/>
      <StateButton @onTap="gotoOrderDetails" block text="See details"/>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import ProductBasics from '@/components/blocks/product/ProductBasics'
import EventBus from '@/services/event-bus'

export default {
  props: {
    orderProp: {
      type: Object,
      default: null
    }
  },
  created() {
    this.order = { ...this.orderProp }
  },
  data: () => ({
    order: {}
  }),
  computed: {
    chargeItems() { // rename later
      const chargesList = this.order.chargesList
      if (!chargesList) return []
      const charges = chargesList.map((charge) => {
        const label = charge.name
        const flat = charge.flat
        const percentage = charge.percentage
        const chargeObj = { label }
        chargeObj.value = ''
        if (percentage) chargeObj.value += `${percentage}%`
        if (chargeObj.value) chargeObj.value += ' + '
        if (flat) chargeObj.value += `${flat.currency}${flat.amount/100}`
        return chargeObj
      })
      charges.push({ label: 'total', value: this.order.total/100 })
      return charges
    }
  },
  methods: {
    gotoOrderDetails() {
      EventBus.$emit('navigateTo', 'OrderDetailsBase', { orderId: this.order.id })
    }
  },
  components: {
    ProductBasics
  }
}
</script>