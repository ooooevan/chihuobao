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
