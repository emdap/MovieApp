<template>
  <img class="poster" :id="'movie' + movie.id" @click="openDetails" :src="movie.posterURL">
</template>

<script>

export default {
  name: 'MoviePoster',
  props: {
    movie: Object
  },
  methods: {
    openDetails () {
      // details haven't been set
      if (this.movie.noDetails) {
        this.$store.dispatch('fetchDetails', this.movie)
      }
      // set the activeDetails to be this movie object
      this.$store.commit('setActiveDetails', this.movie)
      // toggle details so that DetailScreen becomes visible
      this.$store.commit('toggleDetails')
    }
  }
}
</script>

<style scoped>
.poster {
  display: inline-block;
  width: 50vw;
  cursor: pointer;
}

/* for landscape mode x*/
@media only screen and (min-width: 600px) {
  .poster {
    display: inline-block;
    width: 25vw;
    cursor: pointer;
  }
}

</style>
