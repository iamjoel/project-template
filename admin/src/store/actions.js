import * as types from './mutation-types'
import { urls } from '@/setting'
import axios from 'axios'

export const setUser = ({ commit }, user) => {
  commit(types.USER_INFO, user)
}

import {PAGES} from '@/setting'
var menu = []
PAGES.forEach(item => {
  var parent = item
  var children = item.children.map(item => {
    var menuPath = item.menuPath || 'list'
    return {
      "id": item.id,
      "name": item.name,
      path: `/${parent.id}/${item.id}/${menuPath}`
    }
  })
  return menu.push({
    id: parent.id,
    name: parent.name,
    children
  })
})

export const fetchMenuAndLimit = ({ commit, state, getters }) => {
  // 可以根据 process.env.NODE_ENV 来判断拿的值
  commit(types.MENU_LIMIT, {
      data: {
        menu,
        limit: {}
      }
  })
}
