import * as types from './mutation-types'
import Vue from 'vue'

const mutations = {
  [types.PAGER_UPDATE] (state, {id, pager}) {
    state.pagers[id] = pager
    state.pagers = Object.assign({},state.pagers)
  },
  [types.ORDER_UPDATE] (state, {id, order}) {
    state.orders[id] = order
    state.orders = Object.assign({},state.orders)
  },
  [types.LANGUAGE_UPDATE] (state, lan) {
    state.currLan = lan
    Vue.config.lang = lan
    localStorage.setItem('currLan', lan)
  }
}
export default mutations