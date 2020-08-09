<template>
  <v-container class="grey lighten-5">

    <v-row no-gutters>
      <v-col
        :cols="6"
      >
        <div>
            <v-card
              class="mx-auto"
              max-width="400"
            >
              <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title>Top 10 Australian beaches</v-card-title>
              </v-img>

              <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

              <v-card-text class="text--primary">
                <div>Whitehaven Beach</div>

                <div>Whitsunday Island, Whitsunday Islands</div>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="orange"
                  text
                >
                  Share
                </v-btn>

                <v-btn
                  color="orange"
                  text
                >
                  Explore
                </v-btn>
              </v-card-actions>
            </v-card>
        </div>
      </v-col>
      <v-col :cols="6">
        <div class="wrapper">
          <div class="title">
            <h4>Payment Here </h4>
          </div>
          <stripe-elements
            ref="elementsRef"
            :pk="publishableKey"
            :amount="amount"
            locale="en"
            @token="tokenCreated"
            @loading="loading = $event"
          >
          </stripe-elements>
          <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          @click="submit"
        >
          Pay ${{amount / 100}}
        </v-btn>
      </template>

    </v-dialog>
  </div>
          <!-- <button @click="submit">Pay ${{amount / 100}}</button> -->
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { StripeElements } from 'vue-stripe-checkout';
import { getTour } from '../../services/tour.service'
import PaymentService from '../../services/payment.service'
import {PUBLISH_ABLE_KEY} from '../../.env'
export default {
  components: {
    StripeElements
  },
  data: () => ({
    dialog: false,
    loading: false,
    amount: 0,
    publishableKey: 'pk_test_51HARcVFZiqUk9BtoWsPZfsz6nnXVGCTi8ioUPx0Gfsl61WyNGFqO5sM5cK6tcH9JVYj8QoxVFm5hkASGHGucFXGx00pgyLfWmV',
    token: null,
    charge: null,
    description: ''
  }),
  methods: {
    async init() {
      const tour = await this.getTour()
      this.amount = tour.data.amount
      this.description = tour.data.title
    },

    async getTour() {
      const tour = await getTour()
      return tour
    },
    submit () {
      this.$refs.elementsRef.submit();
    },
    tokenCreated (token) {
      this.token = token;
      this.charge = {
        'token': token.id,
        'amount': this.amount, // the amount you want to charge the customer in cents. $100 is 1000 (it is strongly recommended you use a product id and quantity and get calculate this on the backend to avoid people manipulating the cost)
        'description': this.description // optional description that will show up on stripe when looking at payments
      }
      this.sendTokenToServer(this.charge);
    },
    sendTokenToServer (data) {
      PaymentService.charge(data)
      this.$router.push({ path: '/payment/complete' });
    }
  },
  mounted() {
    this.init()

  }
}
</script>
<style scoped>
  .wrapper {
    width: 500px;
    margin: 0 auto;
    height: 100%;
  }

  button {
    margin-top: 1rem;

  }

  .title {
    margin-bottom: 10px;
  }

</style>