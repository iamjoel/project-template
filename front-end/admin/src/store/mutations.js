import * as types from './mutation-types'
import { ROLE_MAP } from '@/setting'
import Vue from 'vue'

const mutations = {
  [types.ROLE] (state, role) {
    state.role = role
  },
  [types.USER_INFO] (state, user) {
    state.user = user
  },
  [types.MENU_LIMIT] (state, menuAndLimit) {
    state.menu = menuAndLimit.data.menu
    state.limit = menuAndLimit.data.limit
  },
  [types.ROLES] (state, data) {
    state.roles = data
  },
  [types.DICT] (state, data) {
    state.dict = data
  },
  [types.ENTITIES] (state, data) {
    state.entities = data
  },
  [types.NAV_MENU] (state, data) {
    state.navMenu = data
  },
  [types.UTIL_FN] (state, data) {
    state.utilFns = data
  },
  [types.BASIC_DATA_LOADED] (state, data) {
    state.hasLoadBasicData = true
  }
}

export default mutations
