import * as types from './mutation-types'
import * as song from 'api/song'


export const fetchSongList = ({ commit }, queryObj) => {
  song.fetchList(queryObj).then(songList => {
    commit(types.FETCH_SONG_LIST, songList)
  })
}
