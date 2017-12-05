import * as types from './mutations-type'
import { getSuggestionApi, _logOutApi } from 'common/javascript/userApi'
import { _saveExactAddress, _clearExactAddress, _saveUserInfo } from 'common/javascript/cache'
import { _clearUserInfo } from '../../common/javascript/cache'
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

export function saveUserInfo ({commit, state}, info) {
  commit(types.SET_USER_INFO, _saveUserInfo(info))
}

export function logOut ({commit, state}) {
  _logOutApi()
  commit(types.CLEAR_USER_INFO, _clearUserInfo())
}
