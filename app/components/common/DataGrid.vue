<template>
  <FlexCol>
    <FlexCol v-for="(dataItem, idx) in data" :key="idx">
      <FlexRow justifyContent="space-between" width="100%">
        <Label :text="dataItem.label" fontSize="16"/>
        <Label color="black" :text="dataItem.value" fontSize="16"/>
      </FlexRow>
      <Split small v-if="idx < (data.length - 1)"/>
    </FlexCol>
  </FlexCol>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>