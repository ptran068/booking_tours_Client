<template>
  <v-container class="grey lighten-5">

    <v-row no-gutters>
      <v-col
        :cols="6"
      >
        <h4 class="text-center mb-5">Information about the tour</h4>
        <div>
            <v-card
              class="mx-auto"
              max-width="500"
            >
              <v-img
                v-if="tourDetail.images[0]"
                class="white--text align-end"
                height="200px"
                :src="tourDetail.images[0].link"
              >
                <v-card-title>{{tourDetail.title}}</v-card-title>
              </v-img>
              <v-card-subtitle class="pb-0"><strong>Booked At: </strong> {{$showTime(book.created_at)}}</v-card-subtitle>
              <hr>
              <v-card-text class="text--primary">
                <div><strong>Address: </strong>{{tourDetail.address}}</div>
                <div><strong>Amount: </strong>{{tourDetail.amount / 100}} $</div>
                <br>
                <div><strong>Description: </strong>{{tourDetail.description}}</div>
                <hr>
                <div><strong>Schedule</strong></div>
                <div>- Star day: {{book.start_date}}</div>
                <div>- End day: {{book.end_date}}</div>
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
                  @click="print"
                >
                  Print
                </v-btn>
              </v-card-actions>
            </v-card>
        </div>
      </v-col>
      <v-col :cols="6">
        <div class="wrapper">
          <div class="title">
            <h4 class="text-center mb-5">Payment Here </h4>
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
import { StripeElements } from 'vue-stripe-checkout'
import { getTour } from '../../services/tour.service'
import PaymentService from '../../services/payment.service'
// eslint-disable-next-line no-unused-vars
import { PUBLISH_ABLE_KEY } from '../../.env'
import { getBook } from '../../services/book.service'
export default {
  components: {
    StripeElements
  },
  data: () => ({
    dialog: false,
    tourDetail: null,
    loading: false,
    amount: 0,
    publishableKey: 'pk_test_51HARcVFZiqUk9BtoWsPZfsz6nnXVGCTi8ioUPx0Gfsl61WyNGFqO5sM5cK6tcH9JVYj8QoxVFm5hkASGHGucFXGx00pgyLfWmV',
    token: null,
    charge: null,
    description: '',
    book: null
  }),
  methods: {
    async loadBook () {
      const book = await getBook(this.$route.params.id)
      return book
    },
    async init () {
      const tour = await this.getTour()
      this.book = await this.loadBook()
      this.amount = tour.data.amount
      this.description = tour.data.title
      this.tourDetail = tour.data
    },

    async getTour () {
      const tour = await getTour(this.$route.params.id)
      return tour
    },

    async sendMail () {
      const mail = await PaymentService.sendMail()
      return mail
    },
    print () {
      print()
    },
    submit () {
      this.$refs.elementsRef.submit()
    },
    tokenCreated (token) {
      this.token = token
      this.charge = {
        'token': token.id,
        'amount': this.amount, // the amount you want to charge the customer in cents. $100 is 1000 (it is strongly recommended you use a product id and quantity and get calculate this on the backend to avoid people manipulating the cost)
        'description': this.description // optional description that will show up on stripe when looking at payments
      }
      this.sendTokenToServer(this.charge)
    },
    sendTokenToServer (data) {
      debugger
      PaymentService.charge({
        data: data,
        id: this.$route.params.id
      })
      this.sendMail()

      this.$router.push({ path: '/complete' })
    }
  },
  mounted () {
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
