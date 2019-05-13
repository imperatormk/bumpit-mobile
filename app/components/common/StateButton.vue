<template>
  <Button v-bind="$props" @tap="$emit('onTap')" :class="getClass"></Button>
</template>

<script>
export default {
  props: {
    text: String,
    inactive: Boolean,
    rounded: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    getClass() {
      return {
        'btn-selected': !this.inactive,
        'btn-not-selected': this.inactive,
        'btn-rounded-lg': this.rounded
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-selected {
  background-color: #0076ff;
  color: white;
}
.btn-not-selected {
  background-color: #ebeef0;
  color: #afb1b3;
}
</style>

