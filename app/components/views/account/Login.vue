<template>
  <ViewContainer>
    <FlexCol height="100%">
      <FlexRow justifyContent="space-between" alignItems="center">
        <Label text="Login" fontSize="26" color="black" class="bold" fontWeight="bold"/>
        <Label @tap="gotoRegister" text="Sign Up" fontSize="18" class="bold" fontWeight="bold"/>
      </FlexRow>
      <Split/>
      <Label text="Enter your information to get started" color="#9599a4" fontSize="16"/>
      <Split big/>

      <FlexCol>
        <Label text="Username" color="black" fontSize="19"/>
        <TextField hint="e.g. acid" 
          v-model="user.username"
          secure="false"
          returnKeyType="done"
          fontSize="16"
          autocorrect="false"
          style="placeholder-color:#9da0aa;padding:0px;margin:0px;border-width:1px;border-color:white"
          class="input input-border"></TextField>
      </FlexCol>
      <Split big/>

      <FlexCol>
        <Label text="Enter your password" color="black" fontSize="19"/>
        <TextField hint="Password"
          v-model="user.password"
          secure="true"
          returnKeyType="done"
          fontSize="16"
          autocorrect="false"
          style="placeholder-color:#9da0aa;padding:0px;margin:0px;border-width:1px;border-color:white"
          class="input input-border"></TextField>
      </FlexCol>
      <Split fill/>
      <StateButton @onTap="login" text="Login" :disabled="loggingIn" :inactive="loggingIn"/>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import Auth from '@/services/auth'
import EventBus from '@/services/event-bus'

export default {
  props: {
    username: String,
    password: String
  },
  created() {
    if (this.username) this.user.username = this.username
    if (this.password) this.user.password = this.password
  },
  data: () => ({
    user: {
      username: '',
      password: ''
    },
    loggingIn: false
  }),
  methods: {
    login() {
      const username = this.user.username.trim()
      const password = this.user.password.trim()
      if (!username || !password) return

      this.loggingIn = true
      return this.$store.dispatch('authentication/login', { username, password })
        .then(() => {
          EventBus.$emit('auth:loggedIn')
        })
        .finally(() => {
          this.loggingIn = false
        })
    },
    gotoRegister() {
      EventBus.$emit('navigateTo', 'Register')
    }
  }
}
</script>
