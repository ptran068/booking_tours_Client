<template>
  <div>
    <div>
      <h2>Customer Comment</h2>
      <div
        v-for="(item, index) in comments"
        :key="item.id"
        style="background-color: #f7f9fa"
        class="rounded-lg p-3 mb-4"
      >
        <section class="post-heading">
          <div class="row">
            <div class="col-md-2">
              <div class="media">
                <div class="media-left"></div>
                <div class="media-body">
                  <div class="d-flex mt-3">
                    <img
                      src="../../assets/img/avatar.png"
                      alt=""
                      class="rounded-circle"
                      style="height:40px; width:40px"
                    />
                    <div class="d-inline ml-2">
                      <small class="d-block">Comment by</small>
                      <small
                        ><strong
                          >{{ item.created_by.last_name }}
                          {{ item.created_by.first_name }}</strong
                        ></small
                      >
                    </div>
                  </div>
                  <small class="text-secondary">{{
                    $showTime(item.created_at)
                  }}</small>
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
          <p>{{ item.content }}</p>
        </section>
        <button @click="cmt=index" class="ml-5 text-primary font-italic" style="text-decoration: none;">Reply</button>
        <ReplyToComment class="ml-15" v-bind:hidden="hidden" v-bind:review_id="review_id" v-bind:comment_id="item.id" v-bind:email="[email, item.created_by.email]" v-bind:cmt="cmt" v-bind:index="index"> </ReplyToComment>
      </div>
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
    <v-form v-if="$currentUser.id" ref="form">
      <v-textarea
        outlined
        name="input-7-4"
        label="Comment"
        v-model="content"
      ></v-textarea>
      <v-card-actions>
        <v-d>{{ status }}</v-d>
        <v-btn
          v-if="$currentUser.id"
          color="primary"
          class="mr-4"
          @click="submit"
          >Submit</v-btn
        >
        <v-btn v-else :disabled="!valid" color="primary" class="mr-4">
          Submit
        </v-btn>
        <v-btn color="error" @click="clear">Clear</v-btn>
      </v-card-actions>
    </v-form>
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
import { data, postComment } from "../../services/comment.service";
import ReplyToComment from "./ReplyToComment"
export default {
  name: "Comments",
  props: {
    review_id: String,
    email: String
  },
  components: {
    ReplyToComment
  },
  data() {
    return {
      comments: [],
      hidden: false,
      content: "",
      status: "",
      msg: "",
      dialogMsg: "",
      page: 0,
      load: true,
      cmt: Number
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
        this.page = 1;
      } else this.page = 0;
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
        this.status = "Uploading...";
        var new_comment = await postComment({
          content: this.content,
          review: this.review_id,
          email: [this.email],
          link: this.$route.fullPath
        });
        if (new_comment != null) {
          this.msg = "Commented successfully";
          this.$refs.form.reset();
          this.comments.push(new_comment);
          this.status = "";
        } else {
          this.msg = "Comment failed";
        }
        this.dialogMsg = true;
      }
    },
    async paginator() {
      this.load = false;
      this.page += 1;
      var cmts = await data.getComments(this.review_id, this.page);
      if (cmts.length) {
        for (var item in cmts) {
          this.comments.push(cmts[item]);
        }
        this.load = true;
      } else this.page = 0;
    }
  },
  computed: {}
};
</script>

<style></style>
