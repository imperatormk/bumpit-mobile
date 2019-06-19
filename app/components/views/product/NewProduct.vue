<template>
  <ViewContainer :loading="!loaded">
    <FlexCol slot="scrollable">
      <Label text="Add item" fontSize="30" fontWeight="bold" color="black"/>
      <Split/>
      <Label text="Listing title" fontSize="20"/>

      <Split/>
      <Split/>
      <Textbox v-model="product.title" hint="Item title (e.g. Nike VaporMax)"/>

      <Split/>
      <ImagePicker @imagesChanged="productImages = $event"/>

      <Split/>
      <Split/>
      <Label text="Item details" fontSize="25" color="black"/>

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
      <FlexRow alignItems="center">
        <StackLayout>
          <ListPicker :items="currencies"
            selectedIndex="1"
            @selectedIndexChange="selectCurrency"/>
        </StackLayout>
        <StackLayout flexGrow="1">
          <Textbox keyboardType="number" v-model.number="product.price"/>
        </StackLayout>
      </FlexRow>

      <StateButton @onTap="postItem" :disabled="saving" :inactive="saving" block text="Post item"/>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import ItemSelector from '@/components/common/ItemSelector'
import ImagePicker from '@/components/common/ImagePicker'
import Api from '@/services/api'
import EventBus from '@/services/event-bus'

const fs = require('file-system')
const applicationModule = require('tns-core-modules/application')
const imageSourceModule = require("tns-core-modules/image-source")

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
    selectCurrency(e) {
      this.product.currency = e.value
    },
    postItem() {
      const currency = !isNaN(this.product.currency) ? this.currencies[this.product.currency] : this.product.currency
      const productObj = {
        ...this.product,
        currency
      }

      const validateItem = (item) => {
        return true &&
          item.title.trim() &&
          item.condition != null &&
          item.currency != null &&
          item.brandId != null &&
          item.size != null &&
          item.price > 1 &&
          this.productImages.length > 0
      }
      if (!validateItem(productObj)) return

      this.saving = true
      Api.postProduct(productObj)
        .then((result) => {
          const productId = result.id

          const prepareImages = this.productImages.map((productImage, idx) => {
            return imageSourceModule.fromAsset(productImage).then((imageSource) => {
              let folder = fs.knownFolders.documents()
              let path = fs.path.join(folder.path, `product_${productId}_${idx}.jpg`)
              let saved = imageSource.saveToFile(path, 'jpg')

              return path
            })
          })

          return Promise.all(prepareImages)
            .then((productImageNames) => Api.postProductImages(productId, productImageNames))
            .then(() => productId)
        })
        .then((productId) => {
          EventBus.$emit('navigateTo', 'ProductDetails', { productId })
        })
    }
  },
  data: () => ({
    product: {
      title: '',
      details: '', // pending
      condition: 1, // pending
      currency: 1,
      brandId: null,
      size: 14,
      price: 0.0,
    },
    productImages: [],
    brands: [],
    categories: [],
    currencies: ['USD', 'AUD', 'CAD', 'EUR'], // get these from consts/server?
    sizes: [11.5, 12, 13, 14, 15],
    saving: false,
    loaded: false
  }),
  components: {
    ItemSelector,
    ImagePicker
  }
}
</script>