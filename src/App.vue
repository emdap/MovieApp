<template>
  <div id="app">

    <!-- not enough functionality to warrant its own component -->
    <b-button v-if="$store.state.showDetails" @click="$store.commit('toggleDetails')" key="closeDetails">
      <div class="box">
        <img id="backArrow" src="@/assets/back_arrow.png">
        Movie Detail
      </div>
    </b-button>

    <!-- only renders if showDetails is false -->
    <CategoryDropdown v-else key="changeCategory" :activeCat="activeCategory.category"/>

    <!-- has logic inside to only render if showDetails false, so that can use vue transitions easily -->
    <DetailScreen/>

    <!-- holds all MoviePoster components -->
    <div id="posterHolder">
      <!-- v-for will render a MoviePoster component for every movie object in the active category -->
      <MoviePoster v-for="(movie, index) in activeCategory.movies" :key="index" :movie="movie"/>
      <!-- length will be 0 if movies haven't loaded yet (rate limit!!) or viewing favorites before adding any -->
      <div class="noMovie" v-if="activeCategory.movies.length === 0">
        No movies here yet :(
      </div>
    </div>

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
    // set the active category to the only movieCategory that has .active == true
    activeCategory: function () {
      return this.$store.state.movieCategories.find((x) => {
        return x.active
      })
    } 
  },
  beforeCreate() {
    // this will get data from the API
    this.$store.dispatch('initMovieData')
  }
}

</script>

<style>

/* affects all bootstrap buttons in app */

.btn {
  width: 100vw;
  margin: 0;
  border-radius: 0;
  text-align: left;
  background-color: rgb(33, 33, 33);
  border-color: rgb(30, 30, 30);
  font-weight: bolder;
  height: 2.5rem;
  z-index: 9999;
}

.show > .btn-secondary.dropdown-toggle {
  background-color: rgb(60, 60, 60) !important;
  border-color: rgb(57, 57, 57) !important;
}

.dropdown-menu {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin-top: -1px;
  margin-left: -5px;
  width: 100%;
}

#posterHolder {
  position: relative;
  height: calc(100vh - 2.5rem);
  width: calc(100vw + 10px);
  /*max-width: 810px;*/
  overflow: auto;
  z-index: 2;
}

#posterHolder::-webkit-scrollbar {
    width: 10px;
}

.noMovie {
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
  color: grey;
}

#backArrow {
  margin-right: 10px;
}

.box {
   display: flex;
   align-items:center;
}

#app {
  width: 100vw;
  /*max-width: 800px;*/
  overflow-x: hidden;
}

/* for landscape mode x*/
@media only screen and (min-width: 600px) {
  .m-md-2 {
    /* for some reason bootstrap targets min-width and sets this with important*/
    margin: 0 !important;
  }
}

</style>
