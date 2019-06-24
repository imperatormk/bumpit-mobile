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
    <FlexCol slot="scrollable">
      <FlexRow flexWrap="wrap">
        <StackLayout v-for="product in products" :key="product.id" width="50%">
          <ProductSummary @selected="gotoProductDetails(product)" :product="product"/>
        </StackLayout>
      </FlexRow>
      <StackLayout v-if="hasMore">
        <Split big/>
        <StateButton text="Load more" @onTap="loadMoreProducts" block/>
      </StackLayout>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import ProductSummary from '@/components/blocks/product/ProductSummary'

import Api from '@/services/api'
import EventBus from '@/services/event-bus'

const pagination = {
  page: 1,
  size: 6
}

export default {
  created() {
    this.loadMoreProducts()
      .then(() => {
        this.loaded = true
      })
  },
  data: () => ({
    searchTerm: '', // TODO: implement this
    pagination,
    products: [],
    totalProducts: 0,
    productsGroup: 0,
    loaded: false
  }),
  computed: {
    hasMore() {
      return !this.loaded || (this.totalProducts > this.products.length)
    }
  },
  methods: {
    loadMoreProducts() {
      if (!this.hasMore) return Promise.resolve()

      return Api.getProducts({}, this.pagination)
        .then((result) => {
          this.products.push(...result.content)
          this.totalProducts = result.totalElements
          this.pagination.page += 1
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