<template>
  <ViewContainer>
    <FlexCol alignItems="center" justifyContent="space-around" height="80%">
      <Label :text="'Purchasing product ID: ' + productId" fontSize="30" color="#8c8c8c"/>
      <GridLayout columns="*" rows="*" width="300" height="300">
        <FlexRow col="0" row="0" flexWrap="wrap" alignItems="space-around" justifyContent="center">
          <Button text="Try me" @tap="stripeTest" id="testt"></Button>
        </FlexRow>
      </GridLayout>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import { Stripe, Card } from 'nativescript-stripe'
import Api from '@/services/api'
import EventBus from '@/services/event-bus'

const stripe = new Stripe('pk_test_GMNKDApw27UoQosG2hsXV1xT')
const cc = new Card('4242424242424242', 12, 21, '069') // temp

export default {
  props: {
    productId: {
      type: Number,
      required: true
    }
  },
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
        const order = {
          token: tokenObj.id
        }
        Api.performOrder(order)
          .then((res) => {
            console.log(res)
          })
      })
    }
  }
}
</script>