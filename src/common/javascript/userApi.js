import axios from 'axios'
import { jsonp } from './baseApi'
import config from './config'
import ALLAPI from './apiList'
const API = ALLAPI.user

// import { encodeGeoHash } from './geohash'
// import apiList from './apiList'
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
  return axios({
    method: 'post',
    url: API.login,
    data: {
      phone,
      password,
      loginType
    }
  }).then(res => res.data)
}

export function _sendCode (phone) {
  return axios({
    method: 'post',
    url: API.sendCode,
    data: {
      phone
    }
  }).then(res => res.data)
}

export function _register (phone, password, checkCode) {
  return axios({
    method: 'post',
    url: API.register,
    data: {
      phone,
      password,
      checkCode
    }
  }).then(res => res.data)
}

export function _reset (phone, password, checkCode) {
  return axios({
    method: 'post',
    url: API.reset,
    data: {
      phone,
      password,
      checkCode
    }
  }).then(res => res.data)
}

export function _logOutApi (userId) {
  return axios({
    method: 'post',
    url: API.logOut,
    data: {
      userId
    }
  }).then(res => res.data)
}

export function _initInfo (userId) {
  return axios({
    method: 'post',
    url: API.initInfo,
    data: {
      userId
    }
  }).then(res => res.data)
}

export function _modifyInfo (info) {
  return axios({
    method: 'post',
    url: API.modifyInfo,
    data: {
      ...info
    }
  }).then(res => res.data)
}

// 商铺列表，包括搜索
export function _getShopList (longitude, latitude, pageNum, shopType, name) {
  return axios({
    method: 'get',
    url: API.getShopList,
    params: {
      longitude,
      latitude,
      pageNum,
      shopType,
      name
    }
  }).then(res => res.data)
}

export function _getInfoByShopId (shopId) {
  return axios({
    method: 'get',
    url: API.getInfoByShopId,
    params: {
      shopId
    }
  }).then(res => res.data)
}

export function _getCommentByDishId (shopId, dishId) {
  return axios({
    method: 'get',
    url: API.getCommentByDishId,
    params: {
      shopId,
      dishId
    }
  }).then(res => res.data)
}

export function _apply (userId, shopName, shopAbstract, identificationNum, shopTypeCode, shopLocation, shopLogo, identificationPic, shopAuthImages, shopLongitude, shopLatitude) {
  return axios({
    method: 'post',
    url: API.applyShop,
    data: {
      userId,
      shopName,
      shopAbstract,
      identificationNum,
      shopTypeCode,
      shopLocation,
      shopLogo,
      identificationPic,
      shopAuthImages,
      shopLongitude,
      shopLatitude
    }
  }).then(res => res.data)
}

export function _getUserOrder (userId, page, orderType) {
  return axios({
    method: 'post',
    url: API.getUserOrder,
    data: {
      userId,
      page,
      orderType
    }
  }).then(res => res.data)
}

// export function _cancelOrder (userOrderId) {
//   return axios({
//     method: 'post',
//     url: API.cancelOrder,
//     data: {
//       userOrderId
//     }
//   }).then(res => res.data)
// }

export function _getSopPhone (shopId) {
  return axios({
    method: 'post',
    url: API.getShopPhone,
    data: {
      shopId
    }
  }).then(res => res.data)
}

export function _deleteOrder (userOrderId) {
  return axios({
    method: 'post',
    url: API.deleteOrder,
    data: {
      userOrderId
    }
  }).then(res => res.data)
}

export function _finishOrder (userOrderId) {
  return axios({
    method: 'post',
    url: API.finishOrder,
    data: {
      userOrderId
    }
  }).then(res => res.data)
}

export function _rate (dishId, level, commend, userId, userOrderId, shopId) {
  return axios({
    method: 'post',
    url: API.rateOrder,
    data: {
      dishId,
      level: level || 4,
      commend: commend || '',
      userId,
      userOrderId,
      shopId
    }
  }).then(res => res.data)
}

export function _getShopType () {
  return axios({
    method: 'post',
    url: API.getShopType

  }).then(res => res.data)
}
