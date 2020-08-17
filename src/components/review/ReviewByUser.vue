<template>
  <v-container>
    <div>
      <v-row justify="center">
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Notice</v-card-title>

            <v-card-text>
              This action cannot be undone
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
            <v-card-title class="headline">Notice</v-card-title>

            <v-card-text>
              {{ msg }}
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" text @click="dialogMsg = false">
                Ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
    <div v-if="!reviews.length" class="text-center">
      <h1>You don't have any review</h1>
      <router-link
        :to="{ name: 'manage-user' }"
        class="btn btn-primary text-light"
        >Back</router-link
      >
    </div>

    <div
      
      v-for="(review, index) in reviews"
      :key="review.id"
    >
      <div class="row border mt-8">
        <div class="col-sm-12 col-md-8 col-lg-8">
        <h5>
          <strong>{{ review.title }}</strong>
        </h5>
        <p
          class="card-text"
          style="
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          "
        >
          {{ review.content }}
        </p>
        <router-link
          style="text-decoration: none;"
          :to="{ name: 'review', params: { id: review.id } }"
          >Read more</router-link
        >
        <button
          class="ml-8 text-danger"
          @click="notice(review.id, review.tours, index)"
        >
          Delete
        </button>
        <div class="d-flex mt-3">
          <img
            src="../../assets/img/avatar.png"
            alt=""
            class="rounded-circle"
            style="height: 40px; width: 40px;"
          />
          <div class="d-inline ml-2">
            <small class="d-block">Reviewed by</small>
            <small
              >{{ review.created_by.last_name }}
              {{ review.created_by.first_name }}</small
            >
          </div>
        </div>
      </div>

      <div class="col-sm-12 col-md-4 col-lg-4">
        <img
          v-if="review.images[0]"
          :src="review.images[0].link"
          class="card-img-top"
          alt="not found"
          style="height: 175px;"
        />
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
  </v-container>
</template>

<script>
import { getReviewByUser, deleteReview } from "../../services/review.service";
import { likeReview } from "../../services/reviewDetail.service";
export default {
  name: "ReviewBy",
  props: {
    tour_id: String,
  },
  data() {
    return {
      dialog: false,
      reviews: [],
      reviewId: "",
      tourId: "",
      page: 0,
      dialogMsg: false,
      msg: "",
      load: true,
      status: "",
      titleRules: [
        (v) => !!v || "Title is required",
        (v) => (v && v.length <= 20) || "Title must be less than 20 characters",
      ],
      contentRules: [(v) => !!v || "Content is required"],
    };
  },
  async created() {
    await this.loadReviews();
    console.log(this.reviews);
  },
  methods: {
    async loadReviews() {
      this.reviews = [];
      this.reviews = await getReviewByUser(this.page);
      if (this.reviews.length < 10) {
        this.page = 0;
      }
    },
    handleEmail(email) {
      var index = email.indexOf("@");
      return email.slice(0, index);
    },

    async paginator() {
      this.load = false;
      this.page += 1;
      var rvs = await getReviewByUser(this.page);
      if (rvs.length) {
        for (var item in rvs) {
          this.reviews.push(rvs[item]);
        }
        this.load = true;
      } else this.page = 0;
      if (rvs < 10) this.page = 0;
    },
    async like(review_id, index) {
      var like = await likeReview(review_id);
      this.reviews[index].like = like;
    },
    async handleAction() {
      console.log(this.reviewId);
      console.log(this.tourId);
      debugger;
      var status = await deleteReview(this.reviewId, this.tourId);
      this.dialog = false;
      if (status) {
        this.reviews.splice(this.index, 1);
        this.msg = "Deleted successfully";
      } else this.msg = "Delete failed";
      this.dialogMsg = true;
    },
    notice(review_id, tour_id, index) {
      this.reviewId = review_id;
      this.tourId = tour_id;
      this.index = index;
      this.dialog = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
