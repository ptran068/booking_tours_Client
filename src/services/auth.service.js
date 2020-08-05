import axios from 'axios'
import $store from '../store'
import $router from '../router'

import { API_URL } from '../.env'

/**
 ******************************
 * @API
 ******************************
 */

export async function login({ email, password }) {
  const user = await axios.post(`${API_URL}/user/login`, { email, password})
  _setAuthData({token: user.data.token, user: user.data.user})
  return user
}

export async function create({ email, phone, password }) {
  const user = await axios.post(`${API_URL}/user/create`, { email, phone, password})
  print(user)
  return user
}

export function makeLogout () {
  _resetAuthData();
  $router.push({ name: 'index'});
}

export function getToken() {
  return localStorage.getItem("token")
}

function _setAuthData({ token, user }) {
  localStorage.setItem("token",token);
  $store.commit('user/SET_CURRENT_USER', user);
}

function _resetAuthData() {
  $store.commit("user/SET_CURRENT_USER", {});
  localStorage.setItem("token","");
}
