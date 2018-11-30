import { API_KEY } from '@/../config'
import axios from 'axios'

// Improvement: cache the response in services/ImageApi instead of hardcoding baseurl
const baseURL = 'http://image.tmdb.org/t/p/'

export async function runWithDelay (movieData, delay) {
	// create new promise
	var promise = new Promise(function(resolve, reject) {
		// timeout for 'delay'
		setTimeout(async function() {
			// map the movieData entries into api calls using x.id
			let promises = movieData.map(x => axios.get('https://api.themoviedb.org/3/movie/' + x.id + 
						'?api_key=' + API_KEY + '&language=en-US'))
			// evaluate the promises
			axios.all(promises).then((response) => {
				// clean up the response with only needed attributes
				var cleanedUp = tidyMovieObj(response)
				resolve(cleanedUp)
			})
		}, delay)
	})
	return promise
}

function tidyMovieObj (rawResponse) {
	const tidyObjs = []
	// loop through and set data the app needs
	for (var r in rawResponse) {
		let tempMovie = rawResponse[r].data
		let newMovie = {
			id: tempMovie.id,
			originalTitle: tempMovie.original_title,
			overview: tempMovie.overview,
			rating: tempMovie.vote_average,
			releaseDate: tempMovie.release_date,
			runtime: tempMovie.runtime,
			posterURL: baseURL + 'w185/' + tempMovie.poster_path,
			thumbURL: baseURL + 'w92/' + tempMovie.poster_path,
			favorite: false
		}
		tidyObjs.push(newMovie)
	}
	return tidyObjs
}