import Mock from 'mockjs'

/*
Mock.mock('http://192.168.11.115:8080/gzcb-tc_cocard_wec/presetActVue/pageActs', {
  'total|+1': 100,
  'pages|+1': 1,
  'pageNum|+1': 1,
  'acts|2': [
    {
      'aid': '1',
      'actid': '',
      'type': '0',
      'actclass': '',
      'name': '模板消息',
      'remark': '玛丽玛丽红'
    },
    {
      'aid': '2',
      'actid': '',
      'type': '1',
      'actclass': '',
      'name': '模板消息',
      'remark': '玛丽玛丽红'
    },
    {
      'aid': '2',
      'actid': '',
      'type': '2',
      'actclass': '',
      'name': '模板消息',
      'remark': '玛丽玛丽红'
    },
    {
      'aid': '8',
      'actid': '',
      'type': '8',
      'actclass': '',
      'name': '优惠券弹窗',
      'remark': '玛丽玛丽红'
    }
  ]
}) */

Mock.mock('http://192.168.11.73:8888/gzcb-tc_cocard_wec/login', {
  'code|+1': 200,
  'data|3': {
    'token': 'cd5ea73cd58f827fa78eef7197b8ee606c99b2e6',
    'user|6': {
      'createTime|1': '',
      'lastLoginTime|+1': 1496603418000,
      'userId|+1': 4567733,
      'userName': '超级管理员',
      'userNum': 'admin',
      'workStatus': '8'
    },
    'userId|1': 4567733
  },
  'message|1': 'OK'
})

Mock.mock('http://192.168.11.35:8080/gzcb-tc_cocard_wec/job/getJobList', {
  'code|1': '200',
  'total|+1': 200,
  'pages|+1': 1,
  'pageNum|+1': 1,
  'jobs|3': [
    {
      'jobid': '1',
      'triggerType|1': '0',
      'triggerObj|1': '0',
      'onsetTime|+1': 1496603418000,
      'deadTime|+1': 1496605418000,
      'remark': '宋江来了',
      'status': '0'
    },
    {
      'jobid': '1',
      'triggerType|1': '0',
      'triggerObj|1': '0',
      'onsetTime|+1': 1496603418000,
      'deadTime|+1': 1496605418000,
      'remark': '宋江来了',
      'status': '1'
    }
  ]
})

Mock.mock('http://192.168.11.115:8080/gzcb-tc_cocard_wec/user/roles', {
  'code|1': '200',
  'total|+1': 200,
  'pages|+1': 1,
  'pageNum|+1': 1,
  'jobs|3': [
    {
      'roleid': '1',
      'roleName|1': '系统部运维',
      'remark': '系统部运维人员专用',
      'status': '0'
    },
    {
      'roleid': '2',
      'roleName|1': '系统部运维',
      'remark': '系统部运维人员专用',
      'status': '0'
    }
  ]
})

Mock.setup({
  timeout: 2000
})
