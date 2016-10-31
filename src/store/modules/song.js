import * as types from '../mutation-types'
const state = {
  list: []
}

const mutations = {
  [types.FETCH_SONG_LIST] (state, songList) {
    state.list = songList
  }
}

export default {
  state,
  mutations
}
