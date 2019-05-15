<template>
  <ViewContainer>
    <FlexboxLayout flexDirection="column" justifyContent="space-between" padding="20" height="100%">
      <FlexboxLayout flexDirection="column">
        <FlexboxLayout justifyContent="space-between" alignItems="center">
          <Label text="Sign Up" fontSize="26" color="black" class="bold"/>
          <Label @tap="gotoLogin" text="Login" fontSize="18" class="bold"/>
        </FlexboxLayout>
        <StackLayout height="10"/>
        <Label text="Enter your information to become a member" color="#9599a4" fontSize="16"/>
      </FlexboxLayout>
      <StateButton @onTap="register" text="Sign Up"/>
    </FlexboxLayout>
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