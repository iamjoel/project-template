import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  /*
  * 基础数据没加载好前，页面显示loading
  * 基础数据包括：菜单，角色，字典，实体，页面配置数据
  */
  hasLoadBasicData: false,
  roles: [], // 角色
  dict: [], // 字典
  entities: [], // 实体
  navMenu: [], // 菜单
  utilFns: [], // 工具方法
  listPagesConfig: [], // 列表页配置
  updatePagesConfig: [], // 终页配置
  user: {
    id: null,
    name: null,
  },
  role: '',// 角色
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
