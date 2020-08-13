<template>
  <div>
    <h2>Customer reviews</h2>
    <div class="row border-bottom" style="margin-bottom: 15px" v-for="review in reviews" :key="review.id">
      <div class="col-sm-12 col-md-8 col-lg-8">
        <h5><strong>{{ review.title }}</strong></h5>
        <p class="card-text" style=" overflow: hidden; text-overflow: ellipsis; display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;">{{ review.content }}</p>
        <router-link style="text-decoration: none "
              :to="{ name: 'review', params: { id: review.id } }"
            >Read more ...</router-link>
        <div class="d-flex mt-3">
          <img src="../../assets/img/avatar.png" alt="" class="rounded-circle" style="height:40px; width:40px">
          <div class="d-inline ml-2">
            <small class="d-block" >Reviewed by</small>
            <small>{{review.created_by.last_name}} {{review.created_by.first_name}}</small>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-4 col-lg-4">
         <img
            v-if="review.images[0]"
            :src="review.images[0].link"
            class="card-img-top rounded-lg"
            alt="not found"
            style="height:175px;"
          />
      </div>
    </div>
      <v-row justify="center mt-5">
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
    <v-form v-if="$currentUser.id" ref="form">
      <h2>Review</h2>
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
        <v-btn v-if="$currentUser.id" color="primary" class="mr-4" @click="submit">Submit</v-btn>
        <v-btn v-else :disabled="!valid" color="primary" class="mr-4" > Submit </v-btn>
        <v-btn color="error" @click="clear">Clear</v-btn>
      </v-card-actions>
    </v-form>
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
      msg: '',
      dialogMsg: '',
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
      if (this.reviews.length < 12) {
        this.page = 0
      } else this.page = 1
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
      if (new_review != null) {
        this.$refs.form.reset()
        this.reviews.unshift(new_review)
        this.status = ''
        this.msg = 'Succesfully'
        this.dialogMsg = true
      } else {
        this.msg = 'failed'
        this.dialogMsg = false
      }
    },
    clear () {
      this.$refs.form.reset()
    },
    async paginator () {
      this.load = false
      this.page += 1
      var rvs = await data.getReviews(this.tour_id, this.page)
      if (rvs.length < 12) this.page = 0
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
