import axios from 'axios'
import { jsonp, basePOST, baseGET } from './baseApi'
import config from './config'
import store from '../../store'
import ALLAPI from './apiList'
const API = ALLAPI.user
axios.defaults.withCredentials = true

export function _initCity () {
  const url = `http://api.map.baidu.com/location/ip?ak=${config.ak}&coor=gcj02`
  return jsonp(url).then(res => {
    return res && res.content
  })
}

export function getCity (lat, lng) {
  const url = `http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${lat},${lng}&output=json&pois=1&ak=${config.ak}`
  return jsonp(url).then(res => res.result)
}

export function locadCoordinate (location) {
  const url = `http://api.map.baidu.com/geocoder/v2/?address=${location}&output=json&ak=${config.ak}`
  return jsonp(url).then(res => res.result)
}

export function getSuggestionApi ({address, str}) {
  const url = `http://api.map.baidu.com/place/v2/suggestion?query=${str}&region=${address}&city_limit=false&output=json&ak=${config.ak}`
  return jsonp(url).then(res => res.result)
}

export function _login (phone, password, loginType) {
  return basePOST(API.login, { phone, password, loginType })
}

export function _sendCode (phone) {
  return basePOST(API.sendCode, { phone })
}

export function _register (phone, password, checkCode) {
  return basePOST(API.register, { phone, password, checkCode })
}

export function _reset (phone, password, checkCode) {
  return basePOST(API.reset, { phone, password, checkCode })
}

export function _logOutApi (userId) {
  return basePOST(API.logOut, { userId })
}

export function _initInfo (userId) {
  return basePOST(API.initInfo, { userId })
}

export function _modifyInfo (info) {
  return basePOST(API.modifyInfo, info)
}

// 商铺列表，包括搜索
export function _getShopList (longitude, latitude, pageNum, shopType, name) {
  return baseGET(API.getShopList, { longitude, latitude, pageNum, shopType, name })
}

export function _getInfoByShopId (shopId) {
  return baseGET(API.getInfoByShopId, { shopId })
}

export function _getCommentByDishId (shopId, dishId) {
  return baseGET(API.getCommentByDishId, { shopId, dishId })
}

export function _apply (userId, shopName, shopAbstract, identificationNum, shopTypeCode, shopLocation, shopLogo, identificationPic, shopAuthImages, shopLongitude, shopLatitude) {
  return basePOST(API.applyShop, { userId, shopName, shopAbstract, identificationNum, shopTypeCode, shopLocation, shopLogo, identificationPic, shopAuthImages, shopLongitude, shopLatitude })
}

export function _getUserOrder (userId, page, orderType) {
  return basePOST(API.getUserOrder, { userId, page, orderType })
}

export function _getSopPhone (shopId) {
  return basePOST(API.getShopPhone, { shopId })
}

export function _deleteOrder (userOrderId) {
  return basePOST(API.deleteOrder, { userOrderId })
}

export function _finishOrder (userOrderId) {
  return basePOST(API.finishOrder, { userOrderId })
}

export function _rate (dishId, level, commend, userId, userOrderId, shopId) {
  level = level || 4
  commend = commend || ''
  return basePOST(API.rateOrder, { dishId, level, commend, userId, userOrderId, shopId })
}

export function _getShopType () {
  return basePOST(API.getShopType, {})
}

export function _newOrder (shopId, shopName, userId, cartList, amount, remarks, acceptAddress) {
  // const dishs = cartList
  // return basePOST(API.newOrder, { shopId, shopName, userId, dishs, amount, remarks, acceptAddress })

  // java后端要接收List<>，所以这里把对象数组的cartList转化
  let dishs = {}
  cartList.forEach((item, index) => {
    for (let key in item) {
      if (!dishs[`dishs[${index}]`]) {
        dishs[`dishs[${index}]`] = {}
      }
      dishs[`dishs[${index}]`][key] = item[key]
    }
  })
  let temp = {}
  let result = {}
  for (let i in dishs) {
    for (let j in dishs[i]) {
      if (!temp[i]) temp[i] = {}
      result[`${i}.${j}`] = dishs[i][j]
    }
  }
  return axios({
    method: 'post',
    url: API.newOrder,
    headers: {
      'content-Type': 'application/x-www-form-urlencoded'
    },
    data: config.toFormData({
      shopId,
      shopName,
      userId,
      ...result,
      amount,
      remarks,
      acceptAddress
    })
  }).then(res => res.data)
  .catch(() => {
    store.dispatch('user/reLogin')
  })
}
export function _payOrder (userOrdersId) {
  return basePOST(API.payOrder, { userOrdersId })
}

export function _handleIsPay (userOrdersId) {
  return basePOST(API.handleIsPay, { userOrdersId })
}

export function _getApplyStatus (userId) {
  return basePOST(API.getApplyStatus, { userId })
}
