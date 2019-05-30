<template>
  <ViewContainer :loading="!loaded">
    <FlexCol>
      <SearchBar hint="Search hint" :text="searchTerm" @loaded="$event.object.android.clearFocus()"/>

      <Split size="15"/>
      <FlexRow justifyContent="center">
        <StateButton text="Recent" :inactive="productsGroup !== 0" @onTap="changeProductsGroup(0)"/>
        <StackLayout padding="5"></StackLayout>
        <StateButton text="Following" :inactive="productsGroup !== 1" @onTap="changeProductsGroup(1)"/>
      </FlexRow>

      <Split size="15"/>
      <ScrollView orientation="vertical">
        <FlexRow flexWrap="wrap">
          <StackLayout v-for="(product) in products" :key="product.id" width="50%">
            <ProductSummary @selected="openProductDetails(product)" :product="product"/>
          </StackLayout>
        </FlexRow>
      </ScrollView>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import ProductSummary from '@/components/blocks/product/ProductSummary'

import Api from '@/services/api'
import EventBus from '@/services/event-bus'

export default {
  created() {
    this.loadProducts()
  },
  data: () => ({
    products: [],
    searchTerm: '',
    productsGroup: 0,
    loaded: false
  }),
  methods: {
    loadProducts() {
      this.loaded = false
      Api.getProducts()
        .then((products) => {
          this.products = products
          this.loaded = true
        })
    },
    openProductDetails(product) {
      EventBus.$emit('navigateTo', 'ProductDetails', { productId: product.id })
    },
    changeProductsGroup(productsGroup) {
      this.productsGroup = productsGroup
    }
  },
  components: {
    ProductSummary
  }
}
</script>