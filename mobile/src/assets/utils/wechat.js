import axios from 'axios'
import {urls} from '@/setting'

function registerSDK( opts = {}, successFn = function(){}) {
  // opts.registerURL = opts.registerURL || location.origin + location.pathname
  // opts.registerURL = 'http://zhixingclub.com/sanqianfang/mobile/?a=3'//location.origin + location.pathname
  opts.registerURL = location.href.split('#')[0]//location.origin + location.pathname
  axios.post(urls.wechat.registerWechat, {
    url: opts.registerURL
  }).then(({data}) => {
    var info = data.data
      wx.config({
        // debug: true,
        ...info
      })

      wx.ready(()=> {
        if(opts.hideShare) {
          wx.hideMenuItems({
            menuList: [
            "menuItem:share:appMessage",
            "menuItem:share:timeline",
            "menuItem:share:qq",
            "menuItem:share:weiboApp",
            "menuItem:favorite",
            "menuItem:share:facebook",
            "menuItem:share:QZone"]
         })
        } else {
          wx.showMenuItems({
            menuList: [
            "menuItem:share:appMessage",
            "menuItem:share:timeline",
            "menuItem:share:qq",
            "menuItem:share:weiboApp",
            "menuItem:favorite",
            "menuItem:share:facebook",
            "menuItem:share:QZone"]
         })
        }
        successFn && successFn()
      })

      wx.error((res)=> {
        // alert('微信jssdk 注册失败:' + JSON.stringify(res))
      })
  })
}

import { Toast } from 'vant'
export function pay(payInfo, successFn, failFn) {
  axios.post(urls.wechat.getPayInfo, payInfo).then(({data}) => {
    registerSDK({}, function () {
      wx.chooseWXPay(Object.assign(data.data, {
        success() {
          Toast('支付成功')
          successFn && successFn()
        },
        fail() {
          Toast('支付失败')
          failFn && failFn()
        }
      }))
    })
  })
}

export default registerSDK