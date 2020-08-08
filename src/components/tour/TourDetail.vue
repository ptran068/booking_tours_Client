<template>
  <div class="ml-5 mr-5">
    <h1 class="text-center pb-5">{{ findId.title }}</h1>
    <div class="text-center"><img v-if="findId.images[0].link" :src="findId.images[0].link" alt="" class="rounded-lg"></div>
    <hr>
    <div>
      <small >Created By: {{findId.created_by.last_name}} {{findId.created_by.first_name}} </small>
      <small style="float: right;">Views: {{findId.views}} </small>
    </div>
    <hr>
    <div class="pt-5 pb-5">{{findId.description}}</div>
    <hr>
    <div class="pt-5 pb-5">{{findId.policy}}</div>
    <div>
      <button
      class="btn btn-primary text-light mt-5 mb-5"
      @click.stop="dialog = true"
    >
      Book tour
        </button>
        <v-dialog
          v-model="dialog"
          persistent max-width="600px"
        >
          <v-card>
            <v-card-title class="headline">Chose date to start tour</v-card-title>
            <v-card-text>
              <v-container >
                <label class="control-label" for="date">Date: </label>
                <datepicker id="date" v-model="startat"></datepicker>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text
                @click="dialog = false"
                class="btn btn-primary text-light mt-5 mb-5"
                style="float: right;"
              >
                Cancel
              </v-btn>
              <router-link  @click="dialog = false" :to="{ name: '#'}" class="btn btn-primary text-light mt-5 mb-5">Book</router-link>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <router-link :to="{ name: 'index'}" class="btn btn-primary text-light mt-5 mb-5">Back</router-link>
    </div>
  </div>
</template>
<script>
import { data } from '../../services/data.service'
import Datepicker from 'vuejs-datepicker'
export default {
  name: 'Tours',
  components: {
    Datepicker
  },
  data () {
    return {
      tours: [],
      dialog: false
    }
  },
  async created () {
    await this.loadTours()
  },
  methods: {
    async loadTours () {
      this.tours = []
      this.tours = await data.getTours()
    }
  },
  computed: {
    findId () {
      return this.tours.find(tour => tour.id === this.$route.params.id)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
