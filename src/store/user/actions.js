import * as types from './mutations-type'
import { getSuggestionApi } from 'assets/javascript/api'
import { _saveAddress } from 'assets/javascript/cache'
export function getSuggestion ({commit, state}, str) {
  const coordinate = state.coordinate
  getSuggestionApi({coordinate, str}).then(result => {
    commit(types.SET_SUGGESTIONS_LIST, result)
  })
}

export function saveAddress ({commit, state}, item) {
  commit(types.SAVE_ADDRESS, _saveAddress(item))
}
