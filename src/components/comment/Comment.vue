<template>
  <div>
    <v-form ref="form">
      <v-textarea
        outlined
        name="input-7-4"
        label="Comment"
        v-model="content"
      ></v-textarea>

      <v-card-actions>
        <v-d>{{ status }}</v-d>
        <v-btn class="mr-4" color="primary" @click="submit">submit</v-btn>
        <v-btn color="error" @click="clear">clear</v-btn>
      </v-card-actions>
    </v-form>

    <div v-for="item in comments" :key="item.id">
      <section class="post-heading">
        <div class="row">
          <div class="col-md-11">
            <div class="media">
              <div class="media-left"></div>
              <div class="media-body">
                <a href="#" class="anchor-username">
                  <h4 class="media-heading">
                    {{ handleEmail(item.created_by.email) }} {{test+=1}}
                  </h4>
                </a>
                <a href="#" class="anchor-time">{{
                  $showTime(item.created_at)
                }}</a>
              </div>
            </div>
          </div>
          <div class="col-md-1">
            <a href="#">
              <i class="glyphicon glyphicon-chevron-down"></i>
            </a>
          </div>
        </div>
      </section>
      <section class="post-body">
        <p>{{ item.content }}.</p>
      </section>
      <hr />
    </div>
    <div v-if="page" class="text-center">
      <v-btn v-if="load" color="primary" @click="paginator">See more</v-btn>
            <v-btn v-else color="primary" loading>See more</v-btn>
    </div>

  </div>
</template>

<script>
import { data, postComment } from "../../services/comment.service";
import showTime from "../../mixins/formatTime";
export default {
  name: "Comments",
  props: {
    review_id: String
  },
  data() {
    return {
      comments: [],
      content: "",
      status: "",
      page: 0,
      load: true
    };
  },
  async created() {
    await this.loadComments(this.review_id);
  },
  methods: {
    async loadComments(review_id) {
      this.comments = [];
      this.comments = await data.getComments(review_id);
      if (this.comments.length) {
        this.page=1
      }
      else this.page=0
    },
    handleEmail(email) {
      var index = email.indexOf("@");
      return email.slice(0, index);
    },
    clear() {
      this.$refs.form.reset();
    },
    async submit() {
      if (this.content) {
        this.status = 'Uploading...'
        var new_comment = await postComment({
          content: this.content,
          review: this.review_id
        });
        this.$refs.form.reset();
        this.comments.unshift(new_comment);
        this.status = ''
      }
    },
    async paginator() {
      this.load=false
      this.page += 1
      var cmts = await data.getComments(this.review_id, this.page)
      console.log(cmts)
      debugger
      if(cmts.length) {
        for (var item in cmts) {
        this.comments.push(cmts[item])
      }
      this.load=true
      }
      else this.page=0


    }
  },

  computed: {}
};
</script>

<style></style>
