<template>
  <StackLayout>
    <FlexRow alignItems="center">
      <Image width="50" :src="avatar"/>
      <Split vertical/>
      <FlexCol>
        <Label v-if="fullname" :text="fullname" fontSize="19"/>
        <Split small/>
        <slot/>
      </FlexCol>
      <Split vertical/>
      <FlexRow justifyContent="flex-end">
        <slot name="actions"/>
      </FlexRow>
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
  computed: {
    avatar() {
      return this.user.avatar || DEFAULT_AVATAR
    },
    fullname() {
      const name = this.user.name || ''
      const surname = this.user.surname || ''
      const fullname = `${name} ${surname}`
      return fullname || null
    }
  }
}
</script>