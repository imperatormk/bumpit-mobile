<template>
  <ViewContainer :loading="!loaded">
    <GridLayout columns="*" rows="*" height="55%">
      <StackLayout col="0" row="0">
        <Carousel indicatorColor="#0076ff">
          <CarouselItem v-for="image in item.images" :key="image.id" backgroundColor="#fefefe" verticalAlignment="middle">
            <StackLayout>
              <Image stretch="aspectFill" :src="image.url"/>
            </StackLayout>
          </CarouselItem>
        </Carousel>
      </StackLayout>
      <StackLayout col="0" row="0" paddingRight="20" paddingBottom="10">
        <FlexboxLayout justifyContent="flex-end" alignItems="flex-end" height="100%">
          <FlexboxLayout width="50" height="50" backgroundColor="#0076ff" borderRadius="50%" alignItems="center" justifyContent="center">
            <Label fontSize="24" class="far" color="white" :text="'\uf004'"/>
          </FlexboxLayout>
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
import Api from '@/services/api'

export default {
  props: {
    itemId: {
      type: Number,
      required: true
    }
  },
  created() {
    Api.getItem(this.itemId)
      .then((item) => {
        console.log(1)
        this.item = item
        this.loaded = true
        console.log(2)
      })
  },
  data: () => ({
    item: {},
    loaded: false
  })
}
</script>