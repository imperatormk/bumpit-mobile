<template>
  <ViewContainer :loading="!loaded">
    <FlexCol slot="scrollable">
      <Label text="Add item" fontSize="30" fontWeight="bold" color="black"/>
      <Split/>

      <Label text="Listing title" fontSize="20"/>
      <Textbox v-model="product.title" hint="Item title (e.g. Nike VaporMax)"/>
      <Split/>

      <ImagePicker @imagesChanged="productImages = $event"/>
      <Split/>
      <Split/>

      <Label text="Item details" fontSize="25" color="black"/>
      <Split/>

      <Label text="Brand" fontSize="20"/>
      <Split/>

      <ItemSelector :items="brands" @selected="selectBrand" padding="5 10"/>
      <Split/>

      <Label text="Category" fontSize="20"/>
      <Split/>

      <ItemSelector :items="categories" @selected="selectCategory" padding="5 10"/>
      <Split/>

      <Label text="Size" fontSize="20"/>
      <Split/>

      <ItemSelector :items="sizes" @selected="selectSize" padding="5 10"/>
      <Split/>

      <Label text="Price" fontSize="20"/>
      <StackLayout>
        <FlexRow alignItems="center">
          <StackLayout flexGrow="1">
            <Textbox keyboardType="number" v-model.number="product.price" min="1"/>
          </StackLayout>
        </FlexRow>
      </StackLayout>
      <Split/>

      <Label text="Shipping cost" fontSize="20"/>
      <StackLayout>
        <FlexRow alignItems="center">
          <StackLayout flexGrow="1">
            <Textbox keyboardType="number" v-model.number="product.shippingCost" min="0"/>
          </StackLayout>
        </FlexRow>
      </StackLayout>
      <Split/>

      <StateButton @onTap="postItem" :disabled="saving" :inactive="saving" block text="Post item"/>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import ItemSelector from '@/components/common/ItemSelector'
import ImagePicker from '@/components/common/ImagePicker'
import Api from '@/services/api'
import Auth from '@/services/auth'
import EventBus from '@/services/event-bus'
import { Alert } from '@/services/ui-utils'
import uploadImage from '@/services/upload-image'

export default {
  mounted() {
    this.getAuthUser()
      .then(() => this.fetchData())
  },
  methods: {
    getAuthUser() {
      return Auth.getAuthUser()
    },
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
      const productObj = {
        ...this.product
      }

      const validateItem = (item) => {
        return true &&
          item.title.trim() &&
          item.condition != null &&
          item.brandId != null &&
          item.size != null &&
          item.price > 1 &&
          this.productImages.length > 0
      }
      if (!validateItem(productObj)) return

      this.saving = true

      // move this to helpers
      const prepareImages = this.productImages.map((productImage, idx) => {
        const filename = `product_${idx}${Date.now()}.jpg`
        return uploadImage.saveTempImage(productImage, filename)
          .then((path) => {
            return uploadImage.verifyFileSize(path, 2 * 1024 * 1024)
              .then(() => path)
          })
      })

      return Promise.all(prepareImages)
        .then((productImageNames) => {
          return Api.postProduct(productObj)
            .then((result) => {
              const productId = result.id

              return Api.postProductImages(productId, productImageNames)
                .then((promises) => Promise.all(promises))
                .then(() => {
                  EventBus.$emit('navigateTo', 'ProductDetails', { productId })
                })
            })
        })
        .catch((err) => {
          Alert.showAlert({
            title: 'Error',
            message: err.msg || 'Unknown error has occured',
            type: 'error'
          })
        })
        .finally(() => {
          this.saving = false
        })
    }
  },
  data: () => ({
    product: {
      title: '',
      details: '', // pending
      condition: 1, // pending
      brandId: null,
      size: 14,
      price: 1.0,
      shippingCost: 0.0,
    },
    productImages: [],
    brands: [],
    categories: [],
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