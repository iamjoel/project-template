import axios from 'axios'
import {urls} from '@/settings'
import {Toast} from 'mint-ui'

function registerSDK( opts = {}, successFn = function(){}) {
  // opts.registerURL = opts.registerURL || location.origin + location.pathname
  // opts.registerURL = 'http://zhixingclub.com/sanqianfang/mobile/?a=3'//location.origin + location.pathname
  opts.registerURL = location.href.split('#')[0]//location.origin + location.pathname
  axios.get(urls.registerWechat, {
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

export function pay(payInfo, success) {
  // payInfo 包含：orderId, openid, attach
  // alert(JSON.stringify(payInfo))

  axios.post(urls.getPayInfo, payInfo).then(({data}) => {
    // alert(JSON.stringify(data.data))
    registerSDK({}, function () {
      wx.chooseWXPay(Object.assign(data.data, {
        success() {
          Toast('支付成功')
          success && success()
        }
      }))
    })
  })
}

export default registerSDK