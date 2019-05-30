<template>
  <ViewContainer :loading="!loaded">
    <ScrollView orientation="vertical">
      <FlexCol>
        <ProductBasics :product="order.product" vertical/>
        <Split big/>
        <FlexCol class="feedback" width="100%">
          <FlexRow justifyContent="space-between" alignItems="center">
            <Label fontWeight="bold" fontSize="18" text="Feedback"/>
            <LabelButton text="Leave feedback"/>
          </FlexRow>
          <Split small/>
          <Label text="Let us how your transaction went"/>
        </FlexCol>
        <Split big/>
        <FlexCol class="shipping" width="100%">
          <FlexRow justifyContent="space-between" alignItems="center">
            <Label fontWeight="bold" fontSize="18" text="Shipping address"/>
            <LabelButton text="Resolve shipping issue"/>
          </FlexRow>
          <Split small/>
          <Label :text="order.shippingAddress"/>
        </FlexCol>
        <Split big/>
        <FlexCol class="payment" width="100%">
          <FlexRow justifyContent="space-between" alignItems="center">
            <Label fontWeight="bold" fontSize="18" text="Payment"/>
            <LabelButton text="Ask for refund"/>
          </FlexRow>
          <Split small/>
          <Label text="Payment sent over Stripe"/>
        </FlexCol>
        <Split big/>
        <FlexCol class="charges" width="100%">
          <DataGrid :data="chargeItems"/>
        </FlexCol>
        <Split big/>
        <FlexCol class="seller" width="100%">
          <FlexRow justifyContent="space-between" alignItems="center">
            <Label fontWeight="bold" fontSize="18" text="Seller"/>
            <LabelButton text="Message seller"/>
          </FlexRow>
          <Split small/>
          <Label :text="'Purchase on ' + order.createdAt + ' from ' + order.buyer.username"/>
        </FlexCol>
        <Split/>
        <UserBasics :user="order.product.seller" fontSize="18">
          <LabelButton :text="`@${order.product.seller.username}`"/>
        </UserBasics>
        <Split big/>
        <StateButton block text="Mark received"/>
      </FlexCol>
    </ScrollView>
  </ViewContainer>
</template>

<script>
import ProductBasics from '@/components/blocks/product/ProductBasics'
import UserBasics from '@/components/blocks/user/UserBasics'
import Api from '@/services/api'
import mocks from '@/services/mocks'

export default {
  props: {
    orderId: {
      type: Number,
      required: true
    }
  },
  created() {
    this.order = mocks.order
    this.loaded = true
    return false
    Api.getOrder(this.orderId)
      .then((order) => {
        this.order = order
        this.loaded = true
      })
  },
  data: () => ({
    order: {},
    loaded: false
  }),
  computed: {
    chargeItems() { // rename later
      return [
        { label: 'Item price', value: '$2.00' },
        { label: 'Shipping price', value: 'Free' },
        { label: 'Total', value: '$2.00' }
      ]
    }
  },
  components: {
    ProductBasics,
    UserBasics
  }
}

</script>