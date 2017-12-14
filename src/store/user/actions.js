import * as types from './mutations-type'
import { getSuggestionApi, _logOutApi } from 'common/javascript/userApi'
import { _clearUserInfo, _saveExactAddress, _clearExactAddress, _saveUserInfo, _clearCartList, _addCartNum, _subCartNum, _setShopTypeList } from 'common/javascript/cache'

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

export function reLogin ({commit, state}) {
  _clearUserInfo()
  commit(types.SET_RE_LOGIN, true)
}

export function logOut ({commit, state}, userId) {
  _logOutApi(userId)
  commit(types.SET_USER_INFO, _clearUserInfo())
}

export function clearCartList ({commit, state}) {
  commit(types.CLEAR_CART_LIST, _clearCartList())
}

export function addCartNum ({commit, state}, item) {
  commit(types.SET_CART_LIST, _addCartNum(item))
}

export function subCartNum ({commit, state}, item) {
  commit(types.SET_CART_LIST, _subCartNum(item))
}

export function setShopType ({commit, state}, list) {
  commit(types.SET_SHOPTYPE, _setShopTypeList(list))
}
