import Vue from 'vue'
import Vuex from 'vuex'
import { API_KEY } from '@/../config'
import axios from 'axios'
import { getMovieDetails, test, runWithDelay } from '@/movieDataHelpers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	activeMovieDetails: {},
  	showDetails: false,
  	popularMovies: [],
  	topRatedMovies: [],
  	favoriteMovies: [],
  	activeMovies: [],
  	movieCategories: ['Popular Movies', 'Top Rated Movies', 'Favorite Movies']
  },
  mutations: {
  	setActiveMovies: (state, category) => {
  		if (category == 'Popular Movies') {
  			state.activeMovies = state.popularMovies
  		} else if (category == 'Top Rated Movies') {
  			state.activeMovies = state.topRatedMovies
  		}
  	},
  	setActiveDetails: (state, movieID) => {
  		// can only click on posters that are shown to the user, and these posters come from activeMovies
  		// search for movie ID in that list
 			state.activeDetails = state.activeMovies.filter((x) => {
 				return x.ID === movieID
 			})[0]
  	},
  	toggleDetails: (state) => {
  		state.showDetails = !state.showDetails
  	},

  	// for some reason, using concat is not updating store references?
  	// so weird push instead
  	pushPopularMovies: (state, movieData) => {
  		for (var m in movieData) {
	  		state.popularMovies.push(movieData[m])
  		}
  	},
  	pushTopRatedMovies: (state, movieData) => {
  		for (var m in movieData) {
	  		state.topRatedMovies.push(movieData[m])
  		}
  	},
  	pushFavoriteMovies: (state, movieData) => {
  		for (var m in movieData) {
	  		state.favoriteMovies.push(movieData[m])
  		}
  	}
  },
  actions: {
  	initMovieData ({commit}) {
  		// when starting the app, want to set the active list to popular movies so user sees that first
  		// and fetch the movies of course
  		commit('setActiveMovies', 'Popular Movies')


  		// TODO: make more generic 'runWithDelay' function so that I can send the top_rated request there
  		// instead of delaying it 4000ms
  		// also having a better way to iterate these 2 starting API calls would be better, this is messy


  		// fetch one page for popular and one page for top rated to start
  		axios.get('http://api.themoviedb.org/3/movie/popular?api_key=' + API_KEY).then((response) => {
  			let delay = 0
  			for (var m in response.data.results) {
  				// only want to run 4 requests per second, splice off top 4
  				let curSet = response.data.results.splice(0, 4)
  				// runWithDelay will return a promise and wait for 'delay' before resolving
  				runWithDelay(curSet, delay).then((response) => {
  					commit('pushPopularMovies', response)
  				})
  				// increment delay
  				delay += 1000
  			}
  		})

  		setTimeout(function () {axios.get('http://api.themoviedb.org/3/movie/top_rated?api_key=' + API_KEY).then((response) => {
  			let delay = 0
  			for (var m in response.data.results) {
  				let curSet = response.data.results.splice(0, 4)
  				runWithDelay(curSet, delay).then((response) => {
  					commit('pushTopRatedMovies', response)
  				})
  				delay += 1000
  			}
  		})}, 4000)

  	}
  }
})
