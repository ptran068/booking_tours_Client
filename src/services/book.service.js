import { API_URL } from '../.env'
import axios from 'axios'

export async function postBook ({ start_date }, params) {
  const token = getToken()
  const auth = {
    headers: { Authorization: 'token ' + token }
  }
  const booking = await axios.post(`${API_URL}/booking/?tour_id=${params}`, { start_date }, auth)
    .then(res => console.log(res))
  return booking
}

export function getToken () {
  return localStorage.getItem('token')
}
