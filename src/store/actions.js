import * as types from './mutation-types'
import * as song from 'api/song'

export const fetchSongList = ({ commit }, {searchCondition, pager}) => {
  song.fetchList({searchCondition, pager}).then(songList => {
    commit(types.FETCH_SONG_LIST, songList)
  })
}
