import Vue from 'vue'

// 获取资源服务器的图片
import { IMGS_PREFIX } from '@/setting'
Vue.filter('img', function (value, size) {
  if (typeof value !== 'string') {
    return value
  }
  // 绝对路径，不加前缀
  if (/^http/.test(value.trim())) {
    return value
  }
  return `${IMGS_PREFIX}/${value}`
})

import moment from 'moment'
Vue.filter('time', function (value, format = 'YYYY-MM-DD') {
  return moment(value).format(format)
})

Vue.filter('money', function (value) {
  if (value === null) {
    return 0
  }
  var res = value / 100
  return isNaN(res) ? '非法金额' : res
})

import dict from '@/setting/base/dict'
Vue.filter('dict', function (value, type) {
  var target = dict.filter(item => item.key === type)[0]
  if (target) {
    var res = target.value.filter(item => item.key == value)[0]
    return res ? res.label : '未知key'
  } else {
    return '未知类型'
  }
})
