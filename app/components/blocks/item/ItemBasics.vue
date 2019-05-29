<template>
  <FlexboxLayout flexDirection="row" alignItems="center" width="100%">
    <Image :src="item.images[0].url" width="20%"/>
    <FlexboxLayout flexDirection="column" justifyContent="center" marginLeft="15">
      <Label :text="item.title" fontSize="14" fontWeight="bold" color="black" padding="3"/>
      <Label :text="item.category.name" fontSize="14" padding="3"/>
    </FlexboxLayout>
  </FlexboxLayout>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
