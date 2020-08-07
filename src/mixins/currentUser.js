export default {
  computed: {
    $currentUser () {
      return this.$store.state.user.currentUser
    },

    $isAdmin() {
      return this.$currentUser && this.$currentUser.role === 1
    }
  }
}
