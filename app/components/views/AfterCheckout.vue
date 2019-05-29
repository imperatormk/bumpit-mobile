<template>
  <ViewContainer>
    <FlexboxLayout flexDirection="column" alignItems="center" width="90%">
      <FlexboxLayout flexDirection="column" alignItems="center" justifyContent="space-around" width="50%">
        <Label :text="'Your payment is being processed, ' + order.buyer.name" fontSize="22" color="black" textWrap="true" textAlignment="center"/>
        <StackLayout height="10"/>
        <Label text="We'll let you know once your payment is successful. You can check the status of your orders in the profile tab." fontSize="18" color="#8c8c8c" textWrap="true" textAlignment="center"/>
      </FlexboxLayout>
      <StackLayout height="30"/>

      <ItemBasics :item="order.item"/>
      <StackLayout height="10"/>

      <FlexboxLayout justifyContent="space-between" width="100%">
        <Label class="label" text="Item price" fontSize="16"/>
        <Label :text="getPrice" color="black" fontSize="16"/>
      </FlexboxLayout>
      <StackLayout height="20"/>
    </FlexboxLayout>
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
    }
  },
  components: {
    ItemBasics
  }
}
</script>