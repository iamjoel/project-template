
import setting from 'setting'
import Vue from 'vue'
let isDebugger = true
// import 不支持条件。必须放在头部，所以委曲求全用 require
isDebugger &&  require('./mock')

var urls = setting.urls.song

export const fetchList = ({searchCondition, pager}) => {
  return new Promise((resolve, reject) => {
    Vue.http.get(urls.list, {body:{where:searchCondition,pager}}).then(({body})=> {
      var res = JSON.parse(body)
      resolve(res)
    })
  })
}

export const fetchDetail = (id) => {
  return new Promise((resolve, reject) => {
    Vue.http.get(urls.detail, {params:{id}}).then(({body})=> {
      body = JSON.parse(body)
      resolve(body)
    })
  })
}