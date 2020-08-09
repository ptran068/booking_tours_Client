<template>
  <div class="container-fluid">
    <h1 class="text-center pb-5">{{ tour.title }}</h1>
    <div class="text-center"><img v-if="tour.images[0]" :src="tour.images[0].link" alt="" class="rounded-lg" width="70%"></div>
    <hr>
    <div>
      <small >Created By: {{tour.created_by.last_name}} {{tour.created_by.first_name}} </small>
      <small style="float: right;">Views: {{tour.views}} </small>
    </div>
    <hr>
    <div class="pt-5 pb-5">{{tour.description}}</div>
    <hr>
    <div class="pt-5 pb-5">{{tour.policy}}</div>
    <div>
      <p class="d-inline mr-13">Rating: {{tour.avg_rating.score__avg}}</p>
      <button v-if="token" class="btn-sm btn-primary text-light d-inline">Rating</button>
    </div>
    
    <div>
      <button
      class="btn btn-primary text-light mt-5 mb-5 d-inline"
      @click.stop="dialog = true"
      >
      Booking
      </button>
      <v-dialog
          v-model="dialog"
          persistent max-width="600px"
        >
          <v-card >
            <v-card-title class="headline" >Chose date to start tour</v-card-title>
            <v-card-text>
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="start_date"
                    readonly
                    prepend-icon="mdi-calendar-range-outline"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                  <v-date-picker v-model="start_date" @input="menu2 = false"></v-date-picker>
              </v-menu>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <button @click="dialog = false"
                class="btn btn-primary text-light mr-5"> Cancel </button>
              <router-link  @click="dialog = false" :to="{ name: 'payment'}" ><button class="btn btn-primary text-light" @click="postBooking">Payment</button></router-link>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <router-link :to="{ name: 'index'}" class="btn btn-primary text-light ml-5">Back</router-link>
    </div>
  </div>
</template>
<script>
import { data } from '../../services/data.service'
import { postBook } from '../../services/book.service'
export default {
  name: 'Tours',
  data () {
    return {
      tour: '',
      dialog: false,
      start_date: new Date().toISOString().substr(0, 10),
      menu2: false,
      token: localStorage.getItem('token')
    }
  },
  async created () {
    await this.loadTour()
  },
  methods: {
    async loadTour () {
      this.tour = await data.getTourDetail(this.$route.params.id)
    },
    async postBooking () {
      console.log(this.start_date)
      try {
        await postBook({ start_date: this.start_date }, this.$route.params.id)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
