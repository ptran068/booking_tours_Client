import UserService from '../../../services/auth.service'

export default {
  async getCurrent ({ commit }) {
    const user = await UserService.getUserByToken()
    await commit('SET_CURRENT_USER', user.data)
    return user
  }
}
