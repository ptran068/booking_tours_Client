<template>
  <div class="container">
    <div class="mb-5">
      <div class="float-left">
          <router-link
        :to="{ name: 'tour', params: { id: review.tours } }"
        class="btn btn-primary text-light mt-5 mb-5"
        >Back</router-link
      >
      </div>
      <h1 class="pt-3 text-center">{{ review.title }}</h1>
    </div>
          <div class="border border-secondary rounded-lg p-3 shadow p-3 mb-5 bg-white rounded">
          <div class="d-flex mt-3">
            <img src="../../assets/img/avatar.png" alt="" class="rounded-circle" style="height:85px; width:85px">
            <div class="ml-2 mt-3 ">
              <p>Review by</p>
              <h4><strong>{{review.created_by.last_name}} {{review.created_by.first_name}}</strong></h4>
            </div>
          </div>
          <hr>
          <div>
            <p class="d-inline text-secondary"><strong>{{ $showTime(review.created_at) }}</strong></p>
            <p class="d-inline float-right text-secondary"><strong>{{ review.views }} Views</strong> </p>
          </div>
          <hr>
        <div>
          <p>{{ review.content }}</p>
        </div>
        <div v-for="image in review.images" :key="image.id">
          <img
          v-if="image"
          :src="image.link"
          style="height:120px; width:120px"
          class="img-fluid rounded-lg"
          alt="Responsive image"
        />
        </div>
        <hr>
        <v-div @click="like" class="mr-6">
          <strong class="mr-2 pb-2">{{ review.like.length }}</strong>
          <v-btn icon>
            <v-icon
              v-if="review.like.indexOf($currentUser.id) > -1"
              medium class="pb-2"
              color="rgb(32, 120, 244)"
              >mdi-thumb-up</v-icon
            >
            <v-icon v-else medium class="pb-2" color="">mdi-thumb-up</v-icon>
          </v-btn>
          <p class="d-inline p-2">Do you like this review?</p>
        </v-div>
      </div>
      <br>
    <Comment  v-bind:review_id="review.id"></Comment>
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
