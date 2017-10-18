import * as types from './mutation-types'
import { urls } from '@/setting'
import axios from 'axios'

import Mock from 'mockjs'
var Random = Mock.Random

export const setUser = ({ commit }, user) => {
  commit(types.USER_INFO, user)
}

export const fetchMenuAndLimit = ({ commit, state, getters }) => {
  commit(types.MENU_LIMIT, {
      data: {
        menu: [{
          "innerid": Random.guid(),
          "name": "音乐",
          "icon": 'message',
          children: [{
              "innerid": Random.guid(),
              "name": "歌曲",
              path: '/music/song/list',
          },]
        }],
        limit: {}
      }
  })
}
