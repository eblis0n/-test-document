import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import actions from './actions'
import mutations from './mutations'
import * as getters from './getters'
import menu from './modules/menu'
import predefine from './modules/predefine'
import auth from './modules/auth'
import coupon from './modules/coupon'
import job from './modules/job'
import banner from './modules/banner'
import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  getters,
  actions,
  mutations,
  modules: {
    menu,
    predefine,
    auth,
    coupon,
    job,
    banner,
    user
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
