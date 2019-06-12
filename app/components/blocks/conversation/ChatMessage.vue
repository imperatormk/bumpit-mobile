<template>
  <FlexRow width="100%">
    <StackLayout v-if="fromMe" width="20%"/>
    <StackLayout width="80%" borderRadius="10" :color="fromMe?'white':'black'" :backgroundColor="fromMe?'#0176ff':'#f5f5f5'" padding="10">
      <Label :text="message.content"/>
    </StackLayout>
    <StackLayout v-if="!fromMe" width="20%"/>
  </FlexRow>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    },
    fromMe: Boolean
  }
}
</script>