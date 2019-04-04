<template>
  <!-- all movie data comes from store.state.activeDetails, this component only shown if that has data -->
  <!-- activeDetails has the same properties as any object in any category.movies  -->
  <transition name="fade">
    <div id="detailScreen" v-if="$store.state.showDetails">
      <h1>
        {{$store.state.activeDetails.originalTitle}}
      </h1>
      <!-- not all fields need api call to complete, but looks better to fade everything in -->
      <transition name="fade" mode="out-in">
        <div id="detailContent" v-if="!$store.state.activeDetails.noDetails">
          <img id="thumbnail" :src="$store.state.activeDetails.thumbURL">
          <div id="quickFacts">
            <h2>
              {{$store.state.activeDetails.releaseDate.substring(0,4)}}<br/>
            </h2>
            <h3>
              {{$store.state.activeDetails.rating}}/10
            </h3>
            <h4>
              {{$store.state.activeDetails.voteCount}} votes
            </h4>
            <transition name="slide-fade" mode="out-in">
              <div class="button addFav" v-if="!$store.state.activeDetails.favorite" @click="addFav" key="add">
                Mark as favorite
              </div>
              <div class="button removeFav" v-if="$store.state.activeDetails.favorite" @click="removeFav" key="remove">
                Remove from favorites
              </div>
            </transition>
          
          </div>
          <div id="overview">
            {{$store.state.activeDetails.overview}}
          </div>
          <!-- below 2 fields need api call to complete -->
            <div id="genres">
              <strong>Genres</strong>
              <ul>
                <li v-for="(genre, index) in $store.state.activeDetails.details.genres" :key="index">
                  {{genre}}
                </li>
              </ul>
            </div>
            <div id="homepage" v-if="$store.state.activeDetails.details.homepage != null">
              <strong>Movie Website:</strong><br/>
              <a :href="$store.state.activeDetails.details.homepage" target="_blank">
                {{$store.state.activeDetails.details.homepage}}
              </a>
            </div>
          </div>
      </transition>
    </div>
  </transition>
</template>


<script>

export default {
  name: 'DetailScreen',
  methods: {
    addFav () {
      // send the activeDetails object (identical to any movie object) to add this movie to the favorite list
      this.$store.commit('pushFavoriteMovie', this.$store.state.activeDetails)
    },
    removeFav () {
      // removes it from the favorite list
      this.$store.commit('removeFavoriteMovie', this.$store.state.activeDetails)
    }
  }
}
</script>

<style scoped>

/* movie title */
h1 {
  font-size: 1.5rem;
  text-align: left;
  background: rgb(0, 150, 136);
  color: white;
  font-weight: lighter;
  padding: 1rem 1.2rem;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, .4);
  position: sticky;
  top: 0;
  /* top: 2.5rem; */
}

/* release date */
h2 {
  font-size: 1.2rem;
  font-weight: lighter;
  margin-bottom: 0;
}

/* runtime */
h3 {
  font-size: 1.2rem;
  font-style: italic;
}

/* rating */
h4 {
  font-size: .75rem;
  font-weight: bolder;
  color: black;
}

#detailScreen {
  position: absolute;
  top: 2.5rem;
  left: 0;
  width: 100%;
  height: calc(100% - 2.5rem);
  margin-right: -14px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  z-index: 3;
  background: white;
  color: grey; 
  /* for firefox */
  scrollbar-width: thin;
}

#detailContent {
  padding: .75rem 2rem;
}

#genres {
  float: left;
  font-size: .75rem;
  margin-top: .25rem;
  width: 100%;
}

#homepage {
  float: left;
  font-size: .75rem;
  margin-bottom: 1rem;
}

a {
   color: rgb(100, 200, 200);
   transition: all .5s;
}

a:hover {
   color: rgb(100, 200, 200);
   letter-spacing: .1rem;
   text-decoration: none;
}

#thumbnail {
  min-width: 94px;
  min-height: 141px;
  float: left;
}

#quickFacts {
  float: left;
  text-align: left;
  margin-left: 1rem;
}

#overview {
  display: block;
  float: left;
  width: 100%;
  font-size: .75rem;
  text-align: left;
  margin-top: 15px;
}

.button {
  text-transform: uppercase;
  text-align: center;
  font-size: .6rem;
  padding: .5rem;
  max-width: 6rem;
  margin-top: 15px;
  cursor: pointer;
}

.addFav {
  background: rgb(134, 228, 219);
  border: 1px solid rgb(100, 200, 200);
}

.removeFav {
  background: rgb(228, 161, 134);
  border: 1px solid rgb(200, 100, 100);
  color: black;
}

/* vue transitions */

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
