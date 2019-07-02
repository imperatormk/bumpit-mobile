<template>
  <ViewContainer :loading="!loaded">
    <FlexCol slot="scrollable">
      <CreditCardView id="card"/>
      <MyDetails v-model="details"/>
      <Split/>
      <StateButton @onTap="updateDetails" :disabled="updating" :inactive="updating" block text="Add payment details"/>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import { Stripe, Card } from 'nativescript-stripe'
import { topmost } from 'ui/frame'
import MyDetails from '@/components/blocks/user/MyDetails'
import Api from '@/services/api'
import EventBus from '@/services/event-bus'

const stripe = new Stripe('pk_test_GMNKDApw27UoQosG2hsXV1xT')

export default {
  props: {
    detailsProp: {
      type: Object,
      default: null
    }
  },
  mounted() {
    if (this.detailsProp && this.detailsProp.payerDetails)
      this.details = { ...this.detailsProp.payerDetails }

    EventBus.$emit('getPageRef', (ref) => {
      this.pageRef = ref
    })

    this.loaded = true
  },
  data: () => ({
    pageRef: null,
    details: {
      fullname: '',
      address: '',
      unit: '',
      state: '',
      city: '',
      zipcode: '',
      contactPhone: ''
    },
    updating: false,
    loaded: false
  }),
  methods: {
    updateDetails() {
      const details = Object.keys(this.details).map(key => this.details[key])
      const valid = details.filter(detail => !detail).length === 0
      if (!valid) return // TODO: all are required atm

      const card = this.pageRef.getViewById('card').card
      this.updating = true
      stripe.createToken(cc, (error, tokenObj) => {
        this.updating = false
        if (error) return
        const paymentDetails = {
          token: tokenObj.id,
          payerDetails: { ...this.details }
        }
        this.$modal.close(paymentDetails)
      })
    }
  },
  components: {
    MyDetails
  }
}
</script>