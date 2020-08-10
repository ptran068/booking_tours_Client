import { API_URL } from '../.env'
import axios from 'axios'

export async function postRating ({ score, tour_id }, params) {
  const token = getToken()
  const auth = {
    headers: { Authorization: 'token ' + token }
  }
  const rating = await axios.post(`${API_URL}/rating/`, { score, tour_id }, auth)
    .then(res => console.log(res))
  return rating
}

export function getToken () {
  return localStorage.getItem('token')
}
