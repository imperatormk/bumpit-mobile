<template>
  <FlexCol>
    <Textbox v-model="details.name" hint="Full Name"/>
    <Textbox v-model="details.address" hint="Address"/>
    <Textbox v-model="details.suite" hint="Apt, suite, unit"/>
    <Textbox v-model="details.state" hint="State"/>
    <Textbox v-model="details.city" hint="City"/>
    <Textbox v-model="details.zip" hint="Zip Code"/>
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
  created() {
    this.details = { ...this.value }
  },
  data: () => ({
    details: {}
  }),
  watch: {
    details(val) {
      this.$emit('input', val)
    }
  }
}
</script>
