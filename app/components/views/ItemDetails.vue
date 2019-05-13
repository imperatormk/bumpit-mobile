<template>
  <ViewContainer>
    <GridLayout columns="*" rows="*" height="280">
      <StackLayout col="0" row="0">
        <Carousel indicatorColor="#0076ff">
          <CarouselItem v-for="image in item.images" :key="image.id" backgroundColor="#fefefe" verticalAlignment="middle">
            <StackLayout>
              <Image :src="image.url"/>
            </StackLayout>
          </CarouselItem>
        </Carousel>
      </StackLayout>
      <StackLayout col="0" row="0" paddingRight="20" paddingBottom="10">
        <FlexboxLayout justifyContent="flex-end" alignItems="flex-end" height="100%">
          <StackLayout width="50" height="50" backgroundColor="#0076ff" borderRadius="50%"/>
        </FlexboxLayout>
      </StackLayout>
    </GridLayout>

    <FlexboxLayout padding="20" flexDirection="column">
      <FlexboxLayout>
        <Label :text="item.title" fontSize="24" flexGrow="3"/>
        <Label :text="item.price" fontSize="24" flexGrow="1"/>
      </FlexboxLayout>
      <StackLayout class="hr-light" margin="10 0"></StackLayout>
      <FlexboxLayout justifyContent="space-between">
        <Label :text="'Size: ' + item.size" fontSize="16"/>
        <Label :text="'Condition: ' + item.condition" fontSize="16"/>
      </FlexboxLayout>
      <StackLayout padding="5"></StackLayout>
      <FlexboxLayout justifyContent="space-between">
        <Label :text="'Location: ' + item.location" fontSize="16"/>
      </FlexboxLayout>
      <StackLayout padding="5"></StackLayout>
      <Label :text="item.details" fontSize="16"/>
    </FlexboxLayout>
    <StackLayout class="hr-light" margin="0 0 15"></StackLayout>
    <FlexboxLayout justifyContent="space-between" paddingLeft="20" paddingRight="20">
      <StateButton text="Buy"/>
    </FlexboxLayout>
  </ViewContainer>
</template>

<script>
export default {
  props: {
    itemId: {
      type: Number,
      required: true
    }
  },
  created() {
    this.item = {"id":1,"title":"An underwear","details":"Very well kept","condition":2,"price":1.19,"currency":1,"size":"Test size A","location":"U Home","status":0,"createdAt":"2019-05-10T18:09:29.304Z","updatedAt":"2019-05-10T18:09:29.304Z","catId":1,"selId":1,"images":[{"id":1,"url":"https://via.placeholder.com/300x500","featured":true,"itmId":1}, {"id":1,"url":"https://via.placeholder.com/330x550","featured":false,"itmId":1}]}
  },
  data: () => ({
    item: {}
  })
}
</script>