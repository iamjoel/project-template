import * as types from './mutation-types'

const mutations = {
  [types.USER_INFO] (state, user) {
    state.user = user
  },
  [types.OPENID] (state, openid) {
    state.openid = openid
  },
  [types.CHANGE_ACTIVE_TYPE] (state, type) {
    state.activeTypeIndex = type
  },
  [types.CHANGE_FOOTER_VISIBLE] (state, isShow) {
    state.isShowFooter = isShow
  }
}

export default mutations
