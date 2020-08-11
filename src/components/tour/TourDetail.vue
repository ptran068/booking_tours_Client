<template>
  <div class="container-fluid">
    <div class="text-center mt-5">
      <div class="float-left">
        <router-link :to="{ name: 'index'}" class="btn btn-primary text-light ml-5">Back</router-link>
      </div>
      <h1 class="text-center">{{ tour.title }}</h1>
    </div>
    <div class="row border border-secondary rounded-lg m-1">
      <div class="col-sm-12 col-md-6 col-lg-6">
        <div class="text-center">
          <img v-if="tour.images[0]" :src="tour.images[0].link" alt class="rounded-lg" width="70%" />
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-6">
        <div>
          <small>Created By: {{tour.created_by.last_name}} {{tour.created_by.first_name}}</small>
          <small style="float: right;">Views: {{tour.views}}</small>
        </div>
        <hr />
        <div class="pt-5 pb-5">{{tour.description}}</div>
        <hr />
        <div class="pt-5 pb-5">{{tour.policy}}</div>
        <hr />
        <div>
          <p v-if="avg_score != 0 " class="d-inline mr-10 ">Rating: {{avg_score}}</p>
          <p v-else class="d-inline mr-10">Rating: No one has rated this!</p>
          <button v-if="$currentUser.id" class="btn-sm btn-primary text-light float-right" @click.stop="ratingDialog = true">Rating</button>
          <v-dialog v-model="ratingDialog" max-width="320">
            <v-card>
              <v-card-title class="headline">This tour is great, isn't it?</v-card-title>
              <div class="text-center">
                <v-rating v-model="score"></v-rating>
              </div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <button @click="ratingDialog = false" class="btn-sm btn-primary text-light mr-5">Cancel</button>
                <button v-if="pk" class="btn-sm btn-primary text-light" @click="putRating">Update</button>
                <button v-else class="btn-sm btn-primary text-light" @click="postRating">Rating</button>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <hr />
        <div v-if="status">
          <button
            class="btn btn-primary text-light mt-5 mb-5 d-inline"
            @click.stop="dialog = true"
          >Booking</button>

          <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
              <v-card-title class="headline">Chose date to start tour</v-card-title>
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
                <button @click="dialog = false" class="btn btn-primary text-light mr-5">Cancel</button>
                <router-link
                  @click="dialog = false"
                  :to="{name: 'payment', params: { id: tour.id}}"
                >
                  <button class="btn btn-primary text-light" @click="postBooking">Payment</button>
                </router-link>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div v-else>
          <button class="btn btn-danger" @click.stop="cancelDialog=true">Cancel Book</button>
          <v-dialog v-model="cancelDialog" max-width="290">
            <v-card>
              <v-card-title class="headline">You want to cancel the tour?</v-card-title>
              <v-card-text>You will not get a refund.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="cancelDialog = false">Cancel</v-btn>
                <v-btn color="green darken-1" text @click="cancel">Agree</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <ReviewList v-bind:tour_id="tour.id"></ReviewList>
    </div>
  </div>
</template>
<script>
import ReviewList from '../review/ReviewList'
import { data } from '../../services/data.service'
import { postBook, getBook, cancelBook } from '../../services/book.service'
import { postRating, getRating, putRating } from '../../services/rating.service'
export default {
  name: 'Tours',
  components: {
    ReviewList
  },
  data () {
    return {
      tour: '',
      dialog: false,
      status: true,
      ratingDialog: false,
      cancelDialog: false,
      book: '',
      start_date: new Date().toISOString().substr(0, 10),
      score: 5,
      menu2: false,
      token: localStorage.getItem('token'),
      avg_score: 0,
      ratings: [],
      pk: null
    }
  },
  async created () {
    await this.loadRating()
    await this.loadTour()
    await this.loadBook(this.tour.id)
  },
  methods: {
    async loadTour () {
      this.tour = await data.getTourDetail(this.$route.params.id)
      if (this.tour.avg_rating.score__avg !== null) {
        this.avg_score = this.tour.avg_rating.score__avg
      }
    },
    async loadRating () {
      this.ratings = await getRating()
      for (let i = 0; i < this.ratings.length; i++) {
        if (this.ratings[i].user_id === this.$currentUser.id && this.ratings[i].tour_id.id === this.$route.params.id) {
          this.pk = this.ratings[i].id
        }
      }
    },
    async postBooking () {
      try {
        await postBook({ start_date: this.start_date }, this.$route.params.id)
      } catch (error) {
        console.log(error)
      }
    },
    async postRating () {
      try {
        await postRating({ score: (this.score * 2) }, this.$route.params.id)
        const tour = await data.getTourDetail(this.$route.params.id)
        this.avg_score = tour.avg_rating.score__avg
      } catch (error) {
        console.log(error)
      }
      this.ratingDialog = false
      this.ratings = await getRating()
      for (let i = 0; i < this.ratings.length; i++) {
        if (this.ratings[i].user_id === this.$currentUser.id && this.ratings[i].tour_id.id === this.$route.params.id) {
          this.pk = this.ratings[i].id
        }
      }
    },
    async putRating () {
      try {
        await putRating({ score: (this.score * 2) }, this.pk)
        const tour = await data.getTourDetail(this.$route.params.id)
        this.avg_score = tour.avg_rating.score__avg
      } catch (error) {
        console.log(error)
      }
      this.ratingDialog = false
    },
    async loadBook (tour_id) {
      this.book = await getBook(tour_id)
      var date = new Date()
      var dateStart = new Date(this.book.start_date)

      if (date.getTime() >= dateStart.getTime() || this.book.status) {
        this.status = true
      } else this.status = false
    },
    async cancel () {
      this.book = await cancelBook(
        { start_date: this.book.start_date },
        this.book.id
      )
      if (this.book.status) {
        this.status = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
