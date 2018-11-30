<template>
  <div id="app">
     <DetailScreen v-if="$store.state.showDetails">
      <img slot="thumbImg" :src="$store.state.activeDetails.thumbURL">
      <h1 slot="title">
        {{$store.state.activeDetails.originalTitle}}
      </h1>
      <h2 slot="overview">
        {{$store.state.activeDetails.overview}}
      </h2>
      <h3 slot="rating">
        {{$store.state.activeDetails.rating}}
      </h3>
      <h4 slot="release">
        {{$store.state.activeDetails.releaseDate}}
      </h4>
    </DetailScreen>

    <CategoryDropdown v-else>
    </CategoryDropdown>

    <MoviePoster v-for="(movie, index) in activeCategory.movies" :key="index" :movie="movie">
    </MoviePoster>
    <span v-if="activeCategory.movies.length === 0">
      No movies here yet :(
    </span>
  </div>
</template>

<script>

import MoviePoster from '@/components/MoviePoster'
import DetailScreen from '@/components/DetailScreen'
import CategoryDropdown from '@/components/CategoryDropdown'

export default {
  name: 'App',
  components: {
    MoviePoster,
    DetailScreen,
    CategoryDropdown
  },
  computed: {
    activeCategory: function () {
      const active = this.$store.state.movieCategories.filter((x) => {
        return x.active
      })[0]
      console.log(active)
      return active
    } 
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
