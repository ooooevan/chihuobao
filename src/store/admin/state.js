// import config from 'common/javascript/config'
import { _getAdminInfo, _getShopTypeList } from 'common/javascript/cache'

const state = {
  adminInfo: _getAdminInfo() || {},   // 管理员信息
  shopTypeList: _getShopTypeList() || []   // 商家类型数据
}

export default state
