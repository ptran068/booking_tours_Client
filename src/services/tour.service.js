import BaseService from './base.service'
import axios from 'axios'

import { API_URL } from '../.env'

export async function getTour (id) {
  const tour = await axios.get(`${API_URL}/tour/${id}`)
  return tour
}

class TourService extends BaseService {
  get entity () {
    return 'tour'
  }
  
  search (title) {
    const charge = this.request({ auth: true }).get(`/${this.entity}?title=${title}`)
    return charge
  }

}
  
export default new TourService()