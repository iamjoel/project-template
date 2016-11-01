import * as types from './mutation-types'

const mutations = {
  [types.PAGER_UPDATE] (state, {id, pager}) {
    state.pagers[id] = pager
    state.pagers = Object.assign({},state.pagers)
  }
}
export default mutations