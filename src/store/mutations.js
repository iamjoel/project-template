import * as types from './mutation-types'
import Vue from 'vue'
import store from 'store'


const mutations = {
  [types.LANGUAGE_UPDATE] (state, lan) {
    state.currLan = lan
    Vue.config.lang = lan
    store.set('currLan', lan)
  }
}
export default mutations