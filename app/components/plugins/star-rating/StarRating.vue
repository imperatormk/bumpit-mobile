<template>
  <FlexRow>
    <Star @selected="value = star" v-for="star in stars" :key="star" :filled="star <= value" fontSize="20"/>
  </FlexRow>
</template>

<script>
import Star from './Star'

export default {
  props: {
    max: {
      type: Number,
      default: 5,
      validator: function(val) {
        return val >= 1
      }
    },
    rating: {
      type: Number,
      default: 0,
      validator: function(val) {
        return val >= 0
      }
    }
  },
  created() {
    this.value = this.rating
  },
  data: () => ({
    value: 0
  }),
  computed: {
    stars() {
      return Array.from(Array(this.max), (_,starIdx) => starIdx).map(starIdx => starIdx + 1)
    }
  },
  components: {
    Star
  }
}

</script>