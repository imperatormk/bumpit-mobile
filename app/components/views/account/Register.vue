<template>
  <ViewContainer>
    <FlexCol slot="scrollable">
      <FlexRow justifyContent="space-between" alignItems="center">
        <Label text="Sign Up" fontSize="26" color="black" fontWeight="bold"/>
        <Label @tap="gotoLogin" text="Login" fontSize="18" fontWeight="bold"/>
      </FlexRow>

      <Split/>
      <Label text="Enter your information to become a member" color="#9599a4" fontSize="16"/>

      <Split big/>
      <FlexRow width="100%" justifyContent="center">
        <Avatar shouldSelect @avatarPicked="user.avatar = $event"/>
      </FlexRow>

      <Split big/>
      <Label text="First Name" fontSize="20" color="black"/>
      <Textbox v-model="user.name" hint="e.g. John"/>

      <Split big/>
      <Label text="Last Name" fontSize="20" color="black"/>
      <Textbox v-model="user.surname" hint="e.g. Alexis"/>

      <Split big/>
      <Label text="Username" fontSize="20" color="black"/>
      <Textbox v-model="user.username" hint="e.g. John Alexis"/>

      <Split big/>
      <Label text="Email" fontSize="20" color="black"/>
      <Textbox v-model="user.email" hint="e.g. johnalexi@gmail.com"/>

      <Split big/>
      <Label text="Phone Number" fontSize="20" color="black"/>
      <Textbox v-model="user.phone" hint="+92___ ________"/>

      <Split big/>
      <Label text="Location" fontSize="20" color="black"/>
      <Textbox v-model="user.location" hint="e.g. London, United States"/>

      <Split big/>
      <Label text="Password" fontSize="20" color="black"/>
      <Textbox v-model="user.password" hint="Password must be at least 8 chars long"/>

      <Split big/>
      <Label text="Repeat Password" fontSize="20" color="black"/>
      <Textbox type="password" v-model="user.confirmPassword" hint="Repeat your password"/>

      <Split/>
      <StateButton :inactive="registering" :disabled="registering" @onTap="register" text="Sign Up"/>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import Avatar from '@/components/blocks/user/Avatar'
import Api from '@/services/api'
import Auth from '@/services/auth' 
import EventBus from '@/services/event-bus'
import uploadImage from '@/services/upload-image'

export default {
  data: () => ({
    user: {
      avatar: null,
      name: '',
      surname: '',
      username: '',
      email: '',
      phone: '',
      location: '',
      password: '',
      confirmPassword: ''
    },
    registering: false
  }),
  methods: {
    register() {
      let reqObj = { ...this.user }
      const avatar = reqObj.avatar
      delete reqObj.avatar

      let errors = 0
      Object.keys(reqObj).forEach((key) => {
        reqObj[key] = reqObj[key].trim()
        if (!reqObj[key]) errors += 1
      })
      if (reqObj.password !== reqObj.confirmPassword) errors += 1

      if (errors > 0 || !avatar) return

      this.registering = true
      return Api.registerUser(reqObj)
        .then((result) => {
          const { username, password } = reqObj
          return this.$store.dispatch('authentication/login', { username, password })
        })
        .then(() => {
          let saveLocalAvatarPromise = Promise.resolve()
          // move this to helpers
          if (avatar) {
            const filename = `avatar_${this.user.username}_${Date.now()}`
            saveLocalAvatarPromise = uploadImage.saveTempImage(avatar, filename)
              .then((path) => {
                return uploadImage.verifyFileSize(path, 2 * 1024 * 1024)
                  .then(() => path)
              })
              .then(path => Api.updateAvatar(path))
          }

          return saveLocalAvatarPromise
            .then(() => {
              this.gotoEditProfile()
            })
        })
        .catch((err) => {
          Alert.showAlert({
            title: 'Error',
            message: err.msg || 'Unknown error has occured',
            type: 'error'
          })
        })
        .finally(() => {
          this.registering = false
        })
    },
    gotoEditProfile() {
      EventBus.$emit('navigateTo', 'EditProfile')
    }
  },
  components: {
    Avatar
  }
}
</script>