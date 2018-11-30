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
// export async function test (movieData, rateRemaining) {
// 	let promises = [];
// 	var count = 40 - rateRemaining
// 	const responses = []
// 	// gather all the endpoints we need to hit
// 	for (var m in movieData) {
// 		let movieId = movieData[m].id
// 	 	promises.push(axios.get('https://api.themoviedb.org/3/movie/' + movieId + 
// 				'?api_key=' + API_KEY + '&language=en-US'))
// 	}
// 	// keep track of how many requests (groups of four) we've made
// 	var c = 0
// 	// set a delay once we've hit four requests/second
// 	var delay = 0

// 	await axios.all(promises).then((response) => {
// 		console.log(response)
// 		for (var r in response) {
// 			responses.push(response[r].data)
// 		}
// 	})

// 	return responses
// }

// // export function getMovieImages (movieData) {
// // 	let promises = []
// // 	let movieImages = []
// // 	for (var m in movieData) {
// // 		let movieId = movieData[m].id
// // 	 	promises.push(axios.get('https://api.themoviedb.org/3/movie/' + movieId + 
// // 				'/images?api_key=' + API_KEY + '&language=en-US')) 
// // 	}
// // 	axios.all(promises).
// // }

// export function getMovieImages (movieData, rateRemaining) {

// 	const movieDetails = []
// 	var timeout = 0
// 	var callsMade = 40 - rateRemaining

// 	for (var m in movieData) {
// 		// get the movieID, use that to get the movie details, create a new object using 
// 		// the properties we need

// 		let movieId = movieData[m].id
// 		console.log(callsMade, timeout)
		
// 		// can do 4 api calls every second
// 		// if our callsmade are exceeding 4, add another second to wait
// 		// so that 4 calls will be sent off at a time
// 		callsMade += 1
// 		if (callsMade >= 4) {
// 			timeout += 1000
// 			callsMade = 0
// 		}

// 		setTimeout(function () {
// 			axios.get('https://api.themoviedb.org/3/movie/' + movieId + 
// 				'/images?api_key=' + API_KEY + '&language=en-US').then((response) => {
// 				let newMovie = {
// 					id: movieId,
// 					filePath: response.data.posters.file_path,
// 					thumbnailSize: 'w92',
// 					posterSize: 'w185'
// 				}
// 				// push to list of movie objects with needed details
// 				movieDetails.push(newMovie)
// 			}).catch(error => {
// 				console.log(error)
// 			})
// 		}, timeout)
// 	}
// 	return [movieDetails, rateLimit]
// }



// export async function getMovieDetails (movieData, rateRemaining) {

// 	const posterSize = 'w185'
// 	const thumbnailSize = 'w92'
// 	const movieDetails = []
// 	const promises = []
// 	var timeout = 0
// 	var callsMade = 40 - rateRemaining
// 	// var rateRemaining

// 	// Promise.all(users.map(user => axios.get('https://api.themoviedb.org/3/movie/' + movieId + 
// 	// 		'?api_key=' + API_KEY + '&language=en-US')))
//  //       .then(results => resolve())
//  //       .catch(err => reject(err))

// 	for (var m in movieData) {
// 		// get the movieID, use that to get the movie details, create a new object using 
// 		// the properties we need
// 		var movieId = movieData[m].id
// 		var newMovie = {
// 			id: movieId
// 		}
// 		console.log(callsMade, timeout, movieId)
// 		// minus 2 since we're making 2 api calls every loop
// 		callsMade += 2
// 		if (callsMade >= 4) {
// 			timeout += 1000
// 			callsMade = 0
// 		}
// 		// first get the movie details, then get the filepath for the image
// 		// want to store all of that information in the same object 
// 		setTimeout(function () {
// 			axios.get('https://api.themoviedb.org/3/movie/' + movieId + 
// 			'?api_key=' + API_KEY + '&language=en-US').then((response) => {
// 			rateRemaining = response.headers['x-ratelimit-remaining']
// 			console.log(rateRemaining, movieId)
// 			newMovie.originalTitle = response.data.original_title
// 			newMovie.overview = response.data.overview
// 			newMovie.rating = response.data.vote_average
// 			newMovie.releaseDate = response.data.release_date

// 			axios.get('https://api.themoviedb.org/3/movie/' + movieId + 
// 				'/images?api_key=' + API_KEY + '&language=en-US').then((response) => {
// 				newMovie.filePath = response.data.posters.file_path
// 				// push to list of movie objects with needed details
// 				movieDetails.push(newMovie)
// 			}).catch(error => {
// 				console.log(error)
// 			})
// 		}).catch(error => {
// 			console.log(error)
// 		})
// 	}, timeout)
// 	}
// 	return movieDetails
// }
