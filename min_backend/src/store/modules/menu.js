import * as types from '../mutation-types'

const state = {
  isNavCollapse: false,
  breadcrumbs: [
    // { name: '数据监控', path: '/' },
    // { name: '实时交易', path: '/files' }
  ]
}

const getters = {}

const mutations = {
  [types.COLLAPSE_NAV] (state, isNavCollapse) {
    state.isNavCollapse = !state.isNavCollapse
  },

  [types.UPDATE_BREADCRUMB] (state, newBreadcrumbs) {
    state.breadcrumbs = newBreadcrumbs
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
