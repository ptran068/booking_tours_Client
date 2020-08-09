<template>
<div>
  <div class="row">
        <div class="col-sm-6 col-md-4 col-lg-3" v-for=" tour in tours" :key="tour.id">
            <div class="card mb-3" style="width: auto;">
                <img v-if="tour.images[0]"  :src="tour.images[0].link" class="card-img-top" alt="not found" style="height:175px">
                <div class="card-body">
                    <h4 class="card-title">{{tour.title}}</h4>
                    <p class="card-text" style="display: block; width: 150px; overflow: hidden; white-space: nowrap; ">{{tour.description}}</p>
                    <router-link :to="{ name: 'tour', params: { id: tour.id }}" class="btn btn-primary text-light"> Read more ... </router-link>
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
import { data } from '../../services/data.service'
export default {
  name: 'Tours',
  data () {
    return {
      tours: [],
      page: 0,
      load: true
    }
  },
  async created () {
    await this.loadTours()
  },
  methods: {
    async loadTours () {
      this.tours = await data.getTours()
      this.page = 1
    },
    async paginator () {
      this.load = false
      this.page += 1
      var trs = await data.getTours(this.page)
      if (trs.length) {
        for (var item in trs) {
          this.tours.push(trs[item])
        }
        this.load = true
      } else this.page = 0
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
