<template>
  <ViewContainer :loading="!loaded">
    <FlexCol :height="!products.length ? '100%' : 'auto'">
      <UserBasics :user="user">
        <FlexCol>
          <LabelButton :text="`@${user.username}`"/>
          <Split small/>
          <Label fontSize="16" :text="user.location"/>
        </FlexCol>
        <FlexCol v-if="isLoggedIn && isMe" slot="actions" justifyContent="space-around">
          <StateButton @onTap="gotoEditProfile" text="Edit" inactive/>
        </FlexCol>
      </UserBasics>

      <Split big/>
      <FlexRow justifyContent="space-around">
        <FlexCol v-if="decimalRating" alignItems="center">
          <StarRating fontWeight="bold" color="#0076ff" dense>
            <Label :text="decimalRating" color="black" fontSize="25" fontWeight="bold"/>
          </StarRating>
          <Label text="Rating"/>
        </FlexCol>
        <FlexCol alignItems="center">
          <Label :text="reviewsCount" color="black" fontSize="25" fontWeight="bold"/>
          <Label text="Reviews"/>
        </FlexCol>
        <StackLayout @tap="gotoConnections">
          <FlexCol alignItems="center">
            <Label :text="connections.followers" color="black" fontSize="25" fontWeight="bold"/>
            <Label text="Followers"/>
          </FlexCol>
        </StackLayout>
        <StackLayout @tap="gotoConnections">
          <FlexCol alignItems="center">
            <Label :text="connections.followees" color="black" fontSize="25" fontWeight="bold"/>
            <Label text="Following"/>
          </FlexCol>
        </StackLayout>
      </FlexRow>

      <Split big/>
      <Label @tap="gotoEditProfile" fontSize="16" :text="user.bio || noBioMesssage" textWrap="true"/>

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

    <FlexCol slot="scrollable">
      <FlexRow flexWrap="wrap">
        <StackLayout v-for="product in products" :key="product.id" width="50%">
          <ProductSummary @selected="gotoProductDetails(product)" :product="product"/>
        </StackLayout>
      </FlexRow>
      <StackLayout v-if="hasMore">
        <Split big/>
        <StateButton text="Load more" @onTap="loadMoreProducts" block/>
      </StackLayout>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import UserBasics from '@/components/blocks/user/UserBasics'
import ProductSummary from '@/components/blocks/product/ProductSummary'
import Auth from '@/services/auth'
import Api from '@/services/api'
import EventBus from '@/services/event-bus'

export default {
  props: {
    userId: {
      type: Number,
      default: null
    }
  },
  mounted() {
    const { userId } = this
    const userAction = !userId ? this.getAuthUser() : this.getUser(userId)

    this.pagination = { ...this.defaultPagination }
    return userAction
      .then(user => this.getConnections(user.id)
        .then(connections => ({ ...user, connections }))
      )
      .then((user) => {
        this.user = user
        return this.loadMoreProducts(true)
      })
      .finally(() => {
        this.loaded = true
      })
  },
  data: () => ({
    user: {},
    pagination: {},
    products: [],
    totalProducts: 0,
    productsGroup: 0,
    noBioMesssage: 'Tap to add a bio to let community know more about you',
    noItemMessages: [
      'List an item to sale',
      'No liked items'
    ],
    defaultPagination: {
      page: 1,
      size: 6
    },
    loaded: false
  }),
  computed: {
    decimalRating() {
      const rating = this.user.rating
      return rating ? rating.toFixed(1) : null
    },
    reviewsCount() {
      const reviews = this.user.reviews
      return reviews ? reviews.length : 0
    },
    connections() {
      const defaultValues = {
        followers: '/',
        followees: '/'
      }
      const connections = this.user.connections
      return Object.assign({}, defaultValues, connections)
    },
    hasMore() {
      return this.totalProducts > this.products.length
    },
    isMe() {
      return this.isLoggedIn && (this.user.id === this.loggedInUser.id)
    }
  },
  methods: {
    getAuthUser() {
      return Auth.getAuthUser()
    },
    getUser(userId) {
      return Api.getUser(userId)
    },
    getConnections(userId) {
      return Api.getConnections(userId, { count: true })
        .then((connections) => {
          return connections
        })
    },
    changeProductsGroup(productsGroup) {
      this.productsGroup = productsGroup
      this.pagination = { ...this.defaultPagination }
      this.products = []
      this.loadMoreProducts(true)
    },
    loadMoreProducts(first) {
      if (!this.hasMore && !first) return Promise.resolve()

      const userProducts = Api.getProducts({ selId: this.user.id }, this.pagination)
      const likedProducts = Api.getUserLikedProducts(this.user.id, this.pagination)

      let action = null
      switch (this.productsGroup) {
        case 0:
          action = userProducts
          break
        case 1:
          action = likedProducts
          break
      }
      if (action) {
        action.then((result) => {
          this.products.push(...result.content)
          this.totalProducts = result.totalElements
          this.pagination.page += 1
        })
      }
    },
    gotoProductDetails(product) {
      EventBus.$emit('navigateTo', 'ProductDetails', { productId: product.id })
    },
    gotoEditProfile() {
      EventBus.$emit('navigateTo', 'EditProfile')
    },
    gotoConnections() {
      EventBus.$emit('navigateTo', 'Connections', { userId: this.user.id })
    }
  },
  components: {
    UserBasics,
    ProductSummary
  }
}
</script>