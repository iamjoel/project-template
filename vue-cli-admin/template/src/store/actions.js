import * as types from './mutation-types'
import { urls, SERVER_PREFIX } from '@/setting'
import axios from 'axios'

export const setUser = ({ commit }, user) => {
  commit(types.USER_INFO, user)
}

var sysMenu = [{
  id: 'dashboard',
  name: '仪表盘',
  path: '/'
},{
  id: 'account',
  name: '帐号',
  path: '/account',
  role: 'admin',
}]
import configMenus from '@/setting/base/menu'
var menus = [...sysMenu, ...configMenus]

export const fetchMenuAndLimit = ({ commit, state, getters }) => {
  var role = state.role
  // 权限过滤
  var currentMenus = menus.filter(menu => {
    if(menu.role) {
      if(menu.role !== role) {
        return false
      } else {
        if(menu.children) {
          menu.children = menu.children.filter(item => {
            if(item.role) {
              return item.role === role
            }
            return true
          })
        }
        return true
      }
    } else {
      if(menu.children) {
        menu.children = menu.children.filter(item => {
          if(item.role) {
            return item.role === role
          }
          return true
        })
      }
      return true
    }
  })

  // 可以根据 process.env.NODE_ENV 来判断拿的值
  commit(types.MENU_LIMIT, {
      data: {
        menu: currentMenus,
        limit: {}
      }
  })
}

export const fetchBasicData = ({ commit, state, getters }) => {
  commit(types.ROLES, require('@/setting/base/roles').default)
  commit(types.DICT, require('@/setting/base/dict').default)
  commit(types.ENTITIES, require('@/setting/base/entities').default)
  commit(types.UTIL_FN, require('@/setting/base/util-fns').default)
}


