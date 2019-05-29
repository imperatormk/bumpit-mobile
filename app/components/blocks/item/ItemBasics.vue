<template>
  <FlexRow alignItems="center" width="100%" v-if="!vertical">
    <Image :src="item.images[0].url" width="20%"/>
    <FlexCol justifyContent="center" marginLeft="15">
      <Label :text="item.title" fontWeight="bold" color="black" fontSize="14" padding="3"/>
      <Label v-if="item.category" :text="item.category.name" fontSize="14" padding="3"/>
    </FlexCol>
  </FlexRow>
  <FlexCol justifyContent="center" v-else>
    <Image :src="item.images[0].url" width="30%"/>
    <Split size="2"/>
    <Label :text="item.title" fontWeight="bold" color="black" fontSize="20" padding="3"/>
  </FlexCol>
</template>

<script>
// do we want this with 'vertical' like this? maybe create another one if needed
// as in, 'vertical' means more than just orientation :p

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    vertical: Boolean
  }
}
</script>
