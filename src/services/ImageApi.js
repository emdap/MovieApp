import axios from 'axios'
import { API_KEY } from '@/../config.js'

export default() => {
	axios.get('https://api.themoviedb.org/3/configuration?api_key=' + API_KEY).then((response) => {
		const base_url = response.images.base_url
	  return axios.create({
  	  baseURL: base_url
  	})
	})
}
