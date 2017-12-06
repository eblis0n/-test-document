// 写cookies
export function setCookie (name, value) {
  const Days = 30
  const exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
}

// 读取cookies
export function getCookie (name) {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')

  let arr
  return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null
}

// 删除cookies
export function delCookie (name) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  const cval = getCookie(name)

  if (cval != null) {
    document.cookie = (name + '=' + cval + ';expires=' + exp.toGMTString())
  }
}

// 保存session
export function saveSession (token, userId, userName) {
  sessionStorage.setItem('x-access-token', token)
  sessionStorage.setItem('x-access-id', userId)
  sessionStorage.setItem('x-access-name', userName)
}

// 获取token
export function getSesstion () {
  const token = sessionStorage.getItem('x-access-token')
  const userId = sessionStorage.getItem('x-access-id')
  const userName = sessionStorage.getItem('x-access-name')
  return { token, userId, userName }
}

// 移除session
export function removeSesstion () {
  sessionStorage.removeItem('x-access-token')
  sessionStorage.removeItem('x-access-id')
  sessionStorage.removeItem('x-access-name')
}

// 获取某年某月有多少天
// 如2017年2月getDaysOfMonth(2017, 2) 返回28
export function getDaysOfMonth (year, month) {
  if (!year || !month) return 0

  const date = new Date(year, month, 0)
  return date.getDate()
}
