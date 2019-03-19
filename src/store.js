import Vue from 'vue'
import Vuex from 'vuex'
// import { API_KEY } from '@/../config'
import axios from 'axios'
import { tidyMovieObj, tidyDetails } from '@/services/movieDataHelpers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeDetails: {},
    showDetails: false,
    movieCategories: [
      {id: 1, category: 'Popular Movies', page: 1, active: true, movies: []}, 
      {id: 2, category: 'Top Rated Movies', page: 1, active: false, movies: []}, 
      {id: 3, category: 'Favorite Movies', active: false, movies: []}
    ],
    apiRate: {
      remaining: 40,
      reset: 0,
      delay: 0
    }
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
      // need to .push or else vue won't react to the state change
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
    pushFavoriteMovie: (state, movie) => {
      // find the favorite movies category
      const favoriteMovies = state.movieCategories.find((x) => {
        return x.id === 3
      })
      favoriteMovies.movies.push(movie)
      // set in the movie object that it's a favorite
      movie.favorite = true
    },
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
    addMovieDetails: (state, payload) => {
      const movie = payload.movie
      movie.noDetails = false
      movie.details = payload.details
    },
    setActiveDetails: (state, movie) => {
      // activeDetails is used by DetailScreen
      // set to relevant movie object so that DetailScreen can show right info
      state.activeDetails = movie
    },
    toggleDetails: (state) => {
      // toggle this property to tell the app whether to show the detail screen
      state.showDetails = !state.showDetails
    },
    updateRate: (state, payload) => {
      state.apiRate.remaining = payload.headers[0]
      state.apiRate.reset = Math.ceil(payload.headers[1] * 1000 - Date.now())
    },
    decRemaining: (state) => {
      state.apiRate.remaining--
    },
    autoSetDelay: (state) => {
      state.apiRate.delay = state.apiRate.reset
    },
    forceSetDelay: (state, delay) => {
      state.apiRate.delay = delay
    },
    updatePage: (state, categoryId) => {
      const updateCategory = state.movieCategories.find((x) => {
        return x.id === categoryId
      })
      updateCategory.page++
    }
  },
  actions: {
    updateApiRate ({commit, state}) {
      commit('decRemaining')
      if (state.apiRate.remaining <= 10) {
        commit('autoSetDelay')
        // in test case of firing off 60 requests, api doesn't return limit reset
        // in time for delay to be updated and the excess requests to be limited
        if (state.apiRate.delay == 0) {
          // anything over 40, need to wait an additional 10 seconds for limit to reset again
          var amt = 10000 * Math.ceil(Math.abs(state.apiRate.remaining) / 40)
          commit('forceSetDelay', amt)
        }
      } else {
        commit('forceSetDelay', 0)
      }
    },
    fetchDetails ({dispatch, commit, state}, movie) {
      dispatch('updateApiRate')
      commit('decRemaining')
      setTimeout(() => {
        axios.get('https://good-movie.herokuapp.com/details/' + movie.id).then((response) => {
          var movieDetails = tidyDetails(response.data)
          var payload = {
            movie: movie,
            details: movieDetails
          }
          commit('addMovieDetails', payload)
        })
      }, state.apiRate.delay)
    },
    fetchMovies ({dispatch, commit, state}, categoryId) {
      dispatch('updateApiRate')
      setTimeout(() => {
        if (categoryId == 1) {
          var category = 'popular'
          var page = state.movieCategories.find((x) => {return x.id === categoryId}).page
        } else if (categoryId == 2) {
          var category = 'top'
          var page = state.movieCategories.find((x) => {return x.id === categoryId}).page
        }
        // do this before api call returned so that subsequent calls will use right page
        commit('updatePage', categoryId)
        axios.get('https://good-movie.herokuapp.com/' + category + '/' + page).then((response) => {
          commit('updateRate', response.data)
          var movieData = tidyMovieObj(response.data.data.results)
          const movieList = {
            categoryId: categoryId,
            movies: movieData
          }
          commit('pushMovieList', movieList)
        })
      }, state.apiRate.delay)
    }
  }
})
