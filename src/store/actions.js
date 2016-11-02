import * as types from './mutation-types'
import * as song from 'api/song'

export const fetchSongList = ({ commit }, {searchCondition, pager}) => {
  song.fetchList({searchCondition, pager}).then(songList => {
    commit(types.FETCH_SONG_LIST, songList)
  })
}

export const updatePager = ({ commit }, {id, pager}) => {
  commit(types.PAGER_UPDATE, {id, pager})
}

export const updateOrder = ({ commit }, {id, order}) => {
  commit(types.ORDER_UPDATE, {id, order})
}