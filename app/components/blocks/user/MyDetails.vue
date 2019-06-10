<template>
  <FlexCol>
    <Textbox v-model="details.fullname" hint="Full Name"/>
    <Textbox v-model="details.address" hint="Address"/>
    <Textbox v-model="details.unit" hint="Apt, suite, unit"/>
    <Textbox v-model="details.state" hint="State"/>
    <Textbox v-model="details.city" hint="City"/>
    <Textbox v-model="details.zipcode" hint="Zipcode"/>
    <Textbox v-model="details.contactPhone" hint="Contact phone"/>
  </FlexCol>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.details = { ...this.value }
  },
  data: () => ({
    details: {
      fullname: '',
      address: '',
      unit: '',
      state: '',
      city: '',
      zipcode: '',
      contactPhone: ''
    }
  }),
  watch: {
    details(val) {
      this.$emit('input', val)
    }
  }
}
</script>
