import * as types from './mutations-type'

const mutations = {
  [types.SET_ADMIN_INFO] (state, info) {
    state.adminInfo = info || {}
  },
  [types.SET_SHOPTYPE] (state, list) {
    state.shopTypeList = list
  },
  [types.SET_RE_LOGIN] (state, bool) {
    state.reLogin = bool
  }
}

export default mutations
