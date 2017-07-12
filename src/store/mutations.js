import * as types from './mutation-types'
import {ROLE_MAP} from '@/setting'
import Vue from 'vue'


const mutations = {
  [types.USER_INFO] (state, user) {
    state.user = user
    localStorage.setItem('sc-user-info', JSON.stringify(state.user))
  },
  [types.MENU_LIMIT] (state, menuAndLimit) {
    state.menu = menuAndLimit.data.menu
    state.limit = menuAndLimit.data.limit
    state.user.role_type = ROLE_MAP[menuAndLimit.data.role] || `unknow member:${menuAndLimit.data.role}`
    localStorage.setItem('sc-user-info', JSON.stringify(state.user))
  },
  [types.SELECT_ORG] (state, org) {
    state.user.node_id = org.id || org.node_id
    state.user.node_type = org.type || org.node_type
    state.user.node_name = state.user.node_type === 'all' ? '所有' : (org.name || org.node_name)
    localStorage.setItem('sc-user-info', JSON.stringify(state.user))
  },
  [types.SELECT_ROLE] (state, role) {
    state.user.role_id = role.id || role.role_id
    state.user.role_name = role.name || role.role_name
    localStorage.setItem('sc-user-info', JSON.stringify(state.user))
  },
  [types.CODES] (state, codes) {
    state.codes = codes
  },
}

export default mutations
