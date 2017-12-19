import * as types from './mutation-types'
import {ROLE_MAP} from '@/setting'
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
}

export default mutations
