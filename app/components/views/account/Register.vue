<template>
  <ViewContainer>
    <FlexCol height="100%">
      <FlexRow justifyContent="space-between" alignItems="center">
        <Label text="Sign Up" fontSize="26" color="black" fontWeight="bold"/>
        <Label @tap="gotoLogin" text="Login" fontSize="18" fontWeight="bold"/>
      </FlexRow>
      <Split/>
      <Label text="Enter your information to become a member" color="#9599a4" fontSize="16"/>
      <Split fill/>
      <StateButton @onTap="register" text="Sign Up"/>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import Auth from '@/services/auth' 
import EventBus from '@/services/event-bus'

export default {
  data: () => ({
  }),
  methods: {
    register() {
    },
    gotoLogin() {
      EventBus.$emit('navigateTo', 'Login')
    }
  }
}
</script>