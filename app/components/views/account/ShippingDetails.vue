<template>
  <ViewContainer :loading="!loaded">
    <FlexCol height="100%">
      <MyDetails v-model="shippingDetails"/>
      <Split fill/>
      <StateButton @onTap="updateDetails" :disabled="updating" :inactive="updating" block text="Update shipping details"/>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import MyDetails from '@/components/blocks/user/MyDetails'
import Api from '@/services/api'
import { Alert } from '@/services/ui-utils'

export default {
  props: {
    detailsProp: {
      type: Object,
      default: null
    },
    shouldLoad: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    if (this.detailsProp) {
      this.shippingDetails = { ...this.detailsProp }
      this.loaded = true
    } else if (this.shouldLoad) {
      this.loadDetails()
    }
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
    updating: false,
    loaded: false
  }),
  methods: {
    loadDetails() {
      this.loaded = false
      return Api.getShippingInfo()
        .then((shippingDetails) => {
          this.shippingDetails = shippingDetails
          this.loaded = true
        })
    },
    updateDetails() {
      const shippingDetails = Object.keys(this.shippingDetails).map(key => this.shippingDetails[key])
      const valid = shippingDetails.filter(detail => !detail).length === 0
      if (!valid) {
        Alert.showAlert({
          title: 'Error',
          message: 'Please make sure all fields have been filled',
          type: 'error'
        })
        return // TODO: all are required atm
      }

      this.updating = true
      Api.updateShippingInfo(this.shippingDetails)
        .then(() => {
          if (!this.shouldLoad) { // TODO: think about a better check
            this.$modal.close(this.shippingDetails)
          } else {
            Alert.showAlert({
              title: 'Success',
              message: 'Shipping details have been updated',
              type: 'info'
            })
          }
        })
        .finally(() => {
          this.updating = false
        })
    }
  },
  components: {
    MyDetails
  }
}
</script>
