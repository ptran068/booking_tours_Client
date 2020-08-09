import axios from 'axios'

import { API_URL } from '../.env'

export async function getTour(id) {
  const tour = await axios.get(`${API_URL}/tour/${id}`)

  return tour
}
