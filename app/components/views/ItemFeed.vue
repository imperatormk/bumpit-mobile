<template>
  <ViewContainer>
    <StackLayout paddingLeft="10" paddingRight="10">
      <SearchBar hint="Search hint" :text="searchTerm" @loaded="$event.object.android.clearFocus()"/>

      <StackLayout height="15"></StackLayout>
      <FlexboxLayout justifyContent="center">
        <StateButton text="Recent" :inactive="itemsGroup !== 0" @onTap="changeItemsGroup(0)"/>
        <StackLayout padding="5"></StackLayout>
        <StateButton text="Following" :inactive="itemsGroup !== 1" @onTap="changeItemsGroup(1)"/>
      </FlexboxLayout>

      <StackLayout height="15"></StackLayout>
      <ScrollView orientation="vertical">
        <GridLayout columns="* *" rows="*">
          <ItemSummary v-for="(item, idx) in items" @selected="openItemDetails(item)" :col="idx/2?1:0" :key="item.id" :item="item"/>
        </GridLayout>
      </ScrollView>
    </StackLayout>
  </ViewContainer>
</template>

<script>
import ItemSummary from '@/components/blocks/item/ItemSummary'
import ItemDetails from '@/components/views/ItemDetails'

export default {
  created() {
    this.items = [{"id":1,"title":"An underwear","details":"Very well kept","condition":2,"price":1.19,"currency":1,"size":"Test size A","location":"U Home","status":0,"createdAt":"2019-05-10T18:09:29.304Z","updatedAt":"2019-05-10T18:09:29.304Z","catId":1,"selId":1},{"id":2,"title":"A shoe","details":"Just one though","condition":1,"price":4.49,"currency":2,"size":"Test size B","location":"S Home","status":0,"createdAt":"2019-05-10T18:09:29.304Z","updatedAt":"2019-05-10T18:09:29.304Z","catId":2,"selId":2}]
  },
  data: () => ({
    items: [],
    searchTerm: '',
    itemsGroup: 0
  }),
  methods: {
    openItemDetails(item) {
      this.$navigateTo(ItemDetails, {
        props: { itemId: item.id },
        animated: true,
        transition: {
          name: 'fade'
        }
      })
    },
    changeItemsGroup(itemsGroup) {
      this.itemsGroup = itemsGroup
    }
  },
  components: {
    ItemSummary
  }
}
</script>