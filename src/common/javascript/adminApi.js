import { basePOST1, baseGET, baseGET2 } from './baseApi'
// import config from './config'
import ALLAPI from './apiList'
const API = ALLAPI.admin

export function _login (adminName, adminPwd) {
  return basePOST1(API.login, { adminName, adminPwd })
}

export function _addAdmin (adminName, adminPwd) {
  return basePOST1(API.addAdmin, { adminName, adminPwd })
}

export function _getAdminList () {
  return baseGET(API.getAdminList)
}

export function _delAdmin (adminName) {
  return basePOST1(API.delAdmin, { adminName })
}

export function _adminConfig (adminName, foodTypeMp, shopMp, shopTypeMp) {
  return basePOST1(API.adminConfig, { adminName, foodTypeMp, shopMp, shopTypeMp })
}

export function _getShopsList (pageNum, property, keyword) {
  return baseGET(API.getShopsList, { pageNum, property, keyword })
}

export function _getShopInfoById (shopId) {
  return baseGET2(API.getShopInfoById, shopId)
}

export function _freeze (shopId, type) {
  return basePOST1(API.freeze, { shopId, type })
}

export function _getApplyList (pageNum) {
  return baseGET(API.getApplyList, { pageNum })
}

export function _getApplyInfoById (shopApplyId) {
  return baseGET2(API.getApplyInfoById, shopApplyId)
}

export function _auditApply (shopApplyId, result) {
  return basePOST1(API.auditApply, {shopApplyId, result})
}

export function _getShopTypeList () {
  return baseGET(API.getShopTypeList)
}

export function _getFoodTypeList () {
  return baseGET(API.getFoodTypeList)
}

export function _delShopTags (shopTypeId) {
  return basePOST1(API.delShopType, { shopTypeId })
}

export function _delFoodTags (foodTypeId) {
  return basePOST1(API.delFoodType, { foodTypeId })
}

export function _addShopType (typeDes) {
  return basePOST1(API.addShopType, { typeDes })
}

export function _addFoodType (typeDes) {
  return basePOST1(API.addFoodType, { typeDes })
}

export function _getUserList (pageNum, keyword, property) {
  return baseGET(API.getUserList, { pageNum, keyword, property })
}
