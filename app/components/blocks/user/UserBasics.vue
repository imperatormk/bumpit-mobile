<template>
  <StackLayout @tap="gotoUser">
    <FlexRow alignItems="center">
      <Avatar :avatar="user.avatar" small/>
      <Split vertical/>
      <FlexCol >
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
import Avatar from '@/components/blocks/user/Avatar'
import EventBus from '@/services/event-bus'

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    fullname() {
      const name = this.user.name || ''
      const surname = this.user.surname || ''
      const fullname = `${name} ${surname}`
      return fullname || null
    }
  },
  methods: {
    gotoUser() {
      const userId = this.user.id
      EventBus.$emit('navigateTo', 'Profile', { userId })
    }
  },
  components: {
    Avatar
  }
}
</script>