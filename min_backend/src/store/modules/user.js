import * as types from '../mutation-types'
import { action } from '../actions'

const state = {}

const getters = {}

const mutations = {
  [types.FETCH_USER_ROLES_REQUEST] (state) {},
  [types.FETCH_USER_ROLES_SUCCESS] (state) {},
  [types.FETCH_USER_ROLES_FAILED] (state) {}
}

const actions = {
  fetchUserRoles ({ commit }, request) {
    return action(
      { commit },
      [
        types.FETCH_USER_ROLES_REQUEST,
        types.FETCH_USER_ROLES_SUCCESS,
        types.FETCH_USER_ROLES_FAILED
      ],
      {
        url: '/user/roles',
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
