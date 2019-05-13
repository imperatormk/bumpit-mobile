<template>
  <ViewContainer :loading="!loaded">
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
import Api from '@/services/api'

export default {
  created() {
    this.loadItems()
  },
  data: () => ({
    items: [],
    searchTerm: '',
    itemsGroup: 0,
    loaded: false
  }),
  methods: {
    loadItems() {
      this.loaded = false
      Api.getItems()
        .then((items) => {
          this.items = items
          this.loaded = true
        })
    },
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