import * as types from '../mutation-types'
import { action } from '../actions'

const state = {}

const getters = {}

const mutations = {
  [types.FETCH_LOGIN_REQUEST] (state) {},
  [types.FETCH_LOGIN_SUCCESS] (state) {},
  [types.FETCH_LOGIN_FAILED] (state) {},

  [types.FETCH_LOGOUT_REQUEST] (state) {},
  [types.FETCH_LOGOUT_SUCCESS] (state) {},
  [types.FETCH_LOGOUT_FAILED] (state) {}
}

const actions = {
  fetchLogin ({ commit }, request) {
    return action(
      { commit },
      [
        types.FETCH_LOGIN_REQUEST,
        types.FETCH_LOGIN_SUCCESS,
        types.FETCH_LOGIN_FAILED
      ],
      {
        url: '/login',
        method: 'POST',
        params: request
      }
    )
  },

  fetchLogout ({ commit }, request) {
    return action(
      { commit },
      [
        types.FETCH_LOGOUT_REQUEST,
        types.FETCH_LOGOUT_SUCCESS,
        types.FETCH_LOGOUT_FAILED
      ],
      {
        url: '/logout',
        method: 'POST',
        params: request
      }
    )
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
