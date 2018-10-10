import axios from 'axios'
import wrapFetchQuery from '@/assets/utils/wrap-fetch-query'
import {urls} from '@/setting'


export const fetchList = (key, condition, pager, sort) => {
  var url = wrapFetchQuery(urls[key].list, condition, pager, sort)
  return axios.get(url, {
    params: {
    },
  })
}

export const fetchModel = (key, id) => {
  var url = urls[key].detail
  return axios.get(`${url}/${id}`, {
    params: {
    },
  })
}

export const addModel = (key, data) => {
  delete data.createTime
  delete data.updateTime
  delete data.delFlg
  delete data.moreInfo
  var url = urls[key].add
  return axios.post(url, Object.assign({}, data, {
  }) )
}

export const editModel = (key, data) => {
  delete data.createTime
  delete data.updateTime
  delete data.delFlg
  delete data.moreInfo
  var url = `${urls[key].edit}`
  return axios.post(url, Object.assign({}, data, {
  }))
}

export const deleteModel = (key, id) => {
  var url = urls[key].del
  return axios.post(`${url}/${id}`)
}

