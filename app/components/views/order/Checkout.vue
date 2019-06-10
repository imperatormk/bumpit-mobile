<template>
  <ViewContainer :loading="!loaded">
    <FlexCol height="100%">
      <ProductBasics :product="product"/>
      <Split big/>
      <FlexCol justifyContent="space-between"  @tap="gotoPaymentDetails">
        <Label @tap="gotoPaymentDetails" text="Payment details" fontSize="18" fontWeight="bold" color="black"/>
        <Label @tap="gotoPaymentDetails" :text="paymentDetails.token || ''" fontSize="16"/>
      </FlexCol>
      <Split big/>
      <DataGrid :data="chargeItems"/>
      <Split fill/>
      <StateButton @onTap="placeOrder" block text="Place order"/>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import ProductBasics from '@/components/blocks/product/ProductBasics'
import PaymentDetails from '@/components/views/order/PaymentDetails'
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
    paymentDetails: {
      token: null,
      cardNo: '',
      payerDetails: {}
    },
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
    gotoPaymentDetails() {
      EventBus.$emit('navigateTo', 'PaymentDetails', { value: this.paymentDetails })

      this.$showModal(PaymentDetails, {
        animated: true,
        fullscreen: false,
        transition: {
          name: 'fade'
        },
        props: {
          detailsProp: { ...this.paymentDetails }
        }
      }).then((data) => {
        this.paymentDetails = data
      })
    },
    placeOrder() {
      const orderObj = {
        paymentToken: this.paymentDetails.token,
        productId: this.productId,
        ...this.paymentDetails.payerDetails
      }
      Api.performOrder(orderObj)
        .then((orderRes) => {
          EventBus.$emit('navigateTo', 'AfterCheckout', { orderProp: orderRes })
        })
    }
  },
  components: {
    ProductBasics
  }
}
</script>