import * as types from './mutation-types'

const mutations = {
  [types.PAGER_UPDATE] (state, {id, pager}) {
    state.pagers[id] = pager
    state.pagers = Object.assign({},state.pagers)
  },
  [types.ORDER_UPDATE] (state, {id, order}) {
    state.orders[id] = order
    state.orders = Object.assign({},state.orders)
  }
}
export default mutations