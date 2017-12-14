import config from 'common/javascript/config'
import { _getExactAddress, _getUserInfo, _getCartList, _getShopTypeList } from 'common/javascript/cache'

const state = {
  cityOptions: config.cityOptions,   // 省市数据
  suggestionsList: [],  // 首页输入后的推荐
  exactAddress: _getExactAddress(),  // 选择的精确地址信息
  inexactAddress: [], // 只包含省市的地址
  userInfo: _getUserInfo() || {},   // 用户信息
  shopList: [],    // 用户查看到的商家列表
  shopDetail: {},   // 商铺信息
  shopDishs: [],   // 商铺的菜单
  cartList: _getCartList() || [],     // 用户购物车列表
  shopTypeList: _getShopTypeList() || [],    // 商铺类型
  reLogin: false  // 判断是否重新登录，401的时候重新登录
}

export default state
