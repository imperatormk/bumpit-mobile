export default {
  computed: {
    loggedInUser() {
      return this.$store.state.authentication.user || null
    },
    isLoggedIn() {
      return this.$store.state.authentication.status.loggedIn
    }
  }
}