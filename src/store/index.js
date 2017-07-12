import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  user: {
    name: null,
    staff_id: null,
    node_id: null,
    node_name: null,
    node_type: null,
    role_id: null,
    role_name: null,
  },
  needCheckRoleSelected: false, // 是否需要判断是否选择了Role
  menu: {}, // 所有有权限的菜单
  limit: [], // 权限
  codes: {}, // 所有代码值
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    strict: debug,
})
