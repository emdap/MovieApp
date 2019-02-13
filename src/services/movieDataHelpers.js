const baseURL = 'http://image.tmdb.org/t/p/'

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