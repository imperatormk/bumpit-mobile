<template>
  <ViewContainer :loading="!loaded">
    <FlexCol alignItems="center" :height="!products.length ? '100%' : 'auto'">
      <LabelButton block v-if="true" text="Post new product" @onTap="gotoNewProduct"/>
      <SearchBar hint="Product name, brand..." :text="searchTerm" @loaded="$event.object.android.clearFocus()"/>

      <Split size="15"/>
      <FlexRow justifyContent="center">
        <StateButton text="Recent" :inactive="productsGroup !== 0" @onTap="changeProductsGroup(0)"/>
        <Split vertical/>
        <StateButton text="Following" :inactive="productsGroup !== 1" @onTap="changeProductsGroup(1)"/>
      </FlexRow>

      <Split size="15"/>
      <FlexCol flexGrow="1" justifyContent="center" alignItems="center" width="100%">
        <Label v-if="!products.length" text="Nothing to see at the moment..." fontSize="18"/>
      </FlexCol>
    </FlexCol>
    <FlexRow flexWrap="wrap" slot="scrollable">
      <StackLayout v-for="product in products" :key="product.id" width="50%">
        <ProductSummary @selected="gotoProductDetails(product)" :product="product"/>
      </StackLayout>
    </FlexRow>
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
    gotoProductDetails(product) {
      EventBus.$emit('navigateTo', 'ProductDetails', { productId: product.id })
    },
    gotoNewProduct() {
      EventBus.$emit('navigateTo', 'NewProduct')
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