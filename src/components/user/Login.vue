<template>
  <v-dialog
    :value="visible"
    @keydown.esc="closeDialog()"
    max-width="500"
    @click:outside="closeDialog()"
  >
    <v-card class="elevation-12 ma-0">
      <v-tabs
        v-model="tab"
        color="#08855B"
        class="px-3 pt-2"
      >
        <v-tabs-slider color="#08855B"> </v-tabs-slider>
        <v-tab href="#login" class="font-weight-bold">
          <v-icon>mdi-account</v-icon>
          <span class="ml-2 mt-2 "> Login </span>
        </v-tab>
        <v-tab href="#register" class="font-weight-bold">
          <v-icon>mdi-pencil-box-outline</v-icon>
          <span class="ml-2 mt-2"> Register </span>
        </v-tab>
      </v-tabs>
      <v-divider></v-divider>

      <v-tabs-items v-model="tab" class="tab-content ">
        <v-tab-item value="login">
          <v-alert
            type="success"
            dense
            :value="!!successMessage"
            outlined
          >
            {{ successMessage }}
          </v-alert>

          <v-alert
            type="error"
            dense
            :value="!!loginFailedMessage"
            outlined
          >
            {{ loginFailedMessage }}
          </v-alert>

          <v-card-text class="pb-0">
            <v-form ref="login" >
              <v-text-field
                label="Email"
                color="#08855B"
                prepend-icon="mdi-email-outline"
                v-model="email"
                :rules="[rules.required, rules.email]"
              ></v-text-field>

              <v-text-field
                v-model="password"
                type="password"
                label="Password"
                prepend-icon="mdi-lock-outline"
                color="#08855B"
                :rules="[rules.required]"
              ></v-text-field>
            </v-form>
            <div class="d-flex justify-center pt-1">
              <p class="blue--text">Forgot Password?</p>
            </div>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions class="d-flex justify-center pb-5">
            <v-btn color="#08855B" min-width="180px" class="white--text font-weight-bold" @click="login">
              <span class="mt-1">Login</span>
            </v-btn>
          </v-card-actions>
          <br>
        </v-tab-item>
        <v-tab-item value="register" >
          <v-form ref="register">
            <v-container fluid class="ma-0 pa-0">
              <v-alert
                type="error"
                dense
                :value="!!existingUserErrorMessage"
                outlined
              >
                {{ existingUserErrorMessage }}
              </v-alert>
              <v-row>
                <v-col cols="3">
                  <v-subheader class="font-weight-bold pt-6 px-0">Email <span class="red--text">&ensp;*</span></v-subheader>
                </v-col>
                <v-col cols="9">
                  <v-text-field
                    placeholder="Type email"
                    v-model="resEmail"
                    :rules="[rules.required, rules.email]"
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-subheader class="font-weight-bold pt-6 px-0">Phone <span class="red--text">&ensp;*</span></v-subheader>
                </v-col>
                <v-col cols="9">
                  <v-text-field
                    placeholder="Type phone number"
                    v-model="resPhone"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-subheader class="font-weight-bold pt-6 px-0">Password<span class="red--text">&ensp;*</span></v-subheader>
                </v-col>
                <v-col cols="9">
                  <v-text-field
                    placeholder="Type password"
                    v-model="resPassword"
                    :rules="[rules.required]"
                    type="password"
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                </v-col>
                <v-col cols="9">
                  <p class="register-caption">Press Register plz <a href="#" style="color: #08855B;">Term and policy</a></p>
                </v-col>
                <v-row justify="center" class="pb-5">
                  <v-btn
                    color="yellow darken-1"
                    class="body-1 font-weight-bold mt-1"
                    @click="register"
                  >Register</v-btn>
                </v-row>
              </v-row>
            </v-container>
          </v-form>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-dialog>
</template>

<script>
import * as authService from '../../services/auth.service'
import ValidationMixin from '../../mixins/validation'
import { mapGetters } from 'vuex'
export default {

  mixins: [ValidationMixin],

  props: {
    source: String,
    visible: Boolean,
    defaultTab: String
  },

  data: () => ({
    drawer: null,
    tab: null,
    email: '',
    password: '',

    resEmail: '',
    resPassword: '',
    resPhone: '',

    existingUserErrorMessage: undefined,
    successMessage: undefined,
    loginFailedMessage: undefined
  }),

  watch: {
    defaultTab (val) {
      this.tab = val
    },

    visible () {
      this.existingUserErrorMessage = undefined
      this.successMessage = undefined
      this.loginFailedMessage = undefined

      if (this.$refs.login) {
        this.$refs.login.reset()
      }

      if (this.$refs.login) {
        this.$refs.login.reset()
      }
    }
  },

  computed: {
    ...mapGetters({ isAdmin: 'user/isAdmin' })
  },

  methods: {
    async login () {
      if (this.$refs.login.validate()) {
        try {
          await authService.login({ email: this.email, password: this.password })
          this.closeDialog()
        } catch (error) {
          this.loginFailedMessage = 'Đăng nhập thất bại!!'
        }
      }
    },

    buildRegisterData () {
      return {
        email: this.resEmail,
        password: this.resPassword,
        phone: this.resPhone
      }
    },

    closeDialog () {
      this.$emit('update:visible', false)
    },

    async register () {
      if (this.$refs.register.validate()) {
        try {
          await authService.create(this.buildRegisterData())
          this.closeDialog()
          this.$router.push({ name: 'manage-user' })
        } catch (error) {
          this.loginFailedMessage = 'Đăng nhập thất bại!!'
        }
      }
    }
  }
}
</script>

<style lang="css">
.tab-content {
  margin: 0px 45px 0 0;
  padding-left: 25px;
}

.register-caption {
  font-size: 13px;
}
</style>
