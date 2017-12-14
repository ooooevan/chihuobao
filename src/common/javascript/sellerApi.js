import { baseGET, basePOST } from './baseApi'
// import config from './config'
import ALLAPI from './apiList'
const API = ALLAPI.seller

export function _getSellerOrder (shopId, pageNum, type) {
  return baseGET(API.getSellerOrder, { shopId, pageNum, type })
}

export function _handleOrder (shopId, shopOrderId, type) {
  return basePOST(API.handleOrder, { shopId, shopOrderId, type })
}

export function _initInfo (shopId) {
  return baseGET(API.initInfo, { shopId })
}

export function _getAllDish (shopId) {
  return baseGET(API.getAllDish, { shopId })
}

export function _modifyDish (shopId, dishId, dishPrice, dishAbstract, dishType) {
  return basePOST(API.modifyDish, { shopId, dishId, dishPrice, dishAbstract, dishType })
}

export function _deleteDish (shopId, dishId) {
  return basePOST(API.deleteDish, { shopId, dishId })
}

export function _addDish (shopId, dishName, dishPrice, dishType, dishAbstract, dishImage) {
  return basePOST(API.addDish, { shopId, dishName, dishPrice, dishType, dishAbstract, dishImage })
}
// 修改商铺信息，字段较多
export function _modifyShopInfo (info) {
  const { shopId, shopName, shopLogo, shopAbstract, shopLocation, shopAnnouncement, shopPhone, shopWorkTime, shopDeliveryCost, shopStartDelivery } = info
  return basePOST(API.modifyShopInfo, { shopId, shopName, shopLogo, shopAbstract, shopLocation, shopAnnouncement, shopPhone, shopWorkTime, shopDeliveryCost, shopStartDelivery })
}

export function _getRateList (shopId, pageNum) {
  return baseGET(API.getRateList, { shopId, pageNum })
}

export function _isNewOrder (shopId) {
  return baseGET(API.isNewOrder, { shopId })
}

export function _getFoodType (shopId) {
  return baseGET(API.getFoodType, { shopId })
}
