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

export default {
  name: 'PosterHolder',
  components: {
    MoviePoster
  }
}

</script>

<style>

</style>
