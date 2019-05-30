<template>
  <FlexRow v-if="!dense" alignItems="center">
    <Star @selected="value = star" v-for="star in stars" :key="star" :filled="star <= value" fontSize="20"/>
  </FlexRow>
  <FlexRow :fontSize="!hasCustomSlot ? 20 : 'auto'" v-else alignItems="center">
    <Star filled/>
    <Label v-if="!hasCustomSlot" :text="decimalRating"/>
    <slot/>
  </FlexRow>
</template>

<script>
import Star from './Star'

export default {
  props: {
    max: {
      type: Number | String,
      default: 5,
      validator: function(val) {
        return !isNaN(Number(val)) && val >= 1
      }
    },
    rating: {
      type: Number,
      default: 0,
      validator: function(val) {
        return val >= 0
      }
    },
    dense: Boolean
  },
  created() {
    this.value = this.rating
    this.maxValue = Number(this.max)
  },
  data: () => ({
    value: 0,
    maxValue: 5
  }),
  computed: {
    stars() {
      return Array.from(Array(this.maxValue), (_,starIdx) => starIdx).map(starIdx => starIdx + 1)
    },
    decimalRating() {
      return this.rating.toFixed(1)
    },
    hasCustomSlot() {
      return !!this.$slots.default
    }
  },
  components: {
    Star
  }
}

</script>