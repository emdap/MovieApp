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
      this.$store.commit('setActiveDetails', this.movie)
      this.$store.commit('toggleDetails')
    }
  }
}
</script>

<style scoped>
.poster {
  display: inline-block;
  width: 50vw;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

/* for landscape mode x*/
@media only screen and (min-width: 600px) {
  .poster {
    width: 25vw;
  }
}

</style>
