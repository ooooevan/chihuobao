import * as types from './mutations-type'
// import { getSuggestionApi, _logOutApi } from 'common/javascript/userApi'
import { _saveSellerInfo, _clearSellerInfo } from 'common/javascript/cache'
// import { _clearUserInfo } from '../../common/javascript/cache'

export function saveSellerInfo ({commit, state}, info) {
  commit(types.SET_SELLER_INFO, _saveSellerInfo(info))
}

export function clearSellerInfo ({commit, state}, info) {
  commit(types.SET_SELLER_INFO, _clearSellerInfo(info))
}
