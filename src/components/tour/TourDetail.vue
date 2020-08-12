<template>
  <div class="container-fluid">
    <div class="text-center mt-5">
      <div class="float-left">
        <router-link :to="{ name: 'index'}" class="btn btn-primary text-light ml-5">Back</router-link>
      </div>
      <h1 class="text-center">{{ tour.title }}</h1>
    </div>
    <div class="row border border-secondary rounded-lg m-1">
      <div class="col-sm-12 col-md-6 col-lg-6 d-flex justify-content-center align-items-center border-secondary border-right">
          <img v-if="tour.images[0]" :src="tour.images[0].link" alt class="rounded-lg" width="70%" />
      </div>
      <div class="col-sm-12 col-md-6 col-lg-6">
        <div>
          <small><strong>Created By: </strong>{{tour.created_by.last_name}} {{tour.created_by.first_name}}</small>
          <small style="float: right;"><strong>Views: </strong>{{tour.views}}</small>
        </div>
        <hr />
        <div class="pt-5 pb-5">{{tour.description}}</div>
        <hr />
        <div class="pt-5 pb-5">{{tour.policy}}</div>
        <hr>
        <p v-if="tour.duration === 1">Durations: {{tour.duration}} day</p>
        <p v-else><strong>Durations: </strong>{{tour.duration}} days</p>
        <hr />
        <div>
          <p class="d-inline mr-10" v-if="avg_score != 0 "><strong>Rating: </strong> <v-rating
            v-model="avg_score"
            half-increments
            readonly
            class="d-inline"
          ></v-rating> ({{avg_score}} / 5)</p>
          <p v-else class="d-inline mr-10"><strong>Rating: </strong> No one has rated this!</p>
          <button
            v-if="$currentUser.id"
            class="btn-sm btn-primary text-light float-right"
            @click.stop="ratingDialog = true"
          >Rating</button>
          <v-dialog v-model="ratingDialog" max-width="320">
            <v-card>
              <v-card-title class="headline">This tour is great, isn't it?</v-card-title>
              <div class="text-center">
                <v-rating v-model="score"
                ></v-rating>
              </div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <button
                  @click="ratingDialog = false"
                  class="btn-sm btn-primary text-light mr-5"
                >Cancel</button>
                <button class="btn-sm btn-primary text-light" @click="postRating">Rating</button>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <hr />
        <div class="mb-5"><strong>Tour quantity:</strong> {{tour.limit_booking}}</div>
        <div v-if="status">
          <button
            class="btn btn-primary text-light mt-5 mb-5 d-inline"
            @click.stop="dialog = true"
          >Booking</button>

          <v-dialog v-if="$currentUser.id" v-model="dialog" persistent max-width="600px">
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
                <v-dialog v-model="dialogNotifi" max-width="350">
                  <v-card>
                    <v-card-title class="headline">Notice</v-card-title>
                      <v-card-text>{{msg}}</v-card-text>
                      <v-card-text v-if="msg === 'successfully'">Start Day: {{start_date}}</v-card-text>
                      <v-card-text v-if="msg === 'successfully'">End Day: {{end_date}}</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                          <v-btn v-if="msg === 'Day tour limit is exceeded'" color="green darken-1" text @click="dialogNotifi = false, dialog = false">Try again!</v-btn>
                          <router-link
                          v-else
                            :to="{name: 'payment', params: { id: tour.id}}"
                          >
                            <button class="btn btn-primary text-light mr-5" @click="postBooking">Payment</button>
                          </router-link>
                    </v-card-actions>
                    </v-card>
                </v-dialog>
                <button class="btn btn-primary text-light mr-5" @click="postBooking">Booking</button>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-else v-model="dialog" max-width="290">
            <v-card>
              <v-card-title class="headline">Notice</v-card-title>
                <v-card-text>You must login</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">Ok</v-btn>
                </v-card-actions>
              </v-card>
          </v-dialog>
        </div>
        <div v-else-if="$currentUser.id">
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
import {
  postRating,
  getRating,
  putRating
} from '../../services/rating.service'
export default {
  name: 'Tours',
  components: {
    ReviewList
  },
  data () {
    return {
      tour: null,
      msg: null,
      dialog: false,
      status: true,
      ratingDialog: false,
      cancelDialog: false,
      dialogNotifi: false,
      book: null,
      start_date: new Date().toISOString().substr(0, 10),
      end_date: null,
      score: 5,
      menu2: false,
      token: localStorage.getItem('token'),
      avg_score: 0,
      duration: 0
    }
  },
  async created () {
    await this.loadTour()
    await this.loadBook(this.tour.id)
  },
  methods: {
    async loadTour () {
      this.tour = await data.getTourDetail(this.$route.params.id)
      this.duration = this.tour.duration
      if (this.tour.avg_rating.score__avg !== null) {
        this.avg_score = Math.round((this.tour.avg_rating.score__avg * 10)) / 10
      }
    },
    async postBooking () {
      try {
        let end = new Date(this.start_date)
        var dateValue = end.getDate() + this.duration
        end.setDate(dateValue)
        this.end_date = end.toISOString().substr(0, 10)
        await postBook({ start_date: this.start_date, end_date: this.end_date }, this.$route.params.id)
        this.msg = 'successfully'
        this.dialogNotifi = true
      } catch (error) {
        console.log(error)
        this.msg = 'Day tour limit is exceeded'
        this.dialogNotifi = true
      }
    },
    async postRating () {
      try {
        const ratings = await getRating()
        let pk = null
        for (let i = 0; i < ratings.length; i++) {
          if (
            ratings[i].user_id === this.$currentUser.id &&
            ratings[i].tour_id.id === this.$route.params.id
          ) {
            pk = ratings[i].id
          }
        }
        if (pk !== null) {
          await putRating({ score: this.score }, pk)
          const tour = await data.getTourDetail(this.$route.params.id)
          this.avg_score = Math.round((tour.avg_rating.score__avg * 10)) / 10
        } else {
          await postRating({ score: this.score }, this.$route.params.id)
          const tour = await data.getTourDetail(this.$route.params.id)
          this.avg_score = Math.round((tour.avg_rating.score__avg * 10)) / 10
        }
      } catch (error) {
        console.log(error)
      }
      this.ratingDialog = false
    },
    async loadBook (tour_id) {
      this.book = await getBook(tour_id)
      if (this.book.status != null) {
        var date = new Date()
        var dateStart = new Date(this.book.start_date)
        if (date.getTime() >= dateStart.getTime() || this.book.status) {
          this.status = true
        } else this.status = false
      } else this.status = true
    },
    async cancel () {
      this.book = await cancelBook(
        { start_date: this.book.start_date, end_date: this.book.end_date },
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
