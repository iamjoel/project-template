import axios from 'axios'
import {urls} from '@/setting'
require('./mock') // mock 数据，上线去掉
import wrapFetchQuery from '@/assets/utils/wrap-fetch-query'

var currUrl = urls.music

export const fetchList = (condition, pager) => {
  var url = wrapFetchQuery(currUrl.list, condition, pager)
  return axios.get(url, {
    params: {
    },
  })
}

export const fetchModel = (id) => {
  var url = `${currUrl.query}?where[id]=${id}`
  return axios.get(url, {
    params: {
    },
  })
}

export const addModel = (data) => {
  return axios.post(currUrl.add, Object.assign({}, data, {
  }), )
}

export const editModel = (data) => {
  return axios.post(currUrl.edit, Object.assign({}, data, {
  }), )
}

export const deleteModel = (id) => {
  return axios.post(currUrl.del, {
    id: id,
  })
}

