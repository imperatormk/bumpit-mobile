<template>
  <ViewContainer :loading="!loaded">
    <FlexCol height="100%">
      <MyDetails v-model="shippingDetails"/>
      <Split fill/>
      <StateButton @onTap="updateDetails" block text="Add shipping details"/>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import MyDetails from '@/components/blocks/user/MyDetails'
import Api from '@/services/api'

export default {
  props: {
    detailsProp: {
      type: Object,
      default: null
    }
  },
  mounted() {
    if (this.detailsProp)
      this.shippingDetails = { ...this.detailsProp }
    this.loaded = true
  },
  data: () => ({
    shippingDetails: {
      fullname: '',
      address: '',
      unit: '',
      state: '',
      city: '',
      zipcode: '',
      contactPhone: ''
    },
    loaded: false
  }),
  methods: {
    updateDetails() {
      const shippingDetails = Object.keys(this.shippingDetails).map(key => this.shippingDetails[key])
      const valid = shippingDetails.filter(detail => !detail).length === 0
      if (!valid) return // TODO: all are required atm

      Api.updateShippingInfo(this.shippingDetails)
        .then(() => {
          this.$modal.close(this.shippingDetails)
        })
    }
  },
  components: {
    MyDetails
  }
}
</script>
