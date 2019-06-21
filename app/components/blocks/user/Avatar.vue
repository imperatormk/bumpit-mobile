<template>
  <StackLayout>
    <FlexRow @tap="onTap" justifyContent="center" :backgroundColor="getAvatarUrl ? 'white' : '#eaeef0'" alignItems="center" height="150" width="150" v-if="shouldSelect" borderRadius="100%">
      <Image v-if="getAvatarUrl" @tap="onTap" :height="size" :width="size" :src="getAvatarUrl" borderRadius="100%"/>
      <Label v-else @tap="onTap" backgroundColor="#eaeef0" class="fas" :text="'\uf030'" color="#a1a1a2" fontSize="40"/>
    </FlexRow>
    <Image v-else-if="getAvatarUrl" :height="size" :width="size" :src="getAvatarUrl" borderRadius="100%"/>
  </StackLayout>
</template>

<script>
import * as imagepicker from 'nativescript-imagepicker'
import { Observable } from 'tns-core-modules/data/observable'
import { ItemEventData } from 'tns-core-modules/ui/list-view'
import System from '@/data/system'

export default {
  props: {
    shouldSelect: Boolean,
    avatar: String,
    small: Boolean,
  },
  data: () => ({
    selAvatar: null
  }),
  computed: {
    getAvatarUrl() {
      if (this.selAvatar) return this.selAvatar
      if (!this.avatar) return ''
      if (this.avatar.includes('default') && this.shouldSelect) return '' // a bit dirty

      const avatarName = this.avatar
      return `${System.apiUrl}${avatarName}`
    },
    size() {
      if (this.small) return 50
      return 150
    }
  },
  methods: {
    onTap() {
      if (this.shouldSelect) {
        this.selectAvatar()
      }
    },
    selectAvatar() {
      let context = imagepicker.create({
        mode: 'single'
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
            this.selAvatar = element
            this.$emit('avatarPicked', element)
          })
        })
    }
  }
}
</script>
