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
    <router-link :to="{ name: 'index'}" class="btn btn-primary text-light mt-5 mb-5" style="float: right;">Back</router-link>
    <router-link :to="{ name: '#'}" class="btn btn-primary text-light mt-5 mb-5" >Book</router-link>
  </div>
</template>

<script>
import { data } from '../../services/data.service'
export default {
  name: 'Tours',
  data () {
    return {
      tours: []
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
