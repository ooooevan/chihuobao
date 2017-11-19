import * as types from './mutations-type'

const mutations = {
  [types.SET_SUGGESTIONS_LIST] (state, list) {
    state.suggestionsList = list
  },
  [types.SET_COORDINATE] (state, [lon, lat]) {
    state.coordinate = [lon, lat]
  },
  [types.SAVE_ADDRESS] (state, item) {
    state.address = item
  }
}

export default mutations
