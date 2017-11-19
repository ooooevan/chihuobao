import config from 'assets/javascript/config'

const state = {
  cityOptions: config.cityOptions,   // 省市数据
  suggestionsList: [],  // 首页输入后的推荐
  coordinate: [],   // 初始化保存经纬度
  address: {}  // 选择的定位地址信息
}

export default state
