import Vue from 'vue'
import Vuex from 'vuex'
import { API_KEY } from '@/../config'
import axios from 'axios'
import { getMovieDetails, test, runWithDelay } from '@/services/movieDataHelpers'

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
      // updates the active category
      // sets .active = true if category.id = categoryId
  		state.movieCategories.map(x => {
  			if (x.id === categoryId) {
  				x.active = true
  			} else {
  				x.active = false
  			}
  		})
  	},
  	pushMovieList: (state, payload) => {
      // pushes movie objects to a category's .movies list
      // using .concat instead of .push wasn't updating state

  		const catId = payload.categoryId
  		const movieList = payload.movies

      // find the category
  		let pushTo = state.movieCategories.find((x) => {
  			return x.id === catId
  		})
      // iterate through the movie list and push to .movies
  		for (var m in movieList) {
  			pushTo.movies.push(movieList[m])
  		}
  	},
  	pushMovie: (state, payload) => {
      // pushes a singular movie to a category's .movies list

  		const catId = payload.categoryId
  		const movie = payload.movie

      // find the category
  		let pushTo = state.movieCategories.find((x) => {
  			return x.id === catId
  		})

  		pushTo.movies.push(movie)
  	},

    // Improvement: make use of pushMovie instead of having different function
    // then don't have to hardcode which categoryId to search for, this would be passed in by component
  	pushFavoriteMovie: (state, movie) => {
      // find the favorite movies category
  		const favoriteMovies = state.movieCategories.find((x) => {
  			return x.id === 3
  		})
  		favoriteMovies.movies.push(movie)
  		// set in the movie object that it's a favorite
      movie.favorite = true
  	},
    // Improvement: make generic removeMovieFromList function
    // only use case is for favorite movies right now, but if there were different lists,
    // could use same logic. But would need to separate out the toggling of movie.favorite
  	removeFavoriteMovie: (state, movie) => {
  		movie.favorite = false
  		const favoriteMovies = state.movieCategories.find((x) => {
  			return x.id === 3
  		})
      // now that current movie has been toggled to .favorite = false,
      // filter favoriteMovies to only be members of itself that still have
      // .favorite==true
  		favoriteMovies.movies = favoriteMovies.movies.filter((x) => {
  			return x.favorite
  		})
  	},
   	setActiveDetails: (state, movie) => {
      // activeDetails is used by DetailScreen
      // set to relevant movie object so that DetailScreen can show right info
 			state.activeDetails = movie
  	},
  	toggleDetails: (state) => {
      // toggle this property to tell the app whether to show the detail screen
  		state.showDetails = !state.showDetails
  	}
  },
  actions: {
    // Improvement: make use of the ratelimit-remaining property and when the limit resets to send requests
    // that way more entries could be loaded at once if under 40
  	initMovieData ({commit}) {
      // can only send 4 requests a second (40 per 10 seconds)
      // increment delay +1 second every time 4 requests are sent
      // or one request every .25 seconds
      // start delay off at 250 since sending 1 request before we start splicing off subsequent requests
      let delay = 250

      // first request, get movie IDs for popular movies, since this is the first screen shown
  		axios.get('http://api.themoviedb.org/3/movie/popular?api_key=' + API_KEY).then((response) => {
  			for (var m in response.data.results) {
  				// splice off first 4 requests to run
  				let curSet = response.data.results.splice(0, 4)
  				// runWithDelay will return a promise and timeout for 'delay' before resolving
  				runWithDelay(curSet, delay).then((response) => {
            // create payload so that pushMovieList knows which list to push to
            // (id 1 is popular movies)
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
        // this next timeout will run once the current delay is up, so after all popular movie details are retrieved
	  		setTimeout(function () {axios.get('http://api.themoviedb.org/3/movie/top_rated?api_key=' + API_KEY).then((response) => {
          // reset delay since this won't be running until above runWithDelays have all finished
          // due to this whole block being delayed
	  			let delay = 250
	  			for (var m in response.data.results) {
	  				let curSet = response.data.results.splice(0, 4)
	  				runWithDelay(curSet, delay).then((response) => {
              // id 2 is top rated movies
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
