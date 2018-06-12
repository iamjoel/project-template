import Vue from 'vue'

// 获取资源服务器的图片
import {IMGS_PREFIX} from '@/setting'
Vue.filter('img', function (value, size) {
  if(typeof value !== 'string' ) {
    return value
  }
  // 绝对路径，不加前缀
  if(/^http/.test(value.trim())) {
    return value
  }
  return `${IMGS_PREFIX}/${value}`
})

import moment from 'moment'
Vue.filter('time', function (value, format="YYYY-MM-DD") {
  return moment(value).format(format)
})

Vue.filter('money', function (value) {
  if(value === null) {
    return 0
  }
  var res = value / 100
  return isNaN(res) ? '非法金额' : res
})
