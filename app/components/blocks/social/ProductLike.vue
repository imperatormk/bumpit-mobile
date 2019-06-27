<template>
  <StackLayout>
    <FlexRow alignItems="center" justifyContent="space-between">
      <StackLayout width="20%">
        <Avatar @onTap="gotoUser" :avatar="productLike.liker.avatar" small/>
      </StackLayout>

      <StackLayout @tap="gotoProductDetails" orientation="horizontal" width="60%">
        <Split small vertical/>
        <FlexRow alignItems="center">
          <Label textWrap="true">
            <Span :text="productLike.liker.username" color="#000" fontWeight="bold"/>
            <Span text=" has liked your product." color="#000"/>
            <Span :text="' ' + when()" color="#9c9c9c"/>
          </Label>
        </FlexRow>
      </StackLayout>

      <StackLayout @tap="gotoProductDetails" width="20%">
        <FlexRow alignItems="center">
          <Split size="15" vertical/>
          <Image width="50" height="50" :src="firstImage" stretch="aspectFill"/>
        </FlexRow>
      </StackLayout>
    </FlexRow>
  </StackLayout>
</template>

<script>
import Avatar from '@/components/blocks/user/Avatar'
import EventBus from '@/services/event-bus'
import System from '@/data/system'

// move to ui-utils?
import moment from 'moment'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

export default {
  props: {
    productLike: {
      type: Object,
      required: true
    }
  },
  computed: {
    firstImage() {
      if (!this.productLike.product.images.length) return ''
      return `${System.serverUrl}${this.productLike.product.images[0].url}`
    }
  },
  methods: {
    gotoProductDetails() {
      const productId = this.productLike.product.id
      EventBus.$emit('navigateTo', 'ProductDetails', { productId })
    },
    gotoUser() {
      const userId = this.productLike.liker.id
      EventBus.$emit('navigateTo', 'Profile', { userId })
    },
    when() {
      const date = this.productLike.createdAt
      const momentObj = moment(date).toDate()
      return timeAgo.format(momentObj, 'twitter') || 'just now'
    }
  },
  components: {
    Avatar
  }
}
</script>
