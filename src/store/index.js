import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import seller from './seller'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const debug = process.env_NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    seller
  },
  // strict: debug,
  plugins: debug ? [createLogger()] : []
})
