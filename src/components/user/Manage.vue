<template>
  <v-container class="grey lighten-5">

    <v-row>
      <v-col :cols="6">
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
                <v-card-title>{{$currentUser.first_name ? $currentUser.first_name : null}} {{$currentUser.last_name ? $currentUser.last_name : null}}</v-card-title>
              </v-img>

              <v-card-subtitle class="pb-0">{{$currentUser.email}}</v-card-subtitle>

              <v-card-text class="text--primary">
                <div>{{$currentUser.phone}}</div>

                <div>Whitsunday Island, Whitsunday Islands</div>
              </v-card-text>
            </v-card>
        </div>
      </v-col>
      
        <v-col :cols="6">
                    <div class="wrapper">
                        <div class="title">
                            <h4>List Transaction </h4>
                        </div>
                        <div v-for="transaction in transactions" :key="transaction.id">
                            <p class="trs">{{transaction.description}}</p>
                            <p class="trs">Amount: {{transaction.amount}}</p>
                            <p class="trs">status: {{transaction.status}}</p>
                        <hr>
                            
                        </div>
                    </div>
                    
               </v-col>
    </v-row>
  </v-container>
</template>

<script>

import PaymentService from '../../services/payment.service'

export default {
  data: () => ({
    transactions: []
  }),

  methods: {
    async getTransaction () {
      const data = await PaymentService.getTransactions()
      this.transactions = data.data.results
    }
  },
  mounted () {
    this.getTransaction()
  }

}
</script>
<style scoped>
    .trs {
        color:indianred;
    }

</style>
