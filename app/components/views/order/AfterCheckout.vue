<template>
  <ViewContainer>
    <FlexCol alignItems="center" height="100%">
      <FlexCol alignItems="center" justifyContent="space-around" width="70%">
        <Label :text="'Your payment is being processed, ' + order.buyer.name" fontSize="22" color="black" textWrap="true" textAlignment="center"/>
        <StackLayout height="10"/>
        <Label text="We'll let you know once your payment is successful. You can check the status of your orders in the profile tab." fontSize="18" color="#8c8c8c" textWrap="true" textAlignment="center"/>
      </FlexCol>
      <Split size="50"/>
      <ItemBasics :item="order.item"/>
      <Split big/>
      <DataGrid :data="chargeItems"/>
      <Split fill/>
      <StateButton block text="See details"/>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import ItemBasics from '@/components/blocks/item/ItemBasics'

export default {
  props: {
    orderProp: {
      type: Object,
      required: false
    }
  },
  data: () => ({
    order: {
      buyer: {
        name: 'Darko'
      },
      item: {
        title: 'Yezzy hand bag 750',
        category: {
          name: 'Accessory'
        },
        price: 1421,
        currency: 'USD',
        images: [{
          url: 'https://via.placeholder.com/300x300'
        }]
      }
    }
  }),
  computed: {
    getPrice() { // TODO: move this to helpers
      return `${this.order.item.price / 100} ${this.order.item.currency}`
    },
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