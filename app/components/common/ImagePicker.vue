<template>
  <StackLayout>
    <StackLayout @tap="addPhotos">
      <FlexRow backgroundColor="#e1e1e1" borderRadius="10" alignItems="center" justifyContent="center" width="100%" height="200">
        <Label text="Add photos of your item" fontSize="20"/>
      </FlexRow>
    </StackLayout>

    <ScrollView orientation="horizontal" :scrollBarIndicatorVisible="false">
      <FlexRow>
        <StackLayout padding="5" v-for="(image, idx) in imageAssets" :key="idx">
          <Image width="80" height="80" :src="image" stretch="aspectFill"/>
        </StackLayout>
      </FlexRow>
    </ScrollView>
  </StackLayout>
</template>

<script>
import * as imagepicker from 'nativescript-imagepicker'
import { Observable } from 'tns-core-modules/data/observable'
import { ItemEventData } from 'tns-core-modules/ui/list-view'

export default {
  data: () => ({
    imageAssets: []
  }),
  methods: {
    addPhotos() {
      let context = imagepicker.create({
        mode: 'multiple'
      })
      this.startSelection(context)
    },
    startSelection(context) {
      context
        .authorize()
        .then(() => context.present())
        .then((selection) => {
          selection.forEach((element) => {
            element.options.width = this.thumbSize
            element.options.height = this.thumbSize
          })
          this.imageAssets.push(...selection)
          this.$emit('imagesChanged', this.imageAssets)
        })
    }
  }
}
</script>

