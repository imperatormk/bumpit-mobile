<template>
  <ViewContainer :loading="!loaded">
    <GridLayout columns="*" rows="*" height="55%">
      <StackLayout col="0" row="0">
        <Carousel indicatorColor="#0076ff">
          <CarouselItem v-for="image in item.images" :key="image.id" backgroundColor="#fefefe" verticalAlignment="middle">
            <StackLayout>
              <Image stretch="aspectFill" :src="image.url"/>
            </StackLayout>
          </CarouselItem>
        </Carousel>
      </StackLayout>
      <StackLayout col="0" row="0" paddingRight="20" paddingBottom="10">
        <FlexboxLayout justifyContent="flex-end" alignItems="flex-end" height="100%">
          <FlexboxLayout width="50" height="50" backgroundColor="#0076ff" borderRadius="50%" alignItems="center" justifyContent="center">
            <Label fontSize="24" class="far" color="white" :text="'\uf004'"/>
          </FlexboxLayout>
        </FlexboxLayout>
      </StackLayout>
    </GridLayout>
    <ScrollView orientation="vertical">
      <FlexCol>
        <FlexCol padding="20">
          <FlexboxLayout>
            <FlexboxLayout flexGrow="3">
              <Label :text="item.title" fontSize="24"/>
            </FlexboxLayout>
            <FlexboxLayout flexGrow="1" justifyContent="flex-end">
              <Label :text="getPrice" fontSize="24"/>
            </FlexboxLayout>
          </FlexboxLayout>
          <StackLayout class="hr-light" margin="10 0"/>
          <FlexboxLayout justifyContent="space-between">
            <Label :text="'Size: ' + item.size" fontSize="16"/>
            <Label :text="'Condition: ' + item.condition" fontSize="16"/>
          </FlexboxLayout>
          <StackLayout padding="5"/>
          <FlexboxLayout justifyContent="space-between">
            <Label :text="'Location: ' + item.location" fontSize="16"/>
            <Label :text="'Seller: @' + item.seller.username" fontSize="16"/>
          </FlexboxLayout>
          <StackLayout padding="5"/>
          <Label :textWrap="true" :text="item.details" fontSize="16"/>
        </FlexCol>
        <StackLayout class="hr-light" margin="0 0 15"/>
        <FlexboxLayout justifyContent="space-between" alignItems="center" paddingLeft="20" paddingRight="20">
          <FlexCol>
            <Label :text="item.seller.username" fontSize="18"/>
            <StarRating scaleX=".5" scaleY=".5" filledColor="#0076ff" :value="item.seller.rating" max="5"/>
          </FlexCol>
          <StackLayout>
            <StateButton @onTap="gotoCheckout" text="Buy"/>
          </StackLayout>
        </FlexboxLayout>
      </FlexCol>
    </ScrollView>
  </ViewContainer>
</template>

<script>
import Api from '@/services/api'
import EventBus from '@/services/event-bus'

export default {
  props: {
    itemId: {
      type: Number,
      required: true
    }
  },
  created() {
    Api.getItem(this.itemId)
      .then((item) => {
        this.item = item
        this.loaded = true
      })
  },
  data: () => ({
    item: { seller: {} }, // this is bs
    loaded: false
  }),
  computed: {
    getPrice() {
      return `${this.item.price} ${this.item.currency}`
    }
  },
  methods: {
    gotoCheckout() {
      EventBus.$emit('navigateTo', 'Checkout', { itemId: this.itemId })
    }
  }
}
</script>