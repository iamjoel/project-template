import * as types from './mutation-types'
import { urls } from '@/setting'
import axios from 'axios'

export const setUser = ({ commit }, user) => {
  commit(types.USER_INFO, user)
}

export const changeActiveType = ({ commit }, type) => {
  commit(types.CHANGE_ACTIVE_TYPE, type)
}

export const changeFooterVisible = ({ commit }, isShow) => {
  commit(types.CHANGE_FOOTER_VISIBLE, isShow)
}
