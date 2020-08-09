import { API_URL } from '../.env'
import axios from 'axios'
import { options } from './headers'

export async function postBook ({ start_date }, params) {
  const token = getToken()
  const auth = {
    headers: { Authorization: 'token ' + token }
  }
  const booking = await axios.post(`${API_URL}/booking/?tour_id=${params}`, { start_date }, auth)
    .then(res => console.log(res))
  return booking
}

export async function getBook(tour_id) {
  try {
    const response = await axios.get(`${API_URL}/booking/?tour_id=` + tour_id, options)
    let books = parseData(response)
    return books.results[0]
  }
  catch (error) {
    console.log(error)
    return {}
  }
}


const parseData = response => {
  if (response.status !== 200) throw Error(response.message)
  if (!response.data) return []
  return response.data
}


export async function cancelBook({ start_date }, book_id) {
  try {
    const response = await axios.put(`${API_URL}/booking/` + book_id, { start_date, status: 1 }, options)
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
  }
}


export function getToken () {
  return localStorage.getItem('token')
}
