import { API_URL } from '../.env'
import axios from 'axios'

export async function postRating ({ score }, params) {
  const token = getToken()
  const auth = {
    headers: { Authorization: 'token ' + token }
  }
  const rating = await axios.post(`${API_URL}/rating/create?tour_id=${params}`, { score }, auth)
    .then(res => console.log(res))
  return rating
}

export async function putRating ({ score }, pk) {
  const token = getToken()
  const auth = {
    headers: { Authorization: 'token ' + token }
  }
  const rating = await axios.put(`${API_URL}/rating/update/${pk}`, { score }, auth)
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
