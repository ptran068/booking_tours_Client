<template>
  <div >
    <v-carousel style="height:400px;">
      <v-carousel-item
        src="@/assets/img/img3.jpg"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
      <v-carousel-item
        src="@/assets/img/img3.jpg"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item><v-carousel-item
        src="@/assets/img/img3.jpg"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
    <div class="container">
      <h3 class="h3">Tours</h3>
      <TourList/>
    </div>
  </div>
</template>

<script>
import TourList from '../components/tour/TourList'
export default {
  name: 'IndexPage',

  components: {
    TourList
  },

  data () {
    return {
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    async init () {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
