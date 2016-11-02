
import setting from 'setting'
import Vue from 'vue'
let isDebugger = true
// import 不支持条件。必须放在头部，所以委曲求全用 require
isDebugger &&  require('./mock')


import http from 'utils/http-wrap'

var urls = setting.urls.song

export const fetchList = ({searchCondition, pager, order}) => {
  return new Promise((resolve, reject) => {
    http.get(urls.list, {body:{where:searchCondition,pager,order}}).then( data => {
      resolve(data)
    })
  })
}

export const fetchDetail = (id) => {
  return new Promise((resolve, reject) => {
    http.get(urls.detail, {params:{id}}).then( data => {
      resolve(data)
    })
  })
}