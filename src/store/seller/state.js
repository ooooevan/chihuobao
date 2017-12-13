// import config from 'common/javascript/config'
import { _getSellerInfo, _getShopTypeList } from 'common/javascript/cache'

const state = {
  newOrderNum: 0,   // 新订单数
  sellerInfo: _getSellerInfo() || {},   // 商家基本信息
  shopTypeList: _getShopTypeList(),   // 商家类型数据
  foodTypeList: []   // 商品类型数据
}

export default state
