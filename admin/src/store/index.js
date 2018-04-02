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
  * 基础数据包括：菜单，字典，实体，页面配置数据
  */
  hasLoadBasicData: false,
  navMenu: [], // 菜单
  dict: [], // 字典
  entities: [], // 实体
  pagesConfig: {}, // 页面配置
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
