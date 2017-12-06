import * as types from '../mutation-types'
import { action } from '../actions'

const state = {
  forUpdate: false,
  realtimeJob: null,
  timingJob: null
}

const getters = {}

const mutations = {
  [types.FETCH_JOB_LIST_REQUEST] (state) {},
  [types.FETCH_JOB_LIST_SUCCESS] (state) {},
  [types.FETCH_JOB_LIST_FAILED] (state) {}
}

const actions = {
  fetchJobList ({ commit }, request) {
    return action(
      { commit },
      [
        types.FETCH_JOB_LIST_REQUEST,
        types.FETCH_JOB_LIST_SUCCESS,
        types.FETCH_JOB_LIST_FAILED
      ],
      {
        url: '/job/getJobList',
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
