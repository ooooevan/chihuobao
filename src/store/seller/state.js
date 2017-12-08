// import config from 'common/javascript/config'
import { _getSellerInfo } from 'common/javascript/cache'

const state = {
  newOrderNum: 0,   // 新订单数
  sellerInfo: _getSellerInfo() || {}   // 商家基本信息
}

export default state
