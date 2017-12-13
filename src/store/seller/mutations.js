import * as types from './mutations-type'

const mutations = {
  [types.SET_NEW_ORDER_NUM] (state, num) {
    state.newOrderNum = num
  },
  [types.CLEAR_NEW_ORDER_NUM] (state) {
    state.newOrderNum = 0
  },
  [types.SET_SELLER_INFO] (state, info) {
    state.sellerInfo = info || {}
  },
  [types.SET_SHOPTYPE] (state, list) {
    state.shopTypeList = list
  },
  [types.SET_FOODTYPE] (state, list) {
    state.foodTypeList = list
  }
}

export default mutations
