<template>
  <v-app>
    <AppHeader class="sticky-top"></AppHeader>
    <div class="wrapper">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
    <!-- <AppFooter v-if="!$isAdmin"></AppFooter> -->
  </v-app>
</template>

<script>
import AppHeader from '../layout/Header.vue'

export default {
  name: 'AppLayout',
  components: {
    AppHeader
  }
}
</script>

<style lang="stylus">
@import "../assets/css/grid_item.css"
@import "../assets/css/home.css"
@import "../assets/css/info_user.css"
@import "../assets/css/detail.css"
.clickable
  cursor pointer
</style>
