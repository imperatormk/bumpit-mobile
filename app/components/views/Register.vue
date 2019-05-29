<template>
  <ViewContainer>
    <FlexCol justifyContent="space-between" padding="20" height="100%">
      <FlexCol>
        <FlexRow justifyContent="space-between" alignItems="center">
          <Label text="Sign Up" fontSize="26" color="black" class="bold"/>
          <Label @tap="gotoLogin" text="Login" fontSize="18" class="bold"/>
        </FlexRow>
        <Split size="10">
        <Label text="Enter your information to become a member" color="#9599a4" fontSize="16"/>
      </FlexCol>
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