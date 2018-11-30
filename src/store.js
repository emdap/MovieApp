import Vue from 'vue'
import Vuex from 'vuex'
import { API_KEY } from '@/../config'
import axios from 'axios'
import { getMovieDetails, test, runWithDelay } from '@/movieDataHelpers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	activeDetails: {},
  	showDetails: false,
  	movieCategories: [
	  	{id: 1, category: 'Popular Movies', active: true, movies: []}, 
	  	{id: 2, category: 'Top Rated Movies', active: false, movies: []}, 
	  	{id: 3, category: 'Favorite Movies', active: false, movies: []}
  	]
  },
  mutations: {
  	setActiveCategory: (state, categoryId) => {
  		state.movieCategories.map(x => {
  			if (x.id === categoryId) {
  				x.active = true
  			} else {
  				x.active = false
  			}
  		})
  	},
  	pushMovieList: (state, payload) => {
  		const catId = payload.categoryId
  		const movieList = payload.movies

  		let pushTo = state.movieCategories.find((x) => {
  			return x.id === catId
  		})

  		for (var m in movieList) {
  			pushTo.movies.push(movieList[m])
  		}
  	},
  	pushMovie: (state, payload) => {
  		const catId = payload.categoryId
  		const movie = payload.movie

  		let pushTo = state.movieCategories.find((x) => {
  			return x.id === catId
  		})

  		pushTo.movies.push(movie)
  	},
  	pushFavoriteMovie: (state, movie) => {
  		// although safe to assume that the movie that had this button pushed
  		// is the activeDetails, passing it a movie obj instead
  		// as that would be easier to adjust to diff features in future
  		// (what if we want to add to favorites from outside the detail view?)
  		const favoriteMovies = state.movieCategories.find((x) => {
  			return x.id === 3
  		})
  		favoriteMovies.movies.push(movie)
  		movie.favorite = true
  	},
  	removeFavoriteMovie: (state, movie) => {
  		movie.favorite = false

  		const favoriteMovies = state.movieCategories.find((x) => {
  			return x.id === 3
  		})
  		favoriteMovies.movies = favoriteMovies.movies.filter((x) => {
  			return x.favorite
  		})
  	},
   	setActiveDetails: (state, movie) => {
  		// can only click on posters that are shown to the user, and these posters come from activeMovies
  		// search for movie ID in that list
 			state.activeDetails = movie
  	},
  	toggleDetails: (state) => {
  		state.showDetails = !state.showDetails
  	}
  },
  actions: {
  	// TODO: clean this up
  	// use .map to generate the URLs
  	// generalize the runWithDelay function
  	// and send it EVERYTHING, including that first request to get IDs? or maybe except for that one since subsequent calls need that info
  	// could make it smarter, do that first call, then splice off up to the returned rate limit, and run all those
  	// then use that response with when the api will be available to create a time delay until then?
  	initMovieData ({commit}) {
  		// when starting the app, want to set the active list to popular movies so user sees that first
  		// and fetch the movies of course
  		commit('setActiveCategory', 1)

  		// TODO: make more generic 'runWithDelay' function so that I can send the top_rated request there
  		// instead of delaying it 4000ms
  		// also having a better way to iterate these 2 starting API calls would be better, this is messy

			let delay = 0
  		// fetch one page for popular and one page for top rated to start
  		axios.get('http://api.themoviedb.org/3/movie/popular?api_key=' + API_KEY).then((response) => {
  			for (var m in response.data.results) {
  				// only want to run 4 requests per second, splice off top 4
  				let curSet = response.data.results.splice(0, 4)
  				// runWithDelay will return a promise and wait for 'delay' before resolving
  				runWithDelay(curSet, delay).then((response) => {
  					console.log('popular movies runWithDelay')
  					const popMovies = {
  						categoryId: 1,
  						movies: response
  					}
  					commit('pushMovieList', popMovies)
  				}).catch((response) => {
  					console.log(response)
  				})
  				// increment delay
  				delay += 1000
  			}
	  		setTimeout(function () {axios.get('http://api.themoviedb.org/3/movie/top_rated?api_key=' + API_KEY).then((response) => {
	  			let delay = 0
	  			for (var m in response.data.results) {
	  				let curSet = response.data.results.splice(0, 4)
	  				runWithDelay(curSet, delay).then((response) => {
	  					console.log('top rated runWithDelay')
	  					const topMovies = {
	  						categoryId: 2,
	  						movies: response
	  					}
	  					commit('pushMovieList', topMovies)
	  				}).catch((response) => {
	  					console.log(response)
	  				})
	  				delay += 1000
	  			}
	  		})}, delay)
  		}).catch((response) => {
  			console.log(response)
  		})
  		

  	}
  }
})
