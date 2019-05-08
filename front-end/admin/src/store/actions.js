import * as types from './mutation-types'
import { urls, SERVER_PREFIX } from '@/setting'
import axios from 'axios'

export const setUser = ({ commit }, user) => {
  commit(types.USER_INFO, user)
}

var sysMenu = [
  {
    id: 'dashboard',
    name: '仪表盘',
    path: '/'
  }
]
import configMenus from '@/setting/base/menu'
var menus = [...sysMenu, ...configMenus]

export const fetchMenuAndLimit = ({ commit, state, getters }) => {
  var role = state.role
  console.log(role)
  // 权限过滤
  var currentMenus = menus.filter(menu => {
    if (menu.role) {
      return hasLimit(menu.role, role)
    } else {
      if (menu.children) {
        menu.children = menu.children.filter(item => {
          return hasLimit(item.role, role)
        })
      }
      return true
    }
  })
  // 过滤掉那些空菜单。
  currentMenus = currentMenus.filter(menu => {
    if (menu.children && menu.children.length === 0) {
      return false
    } else {
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

function hasLimit (allowRoles, role) {
  role = role + ''
  if (!allowRoles || role === '1') return true // 所有设置权限人都能看; 1 是超级管理员
  if (Array.isArray(allowRoles)) {
    return allowRoles.map(item => item + '').indexOf(role) != -1
  } else {
    allowRoles = allowRoles + ''
    return allowRoles === role
  }
}

export const fetchBasicData = ({ commit, state, getters }) => {
  commit(types.ROLES, require('@/setting/base/roles').default)
  commit(types.DICT, require('@/setting/base/dict').default)
  commit(types.ENTITIES, require('@/setting/base/entities').default)
  commit(types.UTIL_FN, require('@/setting/base/util-fns').default)
}
