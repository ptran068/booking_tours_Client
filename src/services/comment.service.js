import * as axios from 'axios'
import { API_URL } from '../.env.js'
import { getToken } from './auth.service'

const getComments = async function (review_id) {
  try {

    const response = await axios.get(`${API_URL}/comments/?review_id=` + review_id)
    let comments = parseList(response)
    return comments.results

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

const options = {
  headers: {
    'Authorization': 'token ' + getToken(),
  }
};

export async function postComment({ content, review }) {
  try {
    const response = await axios.post(`${API_URL}/comments/`, { content, review }, options)
    let comment = parseComment(response)
    return comment
  } catch (error) {

  }
}


const parseComment = response => {
  if (response.status != 201) throw Error(response.message)
  if (!response.data) return {}
  return response.data
}




export const data = {
  getComments
}