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
      <div class="row">

      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'IndexPage',

  components: {
  },

  data () {
    return {
    }
  },

  mounted() {
    this.init();
  },

  methods: {
    async init() {

    },
  }
}
</script>

<style lang="scss" scoped>
</style>
