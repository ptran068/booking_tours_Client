<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col :cols="6">
        <div>
          <v-card class="mx-auto position-fixed" max-width="400">
            <v-img
              class="white--text align-end"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
              <v-card-title
                >{{ $currentUser.first_name ? $currentUser.first_name : null }}
                {{
                  $currentUser.last_name ? $currentUser.last_name : null
                }}</v-card-title
              >
            </v-img>
            <div class="text--primary p-3">
              <div>Email: {{ $currentUser.email }}</div>
              <hr />
              <div>
                First name:
                {{ $currentUser.first_name ? $currentUser.first_name : null }}
              </div>
              <hr />
              <div>
                Last name:
                {{ $currentUser.last_name ? $currentUser.last_name : null }}
              </div>
              <hr />
              <div>Phone: {{ $currentUser.phone }}</div>
              <hr />
              <div>
                <router-link :to="{ name: 'manage-review' }">
                  Manage Review
                </router-link>
              </div>
            </div>
          </v-card>
        </div>
      </v-col>
      <v-col :cols="6">
        <h4 class="mx-auto border-bottom">List Transaction </h4>
        <div v-for="transaction in transactions" :key="transaction.id">
                    <div class="mt-10 border-bottom border-top p-3" max-width="400">
          <div>
            <div class="trs mt-1">Tour go to: {{transaction.tour.address}} <router-link :to="{name: 'tour', params: {id: transaction.tour.id}}">Learn more</router-link> </div>

            <div class="trs mt-1">
               Amount: {{transaction.amount}}$
             <div class="trs mt-1">
              Payment at: {{$showTime(transaction.created_at)}}
             </div>
              <div class="trs mt-1">
              Status: {{transaction.status}}
              </div>
            </div>
          </div>
                    </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaymentService from "../../services/payment.service";
import ReviewByUser from "../review/ReviewByUser";

export default {
  data: () => ({
    transactions: []
  }),
  components: {
    ReviewByUser
  },

  methods: {
    async getTransaction() {
      const data = await PaymentService.getTransactions();
      this.transactions = data.data.results;
      console.log(this.transactions);
    }
  },
  mounted() {
    this.getTransaction();
  }
};
</script>
<style scoped>
.trs {
  color: indianred;
}
</style>
