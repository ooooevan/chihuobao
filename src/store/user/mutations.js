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
  }
}

export default mutations
