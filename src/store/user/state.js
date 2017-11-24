import config from 'common/javascript/config'
import { _getExactAddress } from 'common/javascript/cache'

const state = {
  cityOptions: config.cityOptions,   // 省市数据
  suggestionsList: [],  // 首页输入后的推荐
  exactAddress: _getExactAddress(),  // 选择的精确地址信息
  inexactAddress: [] // 只包含省市的地址
}

export default state
