<template>
  <div>
    <div class="line" >
      <div
        v-for="item in comments"
        :key="item.id"
        style="background-color: #f7f9fa"
        class="rounded-lg pr-3 pl-3"
      >
        <section class="post-heading">
          <div class="row">
            <div class="col-md-2">
              <div class="media">
                <div class="media-left"></div>
                <div class="media-body">
                  <div class="d-flex mt-0">
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
          <p>{{ item.content }}.</p>
        </section>
        <hr>
      </div>
            
    </div>
    <div v-if="page" class="pl-3 pb-3">
      <button @click="paginator" class="more btn-secondary pl-4 pr-4 text-light">
        View more comments
      </button>
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
    <v-form v-if="$currentUser.id && cmt==index" ref="form">
      <v-textarea
        outlined
        name="input-7-4"
        label="Reply"
        rows="1"
        v-model="content"
        class="pb-0"
      ></v-textarea>
      <v-card-actions class="pt-0 float-right">
        <div>{{ status }}</div>
        <br>
        <v-btn color="error" @click="clear">Clear</v-btn>
                <v-btn
          v-if="$currentUser.id"
          color="primary"
          @click="submit"
          >Submit</v-btn
        >
        <v-btn v-else :disabled="!valid" color="primary">
          Submit
        </v-btn>
      </v-card-actions>
    </v-form>
    <br>

  </div>
</template>

<script>
import { data, postComment } from "../../services/comment.service";
export default {
  name: "ReplyComment",
  props: {
    review_id: String,
    comment_id: String,
    hidden: Boolean,
    email: String,
    cmt: Number,
    index:Number
  },
  data() {
    return {
      comments: [],
      content: "",
      status: "",
      msg: '',
      dialogMsg: "",
      page: 0,
      load: true
    };
  },
  async created() {
    await this.loadComments();
  },
  methods: {
    async loadComments() {
      this.comments = [];
      this.comments = await data.getComments(this.review_id, this.comment_id);
      if (this.comments.length == 10 ) {
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
          reply_to: this.comment_id,
          email: this.email,
          link: this.$route.fullPath
        });
        if (new_comment!=null) {
          this.msg = 'Commented successfully'
          this.$refs.form.reset();
          this.comments.push(new_comment);
          this.status = "";
        }
        else {
          this.msg = 'Comment failed'
        }
        this.dialogMsg = true
      }
    },
    async paginator() {
      this.load = false;
      this.page += 1;
      var cmts = await data.getComments(this.review_id, this.comment_id, this.page);
      if (cmts.length) {
        for (var item in cmts) {
          this.comments.push(cmts[item]);
        }
        this.load = true;
        if(cmts.length == 10) {
            this.page = 1
        }
        else this.page = 0
      } else this.page = 0;
    }
  },

  computed: {}
};
</script>

<style>
    .more {
        border-radius: 30px;
    }
    .line {
      border-left: solid 2px #000;
    }
</style>
