import { API_KEY } from '@/../config'
import axios from 'axios'

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
	for (var r in rawResponse) {
		let tempMovie = rawResponse[r].data
		console.log(tempMovie)
		let newMovie = {
			id: tempMovie.id,
			originalTitle: tempMovie.original_title,
			overview: tempMovie.overview,
			rating: tempMovie.vote_average,
			releaseDate: tempMovie.release_date,
			filePath: tempMovie.poster_path
		}
		tidyObjs.push(newMovie)
	}
	return tidyObjs
}