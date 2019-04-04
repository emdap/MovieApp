<template>
  <div id="app">
    <div id="headerHolder">
      <b-button id="detailBack" v-if="$store.state.showDetails" @click="toggleDetailScreen" key="closeDetails">
        <div class="box">
          <img id="backArrow" src="@/assets/back_arrow.png">
          Movie Detail
        </div>
      </b-button>

      <CategoryDropdown v-else key="changeCategory" :activeCat="activeCategory.category"/>
    </div>
    <DetailScreen/>
    <PosterHolder :activeCat="activeCategory" :haveScroll="scrollable"/>

  </div>
</template>

<script>

import DetailScreen from '@/components/DetailScreen'
import CategoryDropdown from '@/components/CategoryDropdown'
import PosterHolder from '@/components/PosterHolder'

export default {
  name: 'App',
  components: {
    DetailScreen,
    CategoryDropdown,
    PosterHolder
  },
  data () {
    return {
      // relates to if posterholder can be scrolled, issue with iOS
      // see comment in posterholder
      scrollable: true
    }
  },
  methods: {
    toggleDetailScreen: function () {
      // this.toggleScroll()
      this.scrollable = !this.scrollable
      this.$store.commit('toggleDetails')
    }
  },
  watch: {
    activeMovieDetails: function () {
      this.scrollable = !this.scrollable
    }
  },
  computed: {
    // set the active category to the only movieCategory that has .active == true
    activeCategory: function () {
      return this.$store.state.movieCategories.find((x) => {
        return x.active
      })
    },
    activeMovieDetails: function () {
      return this.$store.state.activeDetails
    } 
  },
  beforeCreate () {
    // this will get data from the API
    this.$store.dispatch('fetchMovies', 1)
    this.$store.dispatch('fetchMovies', 2)
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

#detailBack {
  position: fixed;
  top: 0;
}

#backArrow {
  margin-right: 10px;
}

.box {
   display: flex;
   align-items:center;
}

#app {
  width: 100%;
  height: 100%;
  /*max-width: 800px;*/
  overflow: hidden;
  background-color: rgb(33, 33, 33);
}

::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}

/* for landscape mode x*/
@media only screen and (min-width: 600px) {
  .m-md-2 {
    /* for some reason bootstrap targets min-width and sets this with important*/
    margin: 0 !important;
  }
}

</style>
