<template>
  <div id="app">
    <MoviePoster v-for="(movie, index) in $store.state.activeMovies" :key="index" :movieId="movie.id">
      <img slot="posterImg" :src="movie.posterURL">
    </MoviePoster>
    <DetailScreen v-if="$store.state.showDetails">
      <img slot="thumbImg" :src="$store.state.activeMovieDetails.thumbURL">
      <h1 slot="title">
        {{$store.state.activeMovieDetails.originalTitle}}
      </h1>
      <h2 slot="overview">
        {{$store.state.activeMovieDetails.overview}}
      </h2>
      <h3 slot="rating">
        {{$store.state.activeMovieDetails.rating}}
      </h3>
      <h4 slot="release">
        {{$store.state.activeMovieDetails.releaseDate}}
      </h4>
    </DetailScreen>
  </div>
</template>

<script>

import MoviePoster from '@/components/MoviePoster'
import DetailScreen from '@/components/DetailScreen'

export default {
  name: 'App',
  components: {
    MoviePoster,
    DetailScreen
  },
  // computed: {
  //   displaySignIn() {
  //     return this.$store.state.displaySignIn
  //   },
  //   displayError() {
  //     return this.$store.state.error
  //   }
  // },
  beforeCreate() {
    this.$store.dispatch('initMovieData')
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
