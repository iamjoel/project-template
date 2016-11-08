import * as types from './mutation-types'

export const updateCurrLan = ({ commit }, lan) => {
  commit(types.LANGUAGE_UPDATE, lan)
}