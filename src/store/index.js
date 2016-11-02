import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

import song from './modules/song'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  pagers: {},
  orders: {}
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    song
  },
  strict: debug,
})
