<template>
  <div class="container">
    <div class="ml-5 mr-5">
      <div class="text-center pb-5">
        <div class="float-left">
          <router-link
        :to="{ name: 'tour', params: { id: review.tours } }"
        class="btn btn-secondary text-dark mt-5 mb-5"
        ><v-icon class="pb-1">mdi-backburger</v-icon> Back</router-link
      >
        </div>
        
        <h1 class="pt-3">{{ review.title }}</h1>
        
        </div>
      <div class="text-center">
        <img
          v-if="review.images[0]"
          :src="review.images[0].link"
          class="img-fluid"
          alt="Responsive image"
        />
      </div>
      <hr />
      <div>
        <strong>Created By: {{ handleEmail(review.created_by.email) }}</strong>
        <strong style="float: right;">
          <v-div @click="like" class="mr-6">
            <strong class="mr-2 pb-2">{{ review.like.length }}</strong>
            <v-icon
              v-if="review.like.indexOf($currentUser.id) > -1"
              large class="pb-3"
              color="rgb(32, 120, 244)"
              >mdi-thumb-up</v-icon
            >
            <v-icon v-else large class="pb-3" color="">mdi-thumb-up</v-icon> </v-div
          >{{ review.views }} Views
          </strong
        >
        <br />
        <small>{{ $showTime(review.created_at) }}</small>
      </div>
      <hr />
      <div class="pt-5 pb-5">{{ review.content }}</div>
      <hr />

      <Comment v-bind:review_id="review.id"></Comment>
    </div>
  </div>
</template>

<script>
import Comment from '../comment/Comment'
import { data, likeReview } from '../../services/reviewDetail.service'
export default {
  name: 'Review',
  components: {
    Comment
  },
  data () {
    return {
      review: {},
      listtest: []
    }
  },
  async created () {
    await this.loadReview(this.$route.params.id)
  },
  methods: {
    async loadReview (review_id) {
      this.review = {}
      this.review = await data.getReview(review_id)
    },
    handleEmail (email) {
      var index = email.indexOf('@')
      return email.slice(0, index)
    },
    async like () {
      var like = await likeReview(this.$route.params.id)
      this.review.like = like
    }
  }
}
</script>

<style lang="scss" scoped></style>
