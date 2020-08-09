import axios from 'axios'

import { API_URL } from '../.env'

export async function getTour() {
  const tour = await axios.get(`${API_URL}/tour/62383e36-7db4-465d-9d3f-f82f52f7db3d`)

  return tour
}
