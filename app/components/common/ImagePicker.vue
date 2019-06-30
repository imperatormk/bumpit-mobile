<template>
  <StackLayout>
    <StackLayout @tap="addPhotos">
      <FlexRow backgroundColor="#e1e1e1" borderRadius="10" alignItems="center" justifyContent="center" width="100%" height="200">
        <Label text="Add photos of your item" fontSize="20"/>
      </FlexRow>
    </StackLayout>

    <FlexCol v-if="imageAssets.length > 0">
      <Split/>
      <ScrollView orientation="horizontal" :scrollBarIndicatorVisible="false">
        <FlexRow>
          <GridLayout v-for="(image, idx) in imageAssets" :key="idx" columns="*" rows="*">
            <StackLayout col="0" row="0" padding="5">
              <Image width="80" height="80" :src="image" stretch="aspectFill"/>
            </StackLayout>
            <StackLayout col="0" row="0">
              <FlexRow justifyContent="flex-end">
                <StackLayout @tap="removeImage(idx)" width="20" height="20" backgroundColor="white" borderRadius="50%" horizontalAlignment="center" verticalAlignment="center">
                  <Label fontSize="19" class="fas" color="black" :text="'\uf057'"/>
                </StackLayout>
              </FlexRow>
            </StackLayout>
          </GridLayout>
        </FlexRow>
      </ScrollView>
    </FlexCol>
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
    },
    removeImage(index) {
      if (this.imageAssets[index]) {
        this.imageAssets.splice(index, 1)
        this.$emit('imagesChanged', this.imageAssets)
      }
    }
  }
}
</script>

