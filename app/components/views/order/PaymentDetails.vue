<template>
  <ViewContainer>
    <FlexCol height="100%">
      <CreditCardView id="card"/>
      <MyDetails v-model="details"/>
      <Split fill/>
      <StateButton @onTap="updateDetails" block text="Add payment details"/>
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
const cc = new Card('4242424242424242', 12, 21, '069') // temp

export default {
  props: {
    detailsProp: {
      type: Object,
      default: null
    }
  },
  mounted() {
    if (this.detailsProp) this.details = { ...this.detailsProp }
    EventBus.$emit('getPageRef', (ref) => {
      this.pageRef = ref
    })
  },
  data: () => ({
    pageRef: null,
    details: {
      name: '',
      address: '',
      suite: '',
      state: '',
      city: '',
      zip: '',
    }
  }),
  methods: {
    updateDetails() {
      const card = this.pageRef.getViewById('card').card

      stripe.createToken(cc, (error, tokenObj) => {
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