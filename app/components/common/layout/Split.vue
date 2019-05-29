<template>
  <StackLayout v-if="!vertical" :height="getSize" width="1" :backgroundColor="getColor" :verticalAlignment="getStretchAlignment"/>
  <StackLayout v-else :width="getSize" height="1" :backgroundColor="getColor" :horizontalAlignment="getStretchAlignment"/>
</template>

<script>
export default {
  props: {
    vertical: Boolean,
    size: {
      type: Number | String,
      default: 10
    },
    visible: Boolean,
    big: Boolean,
    small: Boolean,
    full: Boolean
  },
  computed: {
    getSize() {
      if (this.small) return 3
      if (this.big) return 20
      return !this.full ? Number(this.size) : 'auto'
    },
    getStretchAlignment() {
      return this.full ? 'stretch' : 'auto'
    },
    getColor() {
      return this.visible ? '#adb5bd' : 'white'
    }
  }
}
</script>