<template>
  <ViewContainer :loading="!loaded">
    <FlexCol :height="!products.length ? '100%' : 'auto'">
      <UserBasics :user="user">
        <FlexCol>
          <LabelButton :text="`@${user.username}`"/>
          <Split small/>
          <Label fontSize="16" :text="user.location"/>
        </FlexCol>
        <FlexCol slot="actions" justifyContent="space-around">
          <StateButton @onTap="gotoEditProfile" text="Edit" inactive/>
        </FlexCol>
      </UserBasics>

      <Split big/>
      <FlexRow justifyContent="space-around">
        <FlexCol alignItems="center">
          <StarRating fontWeight="bold" color="#0076ff" dense>
            <Label :text="decimalRating" color="black" fontSize="25" fontWeight="bold"/>
          </StarRating>
          <Label text="Rating"/>
        </FlexCol>
        <FlexCol alignItems="center">
          <Label :text="reviewsCount" color="black" fontSize="25" fontWeight="bold"/>
          <Label text="Reviews"/>
        </FlexCol>
        <FlexCol alignItems="center">
          <Label text="420" color="black" fontSize="25" fontWeight="bold"/>
          <Label text="Followers"/>
        </FlexCol>
        <FlexCol alignItems="center">
          <Label text="420" color="black" fontSize="25" fontWeight="bold"/>
          <Label text="Following"/>
        </FlexCol>
      </FlexRow>

      <Split big/>
      <Label fontSize="16" :text="user.bio || noBioMesssage" textWrap="true"/>

      <Split big/>
      <FlexRow justifyContent="center">
        <StateButton text="Selling" :inactive="productsGroup !== 0" @onTap="changeProductsGroup(0)"/>
        <Split vertical/>
        <StateButton text="Likes" :inactive="productsGroup !== 1" @onTap="changeProductsGroup(1)"/>
      </FlexRow>

      <Split big/>
      <FlexRow v-if="!products.length" flexGrow="1" justifyContent="center" alignItems="center">
        <Label :text="noItemMessages[productsGroup]" fontSize="18"/>
      </FlexRow>
    </FlexCol>

    <StackLayout v-show="!!products.length" slot="scrollable">
      <FlexRow flexWrap="wrap">
        <StackLayout v-for="product in products" :key="product.id" width="50%">
          <ProductSummary :product="product" simple/>
        </StackLayout>
      </FlexRow>
    </StackLayout>
  </ViewContainer>
</template>

<script>
import UserBasics from '@/components/blocks/user/UserBasics'
import ProductSummary from '@/components/blocks/product/ProductSummary'
import Auth from '@/services/auth'
import EventBus from '@/services/event-bus'
import mocks from '@/services/mocks'

export default {
  mounted() {
    this.getAuthUser()
  },
  data: () => ({
    user: {},
    productsGroup: 0,
    products: [],
    noBioMesssage: 'Tap top add a bio to let community know more about you',
    noItemMessages: [
      'List an item to sale',
      'No liked items'
    ],
    loaded: false
  }),
  methods: {
    getAuthUser() {
      this.loaded = false
      return Auth.getAuthUser()
        .then((user) => {
          this.user = user
          this.loaded = true
        })
    },
    changeProductsGroup(productsGroup) {
      this.productsGroup = productsGroup
      this.products.push(mocks.product)
    },
    gotoEditProfile() {
      EventBus.$emit('navigateTo', 'EditProfile')
    }
  },
  computed: {
    decimalRating() {
      const rating = this.user.rating
      return rating ? rating.toFixed(1) : '/'
    },
    reviewsCount() {
      const reviews = this.user.reviews
      return reviews ? reviews.length : 0
    }
  },
  components: {
    UserBasics,
    ProductSummary
  }
}
</script>