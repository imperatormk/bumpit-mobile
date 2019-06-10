<template>
  <FlexCol>
    <Textbox v-model="details.name" hint="Full Name"/>
    <Textbox v-model="details.address" hint="Address"/>
    <Textbox v-model="details.unit" hint="Apt, suite, unit"/>
    <Textbox v-model="details.state" hint="State"/>
    <Textbox v-model="details.city" hint="City"/>
    <Textbox v-model="details.zip" hint="Zipcode"/>
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
      name: '',
      address: '',
      unit: '',
      state: '',
      city: '',
      zip: '',
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
