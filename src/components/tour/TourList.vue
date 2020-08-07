<template>
    <div class="row">
        <div class="col-sm-6 col-md-4 col-lg-3" v-for=" tour in tours" :key="tour.id">
            <div class="card mb-3" style="width: auto;">
                <img v-if="tour.images[0].link"  :src="tour.images[0].link" class="card-img-top" alt="not found" height="180px">
                <div class="card-body">
                    <h4 class="card-title">{{tour.title}}</h4>
                    <p class="card-text" style="display: block; width: 150px; overflow: hidden; white-space: nowrap; ">{{tour.description}}</p>
                    <router-link :to="{ name: 'tour', params: { id: tour.id }}" class="btn btn-primary text-light"> Read more ... </router-link>
            </div>
      </div>
   </div>
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
  }
}
</script>

<style lang="scss" scoped>

</style>
