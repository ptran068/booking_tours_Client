import * as axios from 'axios'
import { API_URL } from '../.env.js'

const getTours = async function (page = 1) {
  try {
    var offset = (page - 1) * 12
    const response = await axios.get(`${API_URL}/tour?offset=${offset}&limit=12`)
    let tours = parseList(response)
    return tours.results
  } catch (error) {
    console.error(error)
    return []
  }
}

const getTourDetail = async function (params) {
  try {
    const response = await axios.get(`${API_URL}/tour/${params}`)
    return response.data
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

export const data = {
  getTours,
  getTourDetail
}
