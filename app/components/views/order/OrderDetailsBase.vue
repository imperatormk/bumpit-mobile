<template>
  <ViewContainer :loading="!loaded">
    <ScrollView orientation="vertical">
      <FlexCol alignItems="center" justifyContent="space-around" height="100%">
        <ItemBasics :item="order.item" vertical/>
        <FlexCol class="feedback" width="100%">
          <FlexRow justifyContent="space-between" alignItems="center">
            <Label fontWeight="bold" fontSize="18" text="Feedback"/>
            <LabelButton text="Leave feedback"/>
          </FlexRow>
          <Split small/>
          <Label text="Let us how your transaction went"/>
        </FlexCol>
        <FlexCol class="shipping" width="100%">
          <FlexRow justifyContent="space-between" alignItems="center">
            <Label fontWeight="bold" fontSize="18" text="Shipping address"/>
            <LabelButton text="Resolve shipping issue"/>
          </FlexRow>
          <Split small/>
          <Label :text="order.shippingAddress"/>
        </FlexCol>
        <FlexCol class="payment" width="100%">
          <FlexRow justifyContent="space-between" alignItems="center">
            <Label fontWeight="bold" fontSize="18" text="Payment"/>
            <LabelButton text="Ask for refund"/>
          </FlexRow>
          <Split small/>
          <Label text="Payment sent over Stripe"/>
        </FlexCol>
        <FlexCol class="charges" width="100%">
          <DataGrid :data="chargeItems"/>
        </FlexCol>
        <FlexCol class="seller" width="100%">
          <FlexRow justifyContent="space-between" alignItems="center">
            <Label fontWeight="bold" fontSize="18" text="Seller"/>
            <LabelButton text="Message seller"/>
          </FlexRow>
          <Split small/>
          <Label :text="'Purchase on ' + order.createdAt + ' from ' + order.buyer.username"/>
        </FlexCol>
        <Split fill/>
        <StateButton block text="Mark received"/>
      </FlexCol>
    </ScrollView>
  </ViewContainer>
</template>

<script>
import Api from '@/services/api'
import ItemBasics from '@/components/blocks/item/ItemBasics'
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
    ItemBasics
  }
}

</script>