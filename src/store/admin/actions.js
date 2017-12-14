import * as types from './mutations-type'
// import { getSuggestionApi, _logOutApi } from 'common/javascript/userApi'
import { _saveAdminInfo, _clearAdminInfo } from 'common/javascript/cache'
// import { _clearUserInfo } from '../../common/javascript/cache'

export function saveAdminInfo ({commit, state}, info) {
  commit(types.SET_ADMIN_INFO, _saveAdminInfo(info))
}

export function clearSAdminInfo ({commit, state}, info) {
  commit(types.SET_ADMIN_INFO, _clearAdminInfo(info))
}
export function reLogin ({commit, state}) {
  _clearAdminInfo()
  commit(types.SET_RE_LOGIN, true)
}
