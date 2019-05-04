<template>
  <StackLayout :height="full ? '100%' : 'auto'" verticalAlignment="center">
    <ActivityIndicator :color="color" busy="true" width="100" :height="full ? '100' : 'auto'"/>
    <slot/>
  </StackLayout>
</template>

<script>
export default {
  props: { // there can be one more prop for size
    full: Boolean,
    color: {
      type: String,
      default: '#8c8c8c'
    }
  }
}
</script>