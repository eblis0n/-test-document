import axios from 'axios'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { REQUEST_SUCCESS, URL } from '../utils/constant'
import { getSesstion } from '../utils/util'
import router from '../router'

import '../utils/mock/mock'

NProgress.configure({ showSpinner: false })

const ACCOUNT_OR_PASSWORD_ERROR = '1001'
const TOKEN_TIMEOUT = '1002'
const AUTHORIZE_ERROR = '1003'
const UPLOAD_DATA_DUPLICATE = '2002' // 批量增加优惠券时，优惠券上传重复

function checkStatus (response) {
  NProgress.done()

  const data = response.data
  const status = response.status

  if (data && status === 200) {
    const { code, result } = data

    if ((code + '') !== REQUEST_SUCCESS) {
      switch (code) {
        case ACCOUNT_OR_PASSWORD_ERROR:
          throw new Error('用户名或密码错误！！！')
        case TOKEN_TIMEOUT:
          sessionStorage.removeItem('x-access-token')
          sessionStorage.removeItem('x-access-id')
          router.push({ name: 'LOGIN' })
          break
        case AUTHORIZE_ERROR:
          sessionStorage.removeItem('x-access-token')
          sessionStorage.removeItem('x-access-id')
          router.push({ name: 'LOGIN' })
          throw new Error('用户登录信息异常，已退出系统！！！')
        case UPLOAD_DATA_DUPLICATE:
          return data
        default:
          if (result) {
            throw new Error(`${result}(${code})`)
          } else {
            throw new Error('程序异常了！！！')
          }
      }
    }

    return data
  }

  const error = data
  let errMsg = ''
  if (error.error && error.message) {
    errMsg = error.message
  } else {
    errMsg = '服务器异常了~'
  }

  throw new Error(errMsg)
}

function CALL_API (url, method = 'GET', request) {
  NProgress.start()

  const path = URL + url

  let params = request

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  if (path.indexOf('/login') < 0) {
    const { token, userId } = getSesstion()

    if (token && userId) {
      headers['X-access-token'] = token
      headers['X-access-id'] = userId
    }
  }

  const isUploadCouponFile = path.indexOf('/actCouponManage/addUpload') >= 0 || path.indexOf('actCouponManage/deleteUpload') >= 0

  return axios({
    url: path,
    method,
    headers,
    timeout: isUploadCouponFile ? 300000 : 20000,
    data: params,
    params: (method === 'GET') ? params : null
  }).then(checkStatus).catch(error => {
    NProgress.done()

    console.error('[ERROR]: ', error)
    const errorRes = error.response
    if (errorRes) {
      const status = error.response.status
      const errMsg = error.response.data

      switch (status) {
        case 404:
          Message.error({ showClose: true, message: `您的请求不存在(${status})` })
          break
        case 502:
          Message.error({ showClose: true, message: `服务器异常了(${status})` })
          break
        case 400:
          Message.error({ showClose: true, message: `${errMsg}(${status})` })
          break
        default:
          Message.error({ showClose: true, message: `网络异常了(${status})` })
      }
    } else {
      Message.error({ showClose: true, message: error.message || '服务器异常了~' })
    }

    throw error
  })
}

export default CALL_API
