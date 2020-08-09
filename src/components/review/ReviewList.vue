<template>
  <div>
    <v-form ref="form">
      <v-text-field
        outlined
        v-model="title"
        :rules="titleRules"
        :counter="20"
        label="Title"
        required
      ></v-text-field>
      <v-file-input
        v-model="files"
        outlined
        color="deep-purple accent-4"
        counter
        label="File input"
        multiple
        placeholder="Select your files"
        prepend-icon="mdi-paperclip"
        :show-size="1000"
      >
        <template v-slot:selection="{ index, text }">
          <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>{{ text }}</v-chip>

          <span
            v-else-if="index === 2"
            class="overline grey--text text--darken-3 mx-2"
          >+{{ files.length - 2 }} File(s)</span>
        </template>
      </v-file-input>

      <v-textarea
        outlined
        name="input-7-4"
        label="Content"
        :rules="contentRules"
        v-model="content"
        required
      ></v-textarea>
      <div class="ml-2" v-if="status" style="font-style:italic">
        <v-icon medium class="p-1">fas fa-circle-notch fa-spin</v-icon>
        {{ status }}
      </div>
      <v-card-actions>
        <button class="btn btn-primary text-light mr-4" @click="submit">Submit</button>
        <button class="btn btn-danger text-light" @click="clear">Clear</button>
      </v-card-actions>
    </v-form>
    <div class="row">
      <div class="col-sm-6 col-md-4 col-lg-3" v-for="item in reviews" :key="item.id">
        <div class="card mb-3" style="width: auto;">
          <img
            v-if="item.images[0]"
            :src="item.images[0].link"
            class="card-img-top"
            alt="not found"
            height="180px"
          />
          <div class="card-body">
            <div class="card-title">
              <div>
                <strong class="float-left">{{ handleEmail(item.created_by.email) }}</strong>
                <strong class="float-right">{{ item.views }} Views</strong>
              </div>
              <br />
              <h4>{{ item.title }}</h4>
            </div>
            <p
              class="card-text"
              style="display: block; width: 150px; overflow: hidden; white-space: nowrap; "
            >{{ item.content }}</p>
            <router-link
              :to="{ name: 'review', params: { id: item.id } }"
              class="btn btn-primary text-light"
            >Read more ...</router-link>
          </div>
        </div>
      </div>

    </div>
      <div v-if="page" class="text-center">
              <button v-if="load" @click="paginator" class="btn btn-primary text-light">See more</button>
              <button v-else  @click="paginator" class="btn btn-primary text-light">See more</button>
            </div>
  </div>
</template>

<script>
import { data, postReview } from '../../services/review.service'
export default {
  name: 'Reviews',
  props: {
    tour_id: String
  },
  data () {
    return {
      reviews: [],
      page: 0,
      load: true,
      content: '',
      title: '',
      files: [],
      status: '',
      titleRules: [
        (v) => !!v || 'Title is required',
        (v) => (v && v.length <= 20) || 'Title must be less than 20 characters'
      ],
      contentRules: [(v) => !!v || 'Content is required']
    }
  },
  async created () {
    await this.loadReviews(this.tour_id)
  },
  methods: {
    async loadReviews (tour_id) {
      this.reviews = []
      this.reviews = await data.getReviews(tour_id)
      if (this.reviews.length) {
        this.page = 1
      }
    },
    handleEmail (email) {
      var index = email.indexOf('@')
      return email.slice(0, index)
    },
    async submit () {
      this.status = 'Uploading...'
      let formData = new FormData()
      formData.append('file', this.files[0])
      var new_review = await postReview(
        {
          title: this.title,
          content: this.content,
          tours: this.tour_id,
          images: []
        },
        formData
      )
      this.$refs.form.reset()
      this.reviews.unshift(new_review)
      this.status = ''
    },
    clear () {
      this.$refs.form.reset()
    },
    async paginator () {
      this.load = false
      this.page += 1
      var rvs = await data.getReviews(this.tour_id, this.page)
      if (rvs.length) {
        for (var item in rvs) {
          this.reviews.push(rvs[item])
        }
        this.load = true
      } else this.page = 0
    }
  }
}
</script>

<style lang="scss" scoped></style>
