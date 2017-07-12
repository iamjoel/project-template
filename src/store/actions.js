import * as types from './mutation-types'
import { urls } from '@/setting'
import wrapFetchQuery from '@/assets/tools/wrap-fetch-query'
import axios from 'axios'
import {fetchAllCodeList as fetchCodes} from '@/api/common'

export const setUser = ({ commit }, user) => {
  commit(types.USER_INFO, user)
}

export const fetchMenuAndLimit = ({ commit, state, getters }) => {
  var user = state.user
  if(getters.selectedOrg && getters.selectedRole) {
    var data = {
      menuKey: 'user',
      staff_id: state.user.id,//之前是staff_id
      node_id: getters.selectedOrg.id,
      node_type: getters.selectedOrg.type,
      role_id: getters.selectedRole.id,
    }
    console.info('获取菜单和权限+记录这次登录的角色和组织')
    axios.post(urls.menuAndLimit, data).then(response => {
        if (!response.data.errcode) {
            var res = response.data.msgbody
            // 做了好多了模块后，要改这个，也是 WTF 了
            // 减少代码改动量：把后端一定要求的路径： psi 替换成 前端定义的 pss
            res.menu = res.menu.map(item => {
              if(item.children){
                if(item.enname === 'psi') {
                  item.children = item.children.map(subMenu => {
                    subMenu.path = subMenu.path.replace('psi', 'pss')
                    return subMenu
                  })
                }

                item.children = item.children.map(subMenu => {
                  subMenu.path = subMenu.path.replace(/_/g, '-')
                  return subMenu
                })
              }

              return item
            })
            commit(types.MENU_LIMIT, {
                data: res
            })
        } else {
          commit(types.MENU_LIMIT, {
              data: {
                menu: [],
                limit: []
              }
          })
        }
    }, ()=> {
      commit(types.MENU_LIMIT, {
          data: {
            menu: [],
            limit: []
          }
      })
    })
  }
}
// 拿所有的代码值
export const fetchAllCodeList = ({ commit, state, getters }) => {
  fetchCodes().then(({data})=> {
    if(!data.errcode) {
      // debugger
      var codes = {}
      data.msgbody.data.forEach(item => {
        if(!codes[item.parentname]) {
          codes[item.parentname] = []
        }
        codes[item.parentname].push(item)
      })
      // debugger
      commit(types.CODES, codes)
    }
  })
}

export const selectOrg = ({ commit }, orgs) => {
    commit(types.SELECT_ORG, orgs)
}

export const selectRole = ({ commit }, role) => {
  // debugger
    commit(types.SELECT_ROLE, role)
}
