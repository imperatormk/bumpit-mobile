<template>
  <TextView 
    :text="value"
    @textChange="update"
    returnKeyType="done"
    fontSize="15"
    :flexGrow="getFlexGrow"
    textWrap="true"
    style="margin:0px;border-width:1px;border-color:transparent;"/>
</template>

<script>
export default {
  props: {
    value: String,
    multiline: Boolean
  },
  computed: {
    getFlexGrow() {
      return this.multiline ? 1 : null
    }
  },
  methods: {
    update(e) {
      this.$emit('input', e.value)
    }
  }
}
</script>