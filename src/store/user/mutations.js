import * as types from './mutations-type'

const mutations = {
  [types.SET_SUGGESTIONS_LIST] (state, list) {
    state.suggestionsList = list
  },
  [types.SET_COORDINATE] (state, [lon, lat]) {
    state.coordinate = [lon, lat]
  },
  [types.SAVE_EXACT_ADDRESS] (state, item) {
    state.exactAddress = item
  },
  [types.CLEAR_SUGGESTIONS_LIST] (state) {
    state.suggestionsList = []
  },
  [types.SET_INEXACT_CITY] (state, address) {
    state.inexactAddress = address
  },
  [types.SET_USER_INFO] (state, info) {
    state.userInfo = info || {}
  },
  [types.NOTE_KAIDIAN] (state) {
    state.noteKaidian = true
  },
  [types.CLEAR_KAIDIAN_NOTE] (state) {
    state.noteKaidian = false
  },
  [types.SET_SHOP_LIST] (state, list) {
    state.shopList = list
  },
  [types.CLEAR_SHOP_LIST] (state) {
    state.shopList = []
  },
  [types.SET_SHOP_DISHS] (state, list) {
    state.shopDishs = list
  },
  [types.SET_SHOP_DETAIL] (state, detail) {
    state.shopDetail = detail
  },
  [types.SET_CART_LIST] (state, list) {
    state.cartList = list
  },
  [types.CLEAR_CART_LIST] (state) {
    state.cartList = []
  },
  [types.SET_SHOPTYPE] (state, list) {
    state.shopTypeList = list
  },
  [types.SET_RE_LOGIN] (state, bool) {
    state.reLogin = bool
  }
}

export default mutations
