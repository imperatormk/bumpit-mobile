<template>
  <ViewContainer :loading="!loaded" :paddingConfig="{def: '0'}">
    <TabView :selectedIndex="selectedType" @selectedIndexChange="tabIndexChange">
      <TabViewItem title="Purchased">
        <StackLayout padding="10">
          <ScrollView orientation="vertical" v-if="orders.length">
            <OrderListItem padding="5" v-for="order in orders" :key="order.id" :order="order"/>
          </ScrollView>
          <Label v-else padding="5" text="Nothing to see at the moment..." fontSize="18"/>
        </StackLayout>
      </TabViewItem>
      <TabViewItem title="Sold">
        <StackLayout padding="10">
          <ScrollView orientation="vertical" v-if="orders.length">
            <OrderListItem padding="5" v-for="order in orders" :key="order.id" :order="order"/>
          </ScrollView>
          <Label v-else padding="5" text="Nothing to see at the moment..." fontSize="18"/>
        </StackLayout>
      </TabViewItem>
    </TabView>
  </ViewContainer>
</template>

<script>
import OrderListItem from '@/components/blocks/order/OrderListItem'
import Api from '@/services/api'
import Auth from '@/services/auth'

export default {
  props: {
    userId: {
      type: Number,
      required: true
    }
  },
  mounted() {
    this.fetchData()
  },
  data: () => ({
    orders: [],
    selectedType: 0,
    loaded: false
  }),
  methods: {
    fetchData() {
      const orderListApiFn = this.selectedType === 0 ? Api.getBoughtOrders : Api.getSoldOrders
      return orderListApiFn()
        .then((orders) => {
          this.orders = []

          this.$nextTick(() => {
            this.orders = orders
            this.loaded = true
          })
        })
    },
    tabIndexChange(e) {
      const newIndex = e.value
      this.selectedType = newIndex
      this.fetchData()
    }
  },
  components: {
    OrderListItem
  }
}
</script>