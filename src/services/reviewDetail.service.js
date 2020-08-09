import * as axios from 'axios'
import { API_URL } from '../.env.js'
import {options} from './headers'

const getReview = async function (review_id) {
  try {
    const response = await axios.get(`${API_URL}/review/${review_id}`)
    let review = parseData(response)
    return review

  } catch (error) {
    console.error(error)
    return []
  }
}

const parseData = response => {
  if (response.status !== 200) throw Error(response.message)
  if (!response.data) return []
  let review = response.data
  if (typeof review !== 'object') {
    review = {}
  }
  return review
}

export async function likeReview (review_id) {
  try {
    const response = await axios.put(`${API_URL}/review/${review_id}/like`,{ } , options)
    let review = parseData(response)
    return review.like
  } catch(error) {
    console.log(error)
    return []
  }
}


export const data = {
  getReview
}