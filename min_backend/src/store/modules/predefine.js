import * as types from '../mutation-types'
import { action } from '../actions'

const state = {}

const getters = {}

const mutations = {
  [types.FETCH_PREDEFINE_ACTIONS_REQUEST] (state) {},
  [types.FETCH_PREDEFINE_ACTIONS_SUCCESS] (state) {},
  [types.FETCH_PREDEFINE_ACTIONS_FAILED] (state) {},

  [types.ADD_PREDEFINE_ACTION_REQUEST] (state) {},
  [types.ADD_PREDEFINE_ACTION_SUCCESS] (state) {},
  [types.ADD_PREDEFINE_ACTION_FAILED] (state) {},

  [types.UPDATE_PREDEFINE_ACTION_REQUEST] (state) {},
  [types.UPDATE_PREDEFINE_ACTION_SUCCESS] (state) {},
  [types.UPDATE_PREDEFINE_ACTION_FAILED] (state) {},

  [types.DELETE_PREDEFINE_ACTION_REQUEST] (state) {},
  [types.DELETE_PREDEFINE_ACTION_SUCCESS] (state) {},
  [types.DELETE_PREDEFINE_ACTION_FAILED] (state) {},

  [types.FETCH_PREDEFINE_ACTION_REQUEST] (state) {},
  [types.FETCH_PREDEFINE_ACTION_SUCCESS] (state) {},
  [types.FETCH_PREDEFINE_ACTION_FAILED] (state) {},

  [types.FIND_TEMP_BY_ID_REQUEST] (state) {},
  [types.FIND_TEMP_BY_ID_SUCCESS] (state) {},
  [types.FIND_TEMP_BY_ID_FAILED] (state) {},

  [types.FIND_XLIST_BY_ID_REQUEST] (state) {},
  [types.FIND_XLIST_BY_ID_SUCCESS] (state) {},
  [types.FIND_XLIST_BY_ID_FAILED] (state) {},

  [types.FIND_ACTIONS_BY_IDS_REQUEST] (state) {},
  [types.FIND_ACTIONS_BY_IDS_SUCCESS] (state) {},
  [types.FIND_ACTIONS_BY_IDS_FAILED] (state) {},

  [types.FIND_ARTICLE_BY_ID_REQUEST] (state) {},
  [types.FIND_ARTICLE_BY_ID_SUCCESS] (state) {},
  [types.FIND_ARTICLE_BY_ID_FAILED] (state) {}
}

const actions = {
  fetchPredefineActions ({ commit }, request) {
    return action(
      { commit },
      [
        types.FETCH_PREDEFINE_ACTIONS_REQUEST,
        types.FETCH_PREDEFINE_ACTIONS_SUCCESS,
        types.FETCH_PREDEFINE_ACTIONS_FAILED
      ],
      {
        url: '/presetActVue/pageActs',
        method: 'POST',
        params: request
      }
    )
  },

  addPredefineAction ({ commit }, request) {
    return action(
      { commit },
      [
        types.ADD_PREDEFINE_ACTION_REQUEST,
        types.ADD_PREDEFINE_ACTION_SUCCESS,
        types.ADD_PREDEFINE_ACTION_FAILED
      ],
      {
        url: '/presetActVue/add',
        method: 'POST',
        params: request
      }
    )
  },

  updatePredefineAction ({ commit }, request) {
    return action(
      { commit },
      [
        types.UPDATE_PREDEFINE_ACTION_REQUEST,
        types.UPDATE_PREDEFINE_ACTION_SUCCESS,
        types.UPDATE_PREDEFINE_ACTION_FAILED
      ],
      {
        url: '/presetActVue/update',
        method: 'POST',
        params: request
      }
    )
  },

  deletePredefineAction ({ commit }, request) {
    return action(
      { commit },
      [
        types.DELETE_PREDEFINE_ACTION_REQUEST,
        types.DELETE_PREDEFINE_ACTION_SUCCESS,
        types.DELETE_PREDEFINE_ACTION_FAILED
      ],
      {
        url: '/presetActVue/delete',
        method: 'POST',
        params: request
      }
    )
  },

  fetchPredefineAction ({ commit }, request) {
    return action(
      { commit },
      [
        types.FETCH_PREDEFINE_ACTION_REQUEST,
        types.FETCH_PREDEFINE_ACTION_SUCCESS,
        types.FETCH_PREDEFINE_ACTION_FAILED
      ],
      {
        url: '/presetActVue/updateView',
        method: 'POST',
        params: request
      }
    )
  },

  findTempById ({ commit }, request) {
    return action(
      { commit },
      [
        types.FIND_TEMP_BY_ID_REQUEST,
        types.FIND_TEMP_BY_ID_SUCCESS,
        types.FIND_TEMP_BY_ID_FAILED
      ],
      {
        url: '/presetActVue/findTempById',
        method: 'POST',
        params: request
      }
    )
  },

  // 根据id查询信息流的备注
  findXlistById ({ commit }, request) {
    return action(
      { commit },
      [
        types.FIND_XLIST_BY_ID_REQUEST,
        types.FIND_XLIST_BY_ID_SUCCESS,
        types.FIND_XLIST_BY_ID_FAILED
      ],
      {
        url: '/presetActVue/findRecommedById',
        method: 'POST',
        params: request
      }
    )
  },

  findActsByIds ({ commit }, request) {
    return action(
      { commit },
      [
        types.FIND_ACTIONS_BY_IDS_REQUEST,
        types.FIND_ACTIONS_BY_IDS_SUCCESS,
        types.FIND_ACTIONS_BY_IDS_FAILED
      ],
      {
        url: '/presetActVue/findActsById',
        method: 'POST',
        params: request
      }
    )
  },

  // 根据id查询文章的备注
  findArticleById ({ commit }, request) {
    return action(
      { commit },
      [
        types.FIND_ARTICLE_BY_ID_REQUEST,
        types.FIND_ARTICLE_BY_ID_SUCCESS,
        types.FIND_ARTICLE_BY_ID_FAILED
      ],
      {
        url: '/presetActVue/findArticleById',
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
