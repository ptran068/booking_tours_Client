<template>
<div>
  <div class="row border-bottom mb-3" v-for=" tour in tours" :key="tour.id">
    <div class="col-sm-9 col-md-9 col-lg-9">
      <div class="row">
        <div class="col-sm-4 col-md-4 col-lg-4 d-flex justify-content-center align-items-center">
          <img v-if="tour.images[0]" :src="tour.images[0].link" alt class="rounded-lg" width="100%" />
        </div>
        <div class="col-sm-8 col-md-8 col-lg-8">
          
          <router-link :to="{ name: 'tour', params: { id: tour.id }}"><h2 class="text-center">{{ tour.title }}</h2></router-link>
          <p class="card-text d-block mb-2" ><strong>Departure day: </strong>Daily</p>
          <p class="card-text d-block mb-2" ><strong>Duration: </strong>{{tour.duration}} days</p>
          <p class="card-text d-block mb-2" ><strong>Address: </strong>{{tour.address}}</p>
          <p class="card-text d-block mb-2" ><strong>Vehicle: </strong>Car</p>
          <p class="card-text" style=" overflow: hidden; text-overflow: ellipsis; display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">{{tour.description}}</p>
          
        </div>
      </div>
    </div>
    <div class="col-sm-3 col-md-3 col-lg-3 d-flex justify-content-center align-items-center flex-column" >
      <div class="bg-light">
        <div class="d-flex justify-content-center align-items-center p-3">
          <p v-if="tour.avg_rating.score__avg" class="card-text d-block mb-5" ><strong>Rating: </strong>{{tour.avg_rating.score__avg}} stars</p>
          <p v-else class="card-text mb-5" ><strong>Rating: </strong>No one has rated this!</p>
        </div>
        <div class=" text-white d-flex justify-content-center align-items-center flex-column bg-info p-4">
          <h4 class="card-text m-auto d-flex justify-content-center align-items-center" ><strong>Print: </strong>{{tour.amount}} $ / person </h4>
          <router-link :to="{ name: 'tour', params: { id: tour.id }}" class="btn btn-warning m-3 text-dark"> Booking tour </router-link>
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
