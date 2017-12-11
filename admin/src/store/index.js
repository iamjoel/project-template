import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  user: {
    id: null,
    name: null,
  },
  menu: [], // 所有有权限的菜单
  limit: {}, // 权限
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    strict: debug,
})
