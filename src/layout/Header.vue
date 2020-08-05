<template>
  <div>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark justify-content-end py-0">
      <ul class="navbar-nav">

        <li class="nav-item " v-show="!$currentUser.id">
          <div class="nav-link register clickable" @click="openLoginDialog()">
            Register
          </div>
        </li>

        <li class="nav-item" v-show="!$currentUser.id">
          <div class="nav-link clickable" @click="openLoginDialog(true)">
            Login
          </div>
        </li>

        <li class="nav-item" v-if="$currentUser.id">
          <div class="nav-link clickable" @click="$router.push({ name: 'user-infor'})">
             {{ greeting }}
          </div>
        </li>

        <li class="nav-item" v-if="$currentUser.id" @click="makeLogout">
          <div class="nav-link clickable">
            Logout
            <i class="fa fa-sign-out"></i>
          </div>
        </li>

      </ul>
    </nav>

    <div class="navbar navbar-expand-md navbar-dark bg-light mb-0 py-0 sticky-top" v-if="!isAdmin()">
      <router-link class="navbar-brand" :to="{ name: 'index' }">
        <img src="../assets/img/logo.png" alt="logo" width="50%">
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon bg-secondary"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li>
            <button class="dropbtn active" >HOME</button>
          </li>
        </ul>
        <form class="form-inline my-auto mt-md-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" style="height: 35px;">
          <button class="btn btn-outline-secondary mr-sm-2" type="button"><img src="../assets/img/search.png" alt="search"  style="width: 20px"></button>
        </form>
      </div>
    </div>
    <login-dialog
      :visible.sync="loginDialogVisible"
      :default-tab="defaultLoginDialogTab"
    >
    </login-dialog>
  </div>
</template>

<script>
import LoginDialog from '../components/user/Login';
import { makeLogout } from "../services/auth.service";
import { mapGetters } from 'vuex';

export default {

  components: {
    LoginDialog
  },

  data() {
    return {
      makeLogout,
      loginDialogVisible: false,
      defaultLoginDialogTab: 'login',
    };
  },

  computed: {
    greeting() {
      return `Hello ${this.$currentUser.email}`;
    }
  },

  methods: {
    openLoginDialog(isLogin) {
      this.defaultLoginDialogTab = isLogin ? 'login' : 'register';
      this.loginDialogVisible = true;
    },
    ...mapGetters({ isAdmin: 'user/isAdmin'}),
  },
}
</script>

<style lang="stylus" scoped>
</style>
