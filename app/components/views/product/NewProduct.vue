<template>
  <ViewContainer :loading="!loaded">
    <FlexCol slot="scrollable">
      <Label text="Add item" fontSize="30" fontWeight="bold"/>
      <Split/>
      <Label text="Listing title" fontSize="20"/>

      <Split/>
      <Textbox v-model="product.title" hint="Item title (e.g. Nike VaporMax)"/>

      <ImagePicker/>

      <Split/>
      <Split/>
      <Label text="Item details" fontSize="25"/>
      <Split/>
      <Label text="Brand" fontSize="20"/>
      <Split/>
      <ItemSelector :items="brands" @selected="selectBrand" padding="50"/>

      <Split/>
      <Label text="Category" fontSize="20"/>
      <Split/>
      <ItemSelector :items="categories" @selected="selectCategory" padding="50"/>

      <Split/>
      <Label text="Size" fontSize="20"/>
      <Split/>
      <ItemSelector :items="sizes" @selected="selectSize" padding="5 10"/>

      <Split/>
      <Label text="Price" fontSize="20"/>
      <Textbox keyboardType="number" v-model="product.price"/>

      <Split/>
      <StateButton @onTap="postItem" block text="Post item"/>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import ItemSelector from '@/components/common/ItemSelector'
import ImagePicker from '@/components/common/ImagePicker'
import Api from '@/services/api'

export default {
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loaded = true
      const brands = Api.getBrands()
        .then((brands) => {
          this.brands = brands
        })
      const categories = Api.getCategories()
        .then((categories) => {
          this.categories = categories
        })
      Promise.all([brands, categories])
        .then(() => {
          this.loaded = true
        })
    },
    selectCategory(category) {
      this.product.catId = category.id
    },
    selectBrand(brand) {
      this.product.brandId = brand.id
    },
    selectSize(size) {
      this.product.size = size
    },
    postItem() {
      console.log(this.product)
    }
  },
  data: () => ({
    product: {
      title: '',
      brand: '',
      size: 14,
      price: 0.0,
    },
    brands: [],
    categories: [],
    sizes: [11.5, 12, 13, 14, 15],
    loaded: false
  }),
  components: {
    ItemSelector,
    ImagePicker
  }
}
</script>