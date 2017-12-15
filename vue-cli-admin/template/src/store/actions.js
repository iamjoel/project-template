import * as types from './mutation-types'
import { urls } from '@/setting'
import axios from 'axios'

export const setUser = ({ commit }, user) => {
  commit(types.USER_INFO, user)
}

import {menuConfig} from '@/setting'
// 这边是加所有定义了路由的页面
var menus = []
menuConfig.forEach(menu => {
  var parent = menu
  if(menu.children) { // 二级菜单
    var subMenu = menu.children.map(item => {
      return {
        "id": item.id,
        "name": item.name,
        path: item.mainPage.routePath
      }
    })
    return menus.push({
      id: parent.id,
      name: parent.name,
      children: subMenu
    })
  } else { // 一级菜单
    return menus.push({
      id: parent.id,
      name: parent.name,
      path: menu.mainPage.routePath
    })
  }
})

console.log(menus)

export const fetchMenuAndLimit = ({ commit, state, getters }) => {
  // 可以根据 process.env.NODE_ENV 来判断拿的值
  commit(types.MENU_LIMIT, {
      data: {
        menu: menus,
        limit: {}
      }
  })
}
