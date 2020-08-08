import Http from './http.init'

export default class BaseService {
  constructor () {
    if (!this.entity) {
      throw new Error('Child service class not provide entity')
    }
  }

  request (status = { auth: false }) {
    return new Http(status)
  }
}
