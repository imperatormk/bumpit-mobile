<template>
  <ViewContainer>
    <FlexCol height="100%">
      <FlexCol class="rate" width="100%">
        <FlexRow justifyContent="space-between" alignItems="center">
          <Label fontWeight="bold" fontSize="18" text="Rate"/>
        </FlexRow>
        <Split small/>
        <Label text="How would you like to rate the service"/>
      </FlexCol>
      <Split big/>

      <StarRating :rating="rating"/>
      <Split big/>

      <FlexCol flexGrow="1" class="rate" width="100%">
        <FlexRow justifyContent="space-between" alignItems="center">
          <Label fontWeight="bold" fontSize="18" text="Leave a comment"/>
        </FlexRow>
        <Textbox
          v-model="comment"
          hint="e.g Fast shipping, item as described, good Communication?"
          multiline/>
      </FlexCol>

      <Split/>
      <StateButton text="Post review"/>
    </FlexCol>
  </ViewContainer>
</template>

<script>
export default {
  props: {
    orderId: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    rating: 0,
    comment: ''
  })
}
</script>