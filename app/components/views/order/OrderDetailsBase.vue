<template>
  <ViewContainer :loading="!loaded">
    <FlexCol slot="scrollable">
      <ProductBasics :product="order.product" vertical/>

      <FlexCol class="feedback" width="100%">
        <Split big/>
        <FlexRow justifyContent="space-between" alignItems="center">
          <Label fontWeight="bold" fontSize="18" text="Feedback"/>
          <LabelButton text="Leave feedback"/>
        </FlexRow>
        <Split small/>
        <Label text="Let us how your transaction went"/>
      </FlexCol>

      <FlexCol v-if="order.shipping" class="shipping" width="100%">
        <Split big/>
        <FlexRow justifyContent="space-between" alignItems="center">
          <Label fontWeight="bold" fontSize="18" text="Shipping address"/>
          <LabelButton text="Resolve shipping issue"/>
        </FlexRow>
        <Split small/>
        <Label :text="order.shipping.address"/>
      </FlexCol>

      <FlexCol class="payment" width="100%">
        <Split big/>
        <FlexRow justifyContent="space-between" alignItems="center">
          <Label fontWeight="bold" fontSize="18" text="Payment"/>
          <LabelButton text="Ask for refund"/>
        </FlexRow>
        <Split small/>
        <Label text="Payment sent over Stripe"/>
      </FlexCol>

      <FlexCol class="charges" width="100%">
        <Split big/>
        <DataGrid :data="chargeItems"/>
      </FlexCol>

      <FlexCol width="100%">
        <Split big/>
        <FlexRow justifyContent="space-between" alignItems="center">
          <Label fontWeight="bold" fontSize="18" :text="(isBuyer ? 'Seller' : 'Buyer')"/>
          <LabelButton @onTap="gotoConversation" :text="'Message ' + (isBuyer ? 'seller' : 'buyer')"/>
        </FlexRow>
        <Split small/>
        <Label :text="(isBuyer ? 'Sold' : 'Purchased') + ' on ' + createdAt + ' ' + (isBuyer ? 'to' : 'from') + ' @' + (oppositeUser.username)"/>
      </FlexCol>

      <Split big/>
      <UserBasics :user="oppositeUser" fontSize="18">
        <LabelButton :text="`@${oppositeUser.username}`"/>
      </UserBasics>

      <Split big/>
      <StateButton block text="Mark received"/>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import ProductBasics from '@/components/blocks/product/ProductBasics'
import UserBasics from '@/components/blocks/user/UserBasics'
import Api from '@/services/api'
import helpers from '@/helpers'

export default {
  props: {
    orderId: {
      type: Number,
      required: true
    }
  },
  created() {
    Api.getOrder(this.orderId)
      .then((order) => {
        this.order = order
        this.loaded = true
      })
  },
  data: () => ({
    order: { buyer: {}, product: { seller: {} } }, // ffs
    loaded: false
  }),
  computed: {
    chargeItems() { // rename later
      return [
        { label: 'Item price', value: '$2.00' },
        { label: 'Shipping price', value: 'Free' },
        { label: 'Total', value: '$2.00' }
      ]
    },
    createdAt() {
      return helpers.formatDate(this.order.createdAt)
    },
    userSide() {
      return this.order.userRoleInOrder
    },
    isBuyer() { // assumes seller otherwise
      return this.userSide === 'buyer'
    },
    oppositeUser() { // assumes seller otherwise
      if (this.isBuyer) return this.order.product.seller
      return this.order.buyer
    }
  },
  methods: {
    gotoConversation() {
      const userId = this.oppositeUser.id
      //  TODO: finish this when conversations are done
    }
  },
  components: {
    ProductBasics,
    UserBasics
  }
}

</script>