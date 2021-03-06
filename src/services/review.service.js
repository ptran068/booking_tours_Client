import * as axios from 'axios'
import { API_URL } from '../.env.js'
import { options } from './headers'

const getReviews = async function (tour_id, page = 1) {
  try {
    var offset = (page - 1) * 12
    const response = await axios.get(`${API_URL}/review/?limit=12&offset=${offset}&tours_id=` + tour_id)
    let reviews = parseList(response)
    return reviews.results
  } catch (error) {
    console.error(error)
    return []
  }
}


const parseList = response => {
  if (response.status !== 200) throw Error(response.message)
  if (!response.data) return []
  let list = response.data
  if (typeof list !== 'object') {
    list = []
  }
  return list
}

export async function getReviewByUser(page=1) {
  try {
    var offset = (page - 1) * 10
    const response = await axios.get(`${API_URL}/review/manage/?limit=10&offset=${offset}`, options)
    let reviews = parseList(response)
    return reviews.results
  } catch (error) {
    console.error(error)
    return []
  }
}


export async function deleteReview(review_id, tour_id) {
  try {
    const response = await axios.delete(`${API_URL}/review/${review_id}/?tours_id=`+tour_id, options)
    if(response.status===204) 
      return true
    return false
  } catch(error) {
    console.log(error)
    return false
  }

}



export async function postReview ({ title, content, tours }, formData) {
  try {
    let rp = await axios.post(`${API_URL}/file/upload`, formData, options)
    let image = parseData(rp)
    let response = await axios.post(`${API_URL}/review/`, { title, content, tours, images: [image.id] }, options)
    let review = parseData(response)
    return review
  } catch (error) {
    console.error(error)
    return {}
  }
}

const parseData = response => {
  if (response.status !== 201) throw Error(response.message)
  if (!response.data) return {}
  return response.data
}

export const data = {
  getReviews
}
