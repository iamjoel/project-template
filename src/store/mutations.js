import * as types from './mutation-types'
import Vue from 'vue'

const mutations = {
  [types.LANGUAGE_UPDATE] (state, lan) {
    state.currLan = lan
    Vue.config.lang = lan
    localStorage.setItem('currLan', lan)
  }
}
export default mutations