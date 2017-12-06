import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { UPDATE_BREADCRUMB } from '../store/mutation-types'

const Login = () => import('../views/Login')
const Error = () => import('../views/Error')
const Home = () => import('../views/Home')
const Content = () => import('../views/Content')
const TextLibray = () => import('../views/text/TextLibrary')
const OldAdmin = () => import('../views/OldAdmin')
const PredefineList = () => import('../views/predefine/PredefineList')
const PredefineAdd = () => import('../views/predefine/PredefineAdd')
const PredefineUpdate = () => import('../views/predefine/PredefineUpdate')
const HomeBannerSetting = () => import('../views/banner/HomeBannerSetting')
const CouponMgr = () => import('../views/coupon/CouponMgr')
const JobList = () => import('../views/job/JobList')
const JobAdd = () => import('../views/job/JobAdd')
const JobUpdate = () => import('../views/job/JobUpdate')
const UserRoleMgr = () => import('../views/user/UserRoleMgr')
const UserAuthMgr = () => import('../views/user/UserAuthMgr')
const UserMgr = () => import('../views/user/UserMgr')
const UserAddRole = () => import('../views/user/UserAddRole')

Vue.use(Router)

function setBreadcrumb (breadcrumbs) {
  if (!breadcrumbs || breadcrumbs.length <= 0) return
  store.commit(UPDATE_BREADCRUMB, breadcrumbs)
}

export default new Router({
  mode: 'history',
  base: '/admin',
  routes: [
    {
      path: '/login',
      name: 'LOGIN',
      component: Login
    },
    {
      path: '/',
      component: Content,
      children: [
        {
          path: '',
          name: 'HOME',
          component: Home,
          beforeEnter (to, from, next) {
            setBreadcrumb([{name: '首页', path: '/'}])
            next()
          }
        },
        {
          path: 'predefine/list',
          name: 'PREDINE_LIST',
          component: PredefineList,
          beforeEnter (to, from, next) {
            setBreadcrumb([{name: '预定义', path: ''}, {name: '预定义列表', path: '/predefine/list'}])
            next()
          }
        },
        {
          path: 'predefine/add',
          name: 'PREDINE_ADD',
          component: PredefineAdd,
          beforeEnter (to, from, next) {
            setBreadcrumb([{name: '预定义', path: ''}, {name: '添加预定义', path: '/predefine/add'}])
            next()
          }
        },
        {
          path: 'predefine/update/:type',
          name: 'PREDINE_UPDATE',
          component: PredefineUpdate,
          meta: {
            keepAlive: true
          },
          beforeEnter (to, from, next) {
            console.log(to)
            setBreadcrumb([{name: '预定义', path: ''}, {name: '更新预定义', path: to.fullPath}])
            next()
          }
        },
        {
          path: 'coupon/mgr/:actid',
          name: 'COUPON_MGR',
          component: CouponMgr,
          beforeEnter (to, from, next) {
            console.log(to)
            setBreadcrumb([{name: '优惠券', path: ''}, {name: '优惠券管理', path: to.fullPath}])
            next()
          }
        },
        {
          path: 'banner/setting',
          name: 'BANNER_SETTING',
          component: HomeBannerSetting,
          beforeEnter (to, from, next) {
            console.log(to)
            setBreadcrumb([{name: 'banner', path: ''}, {name: '首页banner日历配置', path: to.fullPath}])
            next()
          }
        },
        {
          path: 'text/library',
          name: 'TEXT_LIBRARY',
          component: TextLibray,
          beforeEnter (to, from, next) {
            setBreadcrumb([{name: '文本库', path: '/文本库列表'}])
            next()
          }
        },
        {
          path: '/job/list',
          name: 'JOB_LIST',
          component: JobList,
          beforeEnter (to, from, next) {
            setBreadcrumb([{name: '任务规则', path: ''}, {name: '任务规则列表', path: to.fullPath}])
            next()
          }
        },
        {
          path: '/job/add',
          name: 'JOB_ADD',
          component: JobAdd,
          beforeEnter (to, from, next) {
            setBreadcrumb([{name: '任务规则', path: ''}, {name: '添加任务', path: to.fullPath}])
            next()
          }
        },
        {
          path: '/job/update/:jobid',
          name: 'JOB_UPDATE',
          component: JobUpdate,
          beforeEnter (to, from, next) {
            setBreadcrumb([{name: '任务规则', path: ''}, {name: '更新任务', path: to.fullPath}])
            next()
          }
        },
        {
          path: '/user',
          name: 'USER_MGR',
          component: UserMgr,
          beforeEnter (to, from, next) {
            setBreadcrumb([{name: '用户及权限管理', path: ''}, {name: '用户管理', path: to.fullPath}])
            next()
          }
        },
        {
          path: '/user/role',
          name: 'USER_ROLE_MGR',
          component: UserRoleMgr,
          beforeEnter (to, from, next) {
            setBreadcrumb([{name: '用户及权限管理', path: ''}, {name: '角色管理', path: to.fullPath}])
            next()
          }
        },
        {
          path: '/user/auth',
          name: 'USER_AUTH_MGR',
          component: UserAuthMgr,
          beforeEnter (to, from, next) {
            setBreadcrumb([{name: '用户及权限管理', path: ''}, {name: '角色权限管理', path: to.fullPath}])
            next()
          }
        },
        {
          path: '/user/role/add',
          name: 'USER_ROLE_ADD',
          component: UserAddRole,
          beforeEnter (to, from, next) {
            setBreadcrumb([
              {name: '用户及权限管理', path: ''},
              {name: '角色权限管理', path: '/user/role'},
              {name: '添加角色', path: '/user/role/add'}
            ])
            next()
          }
        },
        {
          path: 'old',
          name: 'OLD_ADMIN',
          component: OldAdmin,
          beforeEnter (to, from, next) {
            setBreadcrumb([{name: '旧管理后台', path: '/old'}])
            next()
          }
        }
      ]
    },
    {
      path: '*',
      name: 'ERROR',
      component: Error,
      beforeEnter (to, from, next) {
        setBreadcrumb([{ name: '页面不存在', path: '' }])
        next()
      }
    }
  ]
})
