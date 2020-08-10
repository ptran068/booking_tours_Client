
import { getToken } from './auth.service'

export const options = {
  headers: {
    'Authorization': 'token ' + getToken()
  }
}
