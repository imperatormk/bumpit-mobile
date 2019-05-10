<template>
  <ViewContainer>
    <FlexboxLayout flexDirection="column" alignItems="center" justifyContent="space-around" height="80%">
      <Label text="Bump It!" fontSize="30" color="#8c8c8c"/>
      <GridLayout columns="*" rows="*" width="300" height="300">
        <FlexboxLayout col="0" row="0" flexWrap="wrap" alignItems="space-around" justifyContent="center">
          <CreditCardView id="card"/>
          <Button text="Try me" @tap="stripeTest" id="testt"></Button>
        </FlexboxLayout>
      </GridLayout>
    </FlexboxLayout>
  </ViewContainer>
</template>

<script>
import { Stripe, Card } from 'nativescript-stripe'
import EventBus from '@/services/event-bus'
import Api from '@/services/api'

const stripe = new Stripe('pk_test_GMNKDApw27UoQosG2hsXV1xT')
const cc = new Card('4242424242424242', 12, 21, '069') // temp

export default {
  mounted() {
    EventBus.$emit('getPageRef', (ref) => {
      this.pageRef = ref
    })
  },
  data: () => ({
    pageRef: null
  }),
  methods: {
    stripeTest() {
      const card = this.pageRef.getViewById('card').card

      stripe.createToken(cc, (error, tokenObj) => {
        if (error) return
        const purchase = {
          token: tokenObj.id
        }
        Api.performPurchase(purchase)
          .then((res) => {
            console.log(res)
          })
      })
    }
  }
}
</script>