import Vue from 'vue'

// 获取资源服务器的图片
import {IMGS_PREFIX} from '@/setting'
Vue.filter('img', function (value, size) {
  return `${IMGS_PREFIX}/${size === 'small' ? 'thumb_img/' : ''}${value}`
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
