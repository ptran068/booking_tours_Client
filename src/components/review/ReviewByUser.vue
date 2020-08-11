<template>
  <div>
    <div>
      <v-row justify="center">

        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline"
              >Use Google's location service?</v-card-title
            >

            <v-card-text>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" text @click="dialog = false">
                cancel
              </v-btn>

              <v-btn color="green darken-1" text @click="handleAction">
                Agree
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row justify="center">

        <v-dialog v-model="dialogMsg" max-width="290">
          <v-card>
            <v-card-title class="headline"
              >Notice</v-card-title
            >

            <v-card-text>
                {{msg}}
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" text @click="dialogMsg=false">
                Ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>

    <div v-for="(review, index) in reviews" :key="review.id">
      <div class="card mb-8">
        <img
          v-if="review.images[0]"
          :src="review.images[0].link"
          class="card-img-top"
          alt="not found"
          style="height:175px"
        />
        <div class="card-body">
          <div class="card-title">
            <div class="float-left">
              <h5>{{ review.title }}</h5>
            </div>
            <strong style="float: right;">
              <v-div @click="like(review.id, index)" class="mr-6">
                <strong class="mr-2 pb-2">{{ review.like.length }}</strong>
                <v-btn icon>
                    <v-icon
                  v-if="review.like.indexOf($currentUser.id) > -1"
                  medium
                  class="pb-2"
                  color="rgb(32, 120, 244)"
                  >mdi-thumb-up</v-icon
                >
                <v-icon v-else medium class="pb-2" color=""
                  >mdi-thumb-up</v-icon>
                </v-btn>
                </v-div
              >{{ review.views }} Views
            </strong>
          </div>
          <br />
          <p class="card-text">
            {{ review.content }}
          </p>
          <div class="text-center">
            <router-link
              :to="{ name: 'review', params: { id: review.id } }"
              class="btn btn-primary text-light mr-5"
              >Read more ...</router-link
            >
            <!-- @click="del(review.id, review.tours)" -->
            <button
              class="btn btn-danger"
              @click="notice(review.id, review.tours, index)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row"></div>
    <div v-if="page" class="text-center">
      <button v-if="load" @click="paginator" class="btn btn-primary text-light">
        See more
      </button>
      <button v-else @click="paginator" class="btn btn-primary text-light">
        See more
      </button>
    </div>
  </div>
</template>

<script>
import { getReviewByUser, deleteReview } from '../../services/review.service'
import { likeReview } from '../../services/reviewDetail.service'
export default {
  name: 'ReviewBy',
  props: {
    tour_id: String
  },
  data () {
    return {
      dialog: false,
      reviews: [],
      reviewId: '',
      tourId: '',
      page: 0,
      dialogMsg: false,
      msg: '',
      load: true,
      status: '',
      titleRules: [
        v => !!v || 'Title is required',
        v => (v && v.length <= 20) || 'Title must be less than 20 characters'
      ],
      contentRules: [v => !!v || 'Content is required']
    }
  },
  async created () {
    await this.loadReviews()
  },
  methods: {
    async loadReviews () {
      this.reviews = []
      this.reviews = await getReviewByUser(this.page)
      if (this.reviews.length < 10) {
        this.page = 0
      }
    },
    handleEmail (email) {
      var index = email.indexOf('@')
      return email.slice(0, index)
    },

    async paginator () {
      this.load = false
      this.page += 1
      var rvs = await getReviewByUser(this.page)
      if (rvs.length) {
        for (var item in rvs) {
          this.reviews.push(rvs[item])
        }
        this.load = true
      } else this.page = 0
      if (rvs < 10) this.page = 0
    },
    async like (review_id, index) {
      var like = await likeReview(review_id)
      this.reviews[index].like = like
    },
    async handleAction () {
      console.log(this.reviewId)
      console.log(this.tourId)
      debugger
      var status = await deleteReview(this.reviewId, this.tourId)
      this.dialog = false
      if (status) {
        this.reviews.pop(this.reviews[this.index])
        this.msg = 'Deleted successfully'
      } else this.msg = 'Delete failed'
      this.dialogMsg = true
    },
    notice (review_id, tour_id, index) {
      this.reviewId = review_id
      this.tourId = tour_id
      this.index = index
      this.dialog = true
    }
  }
}
</script>

<style lang="scss" scoped></style>
