import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'
import moment from 'moment'
Vue.use(ElementUI)
Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, '$moment', {value: moment})

/* eslint-disable */
//                   _ooOoo_ 
//                  o8888888o 
//                  88" . "88 
//                  (| -_- |) 
//                   O\ = /O 
//               ____/`---'\____ 
//               . ' \\| |// `. 
//              / \\||| : |||// \ 
//            / _||||| -:- |||||- \ 
//              | | \\\ - /// | | 
//            | \_| ''\---/'' | | 
//             \ .-\__ `-` ___/-. / 
//          ___`. .' /--.--\ `. . __ 
//       ."" '< `.___\_<|>_/___.' >'"". 
//      | | : `- \`.;`\ _ /`;.`/ - ` : | | 
//        \ \ `-. \_ __\ /__ _/ .-` / / 
// ======`-.____`-.___\_____/___.-`____.-'====== 
//                   `=---=' 
// 

// ............................................. 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
