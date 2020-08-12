<template>
<div class="container">
  <div>
        <div v-for=" tour in tours" :key="tour.id">
            <div class="card mb-3" style="width=100%">
                <img v-if="tour.images[0]"  :src="tour.images[0].link" class="card-img-top" alt="Card image cap">
                <div class="card-body">
                    <h4 class="card-title">{{tour.title}}</h4>
                    <p class="card-text">{{tour.description}}</p>
                  <div class="text-center"> <router-link :to="{ name: 'tour', params: { id: tour.id }}" class="btn btn-primary text-light"> Read more ... </router-link>
                </div> </div>
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
import TourService from '../../services/tour.service'
export default {
  name: 'SearchTour',
  data () {
    return {
      tours: '',
      msg: '',
      load: false,
      page: 0
    }
  },
  async created () {
    await this.searchTour()
  },

  methods: {
    async searchTour () {
      const listTours = await TourService.search(this.$route.params.content)
      if (listTours.data && listTours.data.results) {
        this.tours = listTours.data.results
      } else this.msg = 'Not found.'
      if (this.tours.length === 12) {
        this.page = 1
      }
    },
    async paginator () {
      this.load = false
      this.page += 1
      var trs = await TourService.search(this.$route.params.content, this.page)
      console.log(trs)
      debugger
      if (trs.data && trs.data.results && trs.data.results.length) {
        for (var item in trs.data.results) {
          this.tours.push(trs.data.results[item])
        }
        this.load = true
      } else this.page = 0
    }
  }
}
</script>

<style scoped>
.main {
    display:flex
}
.img {
  width: 300px;
  height: 100%;
}
.content {
  margin-left: 50px;
}

.text {
  color: black;
}
.views {
  margin-top: 10px;
  margin-bottom: 10px;
}

.title {
    color:crimson;
}

</style>>
