<template>
  <ViewContainer :loading="!loaded">
    <FlexCol height="100%">
      <ProductBasics :product="product"/>
      <Split/>
      <DataGrid :data="chargeItems"/>
      <Split fill/>
      <StateButton @onTap="placeOrder" block text="Place order"/>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import ProductBasics from '@/components/blocks/product/ProductBasics'
import Api from '@/services/api'
import EventBus from '@/services/event-bus'
import mocks from '@/services/mocks'

export default {
  props: {
    productId: {
      type: Object,
      required: true
    }
  },
  created() {
    this.getProduct()
      .then(this.prepareOrder())
      .then(() => {
        this.loaded = true
      })
  },
  data: () => ({
    product: {},
    order: {},
    extras: ['authenticationService'],
    loaded: false
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
      charges.push({ label: 'Total', value: this.order.total/100 })
      return charges
    }
  },
  methods: {
    getProduct() {
      return Api.getProduct(this.productId)
        .then((product) => {
          this.product = product
        })
    },
    prepareOrder() {
      const orderConfig = {
        productId: this.productId,
        extras: this.extras
      }
      return Api.prepareOrder(orderConfig)
        .then((order) => {
          this.order = order
        })
    },
    placeOrder() {
      console.log('placeOrder')
    }
  },
  components: {
    ProductBasics
  }
}
</script>