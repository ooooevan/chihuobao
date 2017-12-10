import * as types from './mutations-type'

const mutations = {
  [types.SET_ADMIN_INFO] (state, info) {
    state.adminInfo = info || {}
  },
  [types.SET_SHOPTYPE] (state, list) {
    state.shopTypeList = list
  }
}

export default mutations
