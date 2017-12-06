import * as types from '../mutation-types'
import { action } from '../actions'

const state = {}

const getters = {}

const mutations = {
  [types.FETCH_COUPONID_BY_ACTID_REQUEST] (state) {},
  [types.FETCH_COUPONID_BY_ACTID_SUCCESS] (state) {},
  [types.FETCH_COUPONID_BY_ACTID_FAILED] (state) {},

  [types.UPLOAD_COUPON_FOR_ADD_REQUEST] (state) {},
  [types.UPLOAD_COUPON_FOR_ADD_SUCCESS] (state) {},
  [types.UPLOAD_COUPON_FOR_ADD_FAILED] (state) {},

  [types.UPLOAD_COUPON_FOR_DELETE_REQUEST] (state) {},
  [types.UPLOAD_COUPON_FOR_DELETE_SUCCESS] (state) {},
  [types.UPLOAD_COUPON_FOR_DELETE_FAILED] (state) {},

  [types.FETCH_COUPONS_REQUEST] (state) {},
  [types.FETCH_COUPONS_SUCCESS] (state) {},
  [types.FETCH_COUPONS_FAILED] (state) {},

  [types.TRANSFER_COUPONS_TO_FTP_REQUEST] (state) {},
  [types.TRANSFER_COUPONS_TO_FTP_SUCCESS] (state) {},
  [types.TRANSFER_COUPONS_TO_FTP_FAILED] (state) {}
}

const actions = {
  fetchCouponidByActid ({ commit }, request) {
    return action(
      { commit },
      [
        types.FETCH_COUPONID_BY_ACTID_REQUEST,
        types.FETCH_COUPONID_BY_ACTID_SUCCESS,
        types.FETCH_COUPONID_BY_ACTID_FAILED
      ],
      {
        url: '/actCouponManage/selectCoupidByAid',
        method: 'POST',
        params: request
      }
    )
  },

  // 批量删除优惠券
  uploadCouponsForDelete ({ commit }, request) {
    return action(
      { commit },
      [
        types.UPLOAD_COUPON_FOR_DELETE_REQUEST,
        types.UPLOAD_COUPON_FOR_DELETE_SUCCESS,
        types.UPLOAD_COUPON_FOR_DELETE_FAILED
      ],
      {
        url: '/actCouponManage/deleteUpload',
        method: 'POST',
        params: request
      }
    )
  },

  // 批量增加优惠券
  uploadCouponsForAdd ({ commit }, request) {
    return action(
      { commit },
      [
        types.UPLOAD_COUPON_FOR_ADD_REQUEST,
        types.UPLOAD_COUPON_FOR_ADD_SUCCESS,
        types.UPLOAD_COUPON_FOR_ADD_FAILED
      ],
      {
        url: '/actCouponManage/addUpload',
        method: 'POST',
        params: request
      }
    )
  },

  // 优惠券管理列表列表
  fetchCoupons ({ commit }, request) {
    return action(
      { commit },
      [
        types.FETCH_COUPONS_REQUEST,
        types.FETCH_COUPONS_SUCCESS,
        types.FETCH_COUPONS_FAILED
      ],
      {
        url: '/actCouponManage/pageCoupons',
        method: 'POST',
        params: request
      }
    )
  },

  // ftp上传到服务器上
  transferCouponsToFtp ({ commit }, request) {
    return action(
      { commit },
      [
        types.TRANSFER_COUPONS_TO_FTP_REQUEST,
        types.TRANSFER_COUPONS_TO_FTP_SUCCESS,
        types.TRANSFER_COUPONS_TO_FTP_FAILED
      ],
      {
        url: '/actCouponManage/ftpUpload',
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
