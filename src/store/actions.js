import * as types from './mutation-types'
import { urls } from '@/setting'
import axios from 'axios'

export const setUser = ({ commit }, user) => {
  commit(types.USER_INFO, user)
}

export const fetchMenuAndLimit = ({ commit, state, getters }) => {
  commit(types.MENU_LIMIT, {
      data: {
        menu: [],
        limit: {}
      }
  })
}
