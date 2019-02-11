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
  width: 50%;
}

/* for landscape mode x*/
@media only screen and (min-width: 600px) {
  .poster {
    width: 25%;
  }
}

</style>
