// import { API_KEY } from '@/../config'
import axios from 'axios'
import store from '../store'

// Improvement: cache the response in services/ImageApi instead of hardcoding baseurl
const baseURL = 'http://image.tmdb.org/t/p/'

export async function runWithDelay (movieData, delay) {
	// create new promise
	var promise = new Promise(function(resolve, reject) {
		// timeout for 'delay'
		setTimeout(async function() {
			// map the movieData entries into api calls using x.id
			let promises = movieData.map(x => axios.get('https://goodmovie.azurewebsites.net/details/' + x.id))
			// evaluate the promises
			axios.all(promises).then((response) => {
				// clean up the response with only needed attributes
				var cleanedUp = tidyMovieObj(response)
				resolve(cleanedUp)
			}).catch((response) => {
				console.log(response)
				reject(response)
			})
		}, delay)
	})
	return promise
}

export function loopResponses(response, delay, categoryId) {
	console.log(response.length)
	while (response.length) {
      // splice off first 4 requests to run
      let curSet = response.splice(0, 4)
      // runWithDelay will return a promise and timeout for 'delay' before resolving
      runWithDelay(curSet, delay).then((response) => {
        // create payload so that pushMovieList knows which list to push to
        // (id 1 is popular movies)
        const popMovies = {
          categoryId: categoryId,
          movies: response
        }
        store.commit('pushMovieList', popMovies)
      }).catch((response) => {
        console.log(response)
      })
      delay += 1000
    }
}

export function tidyMovieObj (rawResponse) {
	// loop through and set data the app needs
	var tidyObjs = rawResponse.map(tempMovie => 
		({
			id: tempMovie.id,
			originalTitle: tempMovie.original_title,
			overview: tempMovie.overview,
			rating: tempMovie.vote_average,
			releaseDate: tempMovie.release_date,
			voteCount: tempMovie.vote_count,
			posterURL: baseURL + 'w500' + tempMovie.poster_path,
			thumbURL: baseURL + 'w92' + tempMovie.poster_path,
			favorite: false
		})
	)
	return tidyObjs
}