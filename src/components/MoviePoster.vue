<template>
  <div class="posterHolder" :id="'movie' + movie.id" @click="openDetails">
    <img :src="movie.posterURL">
  </div>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
