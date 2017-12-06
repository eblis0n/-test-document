import * as types from '../mutation-types'
import { action } from '../actions'

const state = {}

const getters = {}

const mutations = {
  [types.FETCH_BANNER_LIST_REQUEST] (state) {},
  [types.FETCH_BANNER_LIST_SUCCESS] (state) {},
  [types.FETCH_BANNER_LIST_FAILED] (state) {},

  [types.BANNER_UPDATE_UPLOAD_REQUEST] (state) {},
  [types.BANNER_UPDATE_UPLOAD_SUCCESS] (state) {},
  [types.BANNER_UPDATE_UPLOAD_FAILED] (state) {},

  [types.BANNER_ADD_UPLOAD_REQUEST] (state) {},
  [types.BANNER_ADD_UPLOAD_SUCCESS] (state) {},
  [types.BANNER_ADD_UPLOAD_FAILED] (state) {}
}

const actions = {
  // 获取banner图片列表
  fetchBannerList ({ commit }, request) {
    return action(
      { commit },
      [
        types.FETCH_BANNER_LIST_REQUEST,
        types.FETCH_BANNER_LIST_SUCCESS,
        types.FETCH_BANNER_LIST_FAILED
      ],
      {
        url: '/bannerVue/list',
        method: 'POST',
        params: request
      }
    )
  },

  // 修改banner上传到数据库
  bannerUpdateUpload ({ commit }, request) {
    return action(
      { commit },
      [
        types.BANNER_UPDATE_UPLOAD_REQUEST,
        types.BANNER_UPDATE_UPLOAD_SUCCESS,
        types.BANNER_UPDATE_UPLOAD_FAILED
      ],
      {
        url: '/bannerVue/updateUpload',
        method: 'POST',
        params: request
      }
    )
  },

  // 上传banner到数据库
  bannerAddUpload ({ commit }, request) {
    return action(
      { commit },
      [
        types.BANNER_ADD_UPLOAD_REQUEST,
        types.BANNER_ADD_UPLOAD_SUCCESS,
        types.BANNER_ADD_UPLOAD_FAILED
      ],
      {
        url: '/bannerVue/addUpload',
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
