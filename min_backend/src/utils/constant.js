export const TEXT_LIBRARY_THEAD = [
  { prop: 'name', label: '文本库名称' },
  { prop: 'keywords', label: '关键词' },
  { prop: 'priority', label: '优先级', width: '98' },
  { prop: 'status', label: '状态', width: '98' }
]

export const PREDEFINE_LIST_THEAD = [
  { prop: 'aid', label: '动作ID', width: '98' },
  { prop: 'name', label: '动作类型', width: '240' },
  { prop: 'remark', label: '备注信息' }
]

export const HOME_BANNER_THEAD = [
  { prop: 'date', label: '日期' },
  { prop: 'bannerImg', label: '图片缩略图' }
]

export const COUPON_LIST_THEAD = [
  { prop: 'id', label: '序号' },
  { prop: 'couponCode', label: '优惠券码' },
  { prop: 'receiveStatus', label: '是否领取' },
  { prop: 'receiveTime', label: '领取时间' },
  { prop: 'receiveCustid', label: '领取用户ID' }
]

export const JOB_LIST_THEAD = [
  { prop: 'jobid', label: '任务ID' },
  { prop: 'triggerType', label: '触发类别' },
  { prop: 'triggerObj', label: '触发对象' },
  { prop: 'onsetTime', label: '生效时间' },
  { prop: 'deadTime', label: '失效时间' },
  { prop: 'remark', label: '备注' }
]

export const USER_ROLE_THEAD = [
  { prop: 'roleid', label: '角色ID', width: 212 },
  { prop: 'roleName', label: '角色名称' },
  { prop: 'remark', label: '备注信息' }
]

export const TABLE_PAGE_SIZE = 15
export const REQUEST_SUCCESS = '200'

// 预定义各个模块标识
export const PREDEFINE_TYPE = {
  ALL: { value: '', name: '全部' },
  TEMPLATE_MSG: { value: '0', name: '模板消息' },
  XLIST: { value: '1', name: '消息控制' },
  PARAM_UPDATE: { value: '3', name: '参数更新' },
  POPUP_WINDOW: { value: '4', name: '显示弹窗' },
  OPEN_PAGE: { value: '6', name: '打开页面' },
  OPEN_ARTICLE: { value: '7', name: '打开文章' },
  COUPON_POPUP: { value: '8', name: '优惠券弹窗' }
}

export const JOB_TRIGGER_TYPE = {
  ALL: { value: '', name: '全部' },
  REALTIME_MINITOR: { value: '0', name: '实时监听' },
  TIMING_TRIGGER: { value: '1', name: '定时触发' }
}

const ENV = process.env.NODE_ENV
const DOMAIN = {
  'production': 'https://mini.cc.gzcb.com.cn/txcard_net',
  'testing': 'https://mini.jxufe.net/gzcb-tc_cocard_wec',
  'development': 'http://192.168.11.35:8080/gzcb-tc_cocard_wec'
  // 'development': 'http://192.168.11.73:8888/gzcb-tc_cocard_wec'
}

const OLD_DOMAIN = {
  'production': ' https://mini.cc.gzcb.com.cn/txcard_net/jsp/login.jsp',
  'testing': 'https://mini.jxufe.net/gzcb-tc_cocard_wec/jsp/login.jsp',
  'development': 'https://mini.jxufe.net/gzcb-tc_cocard_wec/jsp/login.jsp'
}

export const URL = DOMAIN[ENV]
export const OLD_URL = OLD_DOMAIN[ENV]
