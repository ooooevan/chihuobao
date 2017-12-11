// import axios from 'axios'
import { basePOST, baseGET, baseGET2 } from './baseApi'
// import config from './config'
import ALLAPI from './apiList'
const API = ALLAPI.admin

export function _login (adminName, adminPwd) {
  return basePOST(API.login, { adminName, adminPwd })
}

export function _addAdmin (adminName, adminPwd) {
  return basePOST(API.addAdmin, { adminName, adminPwd })
}

export function _getAdminList () {
  return baseGET(API.getAdminList)
}

export function _delAdmin (adminName) {
  return basePOST(API.delAdmin, { adminName })
}

export function _adminConfig (adminName, foodTypeMp, shopMp, shopTypeMp) {
  return basePOST(API.adminConfig, { adminName, foodTypeMp, shopMp, shopTypeMp })
}

export function _getShopsList (pageNum, property, keyword) {
  return baseGET(API.getShopsList, { pageNum, property, keyword })
}

export function _getShopInfoById (shopId) {
  return baseGET2(API.getShopInfoById, shopId)
}

export function _freeze (shopId, type) {
  return basePOST(API.freeze, { shopId, type })
}

export function _getApplyList (pageNum) {
  return baseGET(API.getApplyList, { pageNum })
}

export function _getApplyInfoById (shopApplyId) {
  return baseGET2(API.getApplyInfoById, shopApplyId)
}

export function _auditApply (shopApplyId, result) {
  return basePOST(API.auditApply, {shopApplyId, result})
}

export function _getShopTypeList () {
  return baseGET(API.getShopTypeList)
}

export function _getFoodTypeList () {
  return baseGET(API.getFoodTypeList)
}

export function _delShopTags (shoppTypeId) {
  return basePOST(API.delShopType, { shoppTypeId })
}

export function _delFoodTags (foodTypeId) {
  return basePOST(API.delFoodType, { foodTypeId })
}

export function _addShopType (type) {
  return basePOST(API.addShopType, { type })
}

export function _addFoodType (type) {
  return basePOST(API.addFoodType, { type })
}
