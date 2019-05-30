<template>
  <Label @onTap="$emit('selected')" :class="getClass" :text="'\uf005'" padding="5"/>
</template>

<script>
export default {
  props: {
    filled: Boolean
  },
  computed: {
    getClass() {
      return {
        fas: this.filled,
        far: !this.filled
      }
    }
  }
}
</script>