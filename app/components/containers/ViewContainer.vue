<template>
  <Page :verticalAlignment="loading ? 'center' : 'top'" actionBarHidden="true" xmlns:ui="nativescript-youtubeplayer" ref="pageRef" :style="getStyle">
    <StackLayout v-if="loading" verticalAlignment="center">
      <LoadingIndicator :full="true">
        <Label v-if="loadingText" :text="loadingText" textAlignment="center" fontSize="22" color="#8c8c8c" padding="10"/>
      </LoadingIndicator>
    </StackLayout>
    <GridLayout rows="*" cols="*" v-else verticalAlignment="top" height="100%">
      <StackLayout verticalAlignment="top">
        <Label margin="0" padding="15" style="padding-bottom:10px;color:#8c8c8c;horizontal-align:right;" class="fas" fontSize="22" :text="'\uf0c9'"/>
        <slot/>
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script>
import LoadingIndicator from '@/components/common/LoadingIndicator'

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: String,
    backgroundImage: {
      type: String,
      default: ''
    }
  },
  computed: {
    getStyle() {
      return {
        'background-image': this.backgroundImage,
        'background-size': 'cover'
      }
    }
  },
  components: {
    LoadingIndicator
  }
}
</script>