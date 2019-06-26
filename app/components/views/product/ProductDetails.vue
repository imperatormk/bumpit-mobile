<template>
  <ViewContainer :loading="!loaded" :paddingConfig="{def: '0'}">
    <GridLayout v-if="!!product.images.length" columns="*" rows="*" height="55%">
      <StackLayout col="0" row="0">
        <Carousel indicatorColor="#0076ff">
          <CarouselItem v-for="image in product.images" :key="image.id" backgroundColor="#fefefe" verticalAlignment="middle">
            <StackLayout>
              <Image stretch="aspectFill" :src="getImageUrl(image)"/>
            </StackLayout>
          </CarouselItem>
        </Carousel>
      </StackLayout>

      <StackLayout col="0" row="0" paddingRight="20" paddingBottom="10">
        <FlexRow justifyContent="flex-end" alignItems="flex-end" height="100%">
          <FlexRow width="50" height="50" backgroundColor="#0076ff" borderRadius="50%" alignItems="center" justifyContent="center">
            <Label fontSize="24" class="far" color="white" :text="'\uf004'"/>
          </FlexRow>
        </FlexRow>
      </StackLayout>
    </GridLayout>

    <Split big/>
    <FlexCol slot="scrollable">
      <FlexRow>
        <FlexRow flexGrow="3">
          <Label :text="product.title" fontSize="24"/>
        </FlexRow>
        <FlexRow flexGrow="1" justifyContent="flex-end">
          <Label :text="getPrice" fontSize="24"/>
        </FlexRow>
      </FlexRow>

      <Split/>
      <FlexRow justifyContent="space-between" alignItems="center">
        <Label :text="'Size: ' + product.size" fontSize="16"/>
        <Label :text="'Condition: ' + product.condition" fontSize="16"/>
      </FlexRow>

      <Split/>
      <FlexRow justifyContent="space-between" alignItems="center">
        <Label :text="'Location: ' + product.location" fontSize="16"/>
        <Label :text="'Seller: @' + product.seller.username" fontSize="16"/>
      </FlexRow>

      <Split big/>
      <Label class="description" :textWrap="true" :text="product.details" fontSize="16"/>

      <Split big/>
      <FlexRow justifyContent="space-between" alignItems="center">
        <FlexCol>
          <UserBasics :user="product.seller" fontSize="18">
            <StarRating v-if="product.seller.rating" :rating="product.seller.rating" dense/>
          </UserBasics>
        </FlexCol>
        <FlexCol v-if="isAvailable">
          <StateButton inactive @onTap="gotoConversation" class="far" :text="'\uf075'"/>
          <StackLayout margin="3"/>
          <StateButton @onTap="gotoCheckout" text="Buy"/>
        </FlexCol>
      </FlexRow>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import UserBasics from '@/components/blocks/user/UserBasics'
import System from '@/data/system'
import Api from '@/services/api'
import EventBus from '@/services/event-bus'

export default {
  props: {
    productId: {
      type: Number,
      required: true
    }
  },
  created() {
    Api.getProduct(this.productId)
      .then((product) => {
        this.product = product
        this.loaded = true
      })
  },
  data: () => ({
    product: { seller: {}, images: [] }, // this is bs
    loaded: false
  }),
  computed: {
    getPrice() { // move to helpers
      return `${this.product.price} ${this.product.currency}`
    },
    isAvailable() {
      return this.product.status === 'AVAILABLE'
    },
  },
  methods: {
    getImageUrl(image) {
      return `${System.serverUrl}${image.url}`
    },
    gotoConversation() {
      EventBus.$emit('navigateTo', 'Conversation', { productId: this.productId })
    },
    gotoCheckout() {
      EventBus.$emit('navigateTo', 'Checkout', { productId: this.productId })
    }
  },
  components: {
    UserBasics
  }
}
</script>