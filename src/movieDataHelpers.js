import { API_KEY } from '@/../config'
import axios from 'axios'

// so there is a way to get this, see ImageApi.js, but I was conceiving of its use wrong
// so hard coding it here 
// TODO: cache this by grabbing the actual URL
const baseURL = 'http://image.tmdb.org/t/p/'

export async function runWithDelay (movieData, delay) {
	// create new promise
	var promise = new Promise(function(resolve, reject) {
		// timeout for 'delay'
		setTimeout(async function() {
			// pushing all URLs into a list so that can evaluate them all
			// not especially necessary, was experimenting with .all for ratelimiting and 
			// kept the syntax
			let promises = []
			for (var m in movieData) {
				let movieId = movieData[m].id
				// make the url
			 	promises.push(axios.get('https://api.themoviedb.org/3/movie/' + movieId + 
						'?api_key=' + API_KEY + '&language=en-US'))
			}
			axios.all(promises).then((response) => {
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
			posterURL: baseURL + 'w185/' + tempMovie.poster_path,
			thumbURL: baseURL + 'w92/' + tempMovie.poster_path,
			favorite: false
		}
		tidyObjs.push(newMovie)
	}
	return tidyObjs
}