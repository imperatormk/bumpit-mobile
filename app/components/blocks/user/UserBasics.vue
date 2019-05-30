<template>
  <StackLayout>
    <FlexRow alignItems="center">
      <Image width="50" :src="avatar"/>
      <Split vertical/>
      <FlexCol>
        <Label v-if="name" :text="name" fontSize="19"/>
        <Split small/>
        <slot/>
      </FlexCol>
    </FlexRow>
  </StackLayout>
</template>

<script>
const DEFAULT_AVATAR = 'https://cdn3.iconfinder.com/data/icons/fillies-small/64/id-card-512.png'

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: { // are these tho temp?
    avatar() {
      return this.user.avatar || DEFAULT_AVATAR
    },
    name() {
      return this.user.name || null
    }
  }
}
</script>