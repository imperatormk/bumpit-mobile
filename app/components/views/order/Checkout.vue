<template>
  <ViewContainer :loading="!loaded">
    <FlexCol slot="scrollable">
      <ProductBasics :product="product"/>
      <Split big/>
      <FlexCol justifyContent="space-between" @tap="gotoPaymentDetails">
        <Label @tap="gotoPaymentDetails" text="Payment details" fontSize="18" fontWeight="bold" color="black"/>
        <Split/>
        <Label @tap="gotoPaymentDetails" :text="paymentDetails.token || 'None'" fontSize="16"/>
      </FlexCol>
      <Split big/>
      <FlexCol justifyContent="space-between" @tap="gotoShippingDetails">
        <Label @tap="gotoShippingDetails" text="Shipping details" fontSize="18" fontWeight="bold" color="black"/>
        <FlexCol v-if="shippingInfo">
          <Split/>
          <Label @tap="gotoShippingDetails" :text="shippingInfo.fullname" fontSize="16"/>
          <Label @tap="gotoShippingDetails" :text="shippingInfo.address" fontSize="16"/>
          <Label @tap="gotoShippingDetails" :text="shippingInfo.city + ' ' + shippingInfo.zipcode" fontSize="16"/>
          <Label @tap="gotoShippingDetails" :text="shippingInfo.state" fontSize="16"/>
        </FlexCol>
        <Label v-else text="None" fontSize="16"/>
      </FlexCol>
      <Split big/>
      <Split big/>
      <DataGrid :data="chargeItems"/>
      <Split/>
      <StateButton @onTap="placeOrder" :disabled="ordering" :inactive="ordering" block text="Place order"/>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import ProductBasics from '@/components/blocks/product/ProductBasics'
import PaymentDetails from '@/components/views/order/PaymentDetails'
import ShippingDetails from '@/components/views/account/ShippingDetails'
import Api from '@/services/api'
import EventBus from '@/services/event-bus'

export default {
  props: {
    productId: {
      type: Object,
      required: true
    }
  },
  created() {
    this.getProduct()
      .then(() => this.getShippingInfo())
      .then(() => this.prepareOrder())
      .then(() => {
        this.loaded = true
      })
      .catch((err) => {
        if (err.status === 409) this.$navigateBack()
      })
  },
  data: () => ({
    product: {},
    order: {},
    paymentDetails: {
      token: null,
      cardNo: '',
      payerDetails: null
    },
    shippingInfo: null,
    extras: ['authenticationService'],
    ordering: false,
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
      charges.push({ label: 'total', value: this.order.total/100 })
      return charges
    }
  },
  methods: {
    getProduct() {
      return Api.getProduct(this.productId)
        .then((product) => {
          this.product = product
        })
        .catch((err) => Promise.reject({
          status: err.response.status,
          message: err.response.data.msg
        }))
    },
    getShippingInfo() {
      return Api.getShippingInfo()
        .then((shippingInfo) => {
          this.shippingInfo = shippingInfo
        })
    },
    gotoPaymentDetails() {
      this.$showModal(PaymentDetails, {
        animated: true,
        fullscreen: true,
        transition: {
          name: 'fade'
        },
        props: {
          detailsProp: {
            ...this.paymentDetails,
            payerDetails: this.paymentDetails.payerDetails || this.shippingInfo
          }
        }
      }).then((data) => {
        if (data) this.paymentDetails = data
      })
    },
    gotoShippingDetails() {
      this.$showModal(ShippingDetails, {
        animated: true,
        fullscreen: true,
        transition: {
          name: 'fade'
        },
        props: {
          detailsProp: !!this.shippingInfo ? { ...this.shippingInfo } : null
        }
      }).then((data) => {
        if (data) {
          this.shippingInfo = data
          this.paymentDetails.payerDetails = data
        }
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
        .catch((err) => Promise.reject({
          status: err.response.status,
          message: err.response.data.msg
        }))
    },
    placeOrder() {
      const orderObj = { // we don't need shipping data here (maybe try the same for payer details?)
        paymentToken: this.paymentDetails.token,
        productId: this.productId,
        ...this.paymentDetails.payerDetails
      }
      this.ordering = true
      Api.performOrder(orderObj)
        .then((resp) => {
          EventBus.$emit('navigateTo', 'AfterCheckout', {
            orderProp: {
              ...resp.order,
              chargesList: resp.chargesList,
              total: resp.total
            }
          })
        })
        .catch((err) => {
          const errObj = {
            status: err.response.status,
            message: err.response.data.msg
          }
          if (errObj.status === 409) this.$navigateBack()
        })
        .finally(() => {
          this.ordering = false
        })
    }
  },
  components: {
    ProductBasics
  }
}
</script>