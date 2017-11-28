import * as types from './mutations-type'
import { getSuggestionApi } from 'common/javascript/userApi'
import { _saveExactAddress, _clearExactAddress } from 'common/javascript/cache'
export function getSuggestion ({commit, state}, str) {
  const address = state.inexactAddress[1]  // 选择城市
  getSuggestionApi({address, str}).then(result => {
    commit(types.SET_SUGGESTIONS_LIST, result)
  })
}

export function saveExactAddress ({commit, state}, item) {
  commit(types.SAVE_EXACT_ADDRESS, _saveExactAddress(item))
}

export function clearExactAddress ({commit, state}) {
  commit(types.SAVE_EXACT_ADDRESS, _clearExactAddress())
}
