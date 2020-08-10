import { API_URL } from '../.env'
import axios from 'axios'

export async function postRating ({ score, tour_id }) {
  const token = getToken()
  const auth = {
    headers: { Authorization: 'token ' + token }
  }
  const rating = await axios.post(`${API_URL}/rating/create`, { score, tour_id }, auth)
    .then(res => console.log(res))
  return rating
}

export async function putRating ({ score, tour_id }, params) {
  const token = getToken()
  const auth = {
    headers: { Authorization: 'token ' + token }
  }
  const rating = await axios.put(`${API_URL}/rating/update/${params}`, { score, tour_id }, auth)
    .then(res => console.log(res))
  return rating
}

export async function getRating () {
  try {
    const response = await axios.get(`${API_URL}/rating/`)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export function getToken () {
  return localStorage.getItem('token')
}
