<template>
  <StackLayout v-if="!vertical" :height="getSize" width="1" :backgroundColor="getColor" :flexGrow="getFlexGrow"/>
  <StackLayout v-else :width="getSize" height="1" :backgroundColor="getColor" :flexGrow="getFlexGrow"/>
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
    fill: Boolean
  },
  computed: {
    getSize() {
      if (this.small) return 3
      if (this.big) return 20
      return Number(this.size)
    },
    getFlexGrow() {
      return this.fill ? 1 : null
    },
    getColor() {
      return this.visible ? '#adb5bd' : 'white'
    }
  }
}
</script>