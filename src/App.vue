<template>
  <div id="app">
    <DetailScreen v-if="$store.state.showDetails">
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
      return this.$store.state.movieCategories.find((x) => {
        return x.active
      })
    } 
  },
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
