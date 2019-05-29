<template>
  <ViewContainer>
    <FlexCol justifyContent="space-between" padding="20" height="100%">
      <FlexCol>
        <FlexRow justifyContent="space-between" alignItems="center">
          <Label text="Login" fontSize="26" color="black" class="bold"/>
          <Label @tap="gotoRegister" text="Sign Up" fontSize="18" class="bold"/>
        </FlexRow>
        <Split size="10"/>
        <Label text="Enter your information to get started" color="#9599a4" fontSize="16"/>
        <Split size="20"/>

        <FlexCol>
          <Label text="Username" color="black" fontSize="19"/>
          <TextField hint="e.g. acid" 
            v-model="username"
            secure="false"
            returnKeyType="done"
            fontSize="16"
            autocorrect="false"
            style="placeholder-color:#9da0aa;padding:0px;margin:0px;border-width:1px;border-color:white"
            class="input input-border"></TextField>
        </FlexCol>
        <Split size="20"/>

        <FlexCol>
          <Label text="Enter your password" color="black" fontSize="19"/>
          <TextField hint="Password"
            v-model="password"
            secure="true"
            returnKeyType="done"
            fontSize="16"
            autocorrect="false"
            style="placeholder-color:#9da0aa;padding:0px;margin:0px;border-width:1px;border-color:white"
            class="input input-border"></TextField>
        </FlexCol>
      </FlexCol>
      <StateButton @onTap="login" text="Login"/>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import Auth from '@/services/auth' 
import EventBus from '@/services/event-bus'

export default {
  data: () => ({
    username: 'imperatormk',
    password: 'pece123!'
  }),
  methods: {
    login() {
      const username = this.username.trim()
      const password = this.password.trim()
      Auth.login(username, password)
        .then(() => {
          EventBus.$emit('auth:loggedIn')
        })
    },
    gotoRegister() {
      EventBus.$emit('navigateTo', 'Register')
    }
  }
}
</script>
