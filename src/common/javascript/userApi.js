import axios from 'axios'
import { jsonp } from './baseApi'
import config from './config'
import ALLAPI from './apiList'
const API = ALLAPI.user

// import { encodeGeoHash } from './geohash'
// import apiList from './apiList'
axios.defaults.withCredentials = true

export function initCity () {
  const url = `http://api.map.baidu.com/location/ip?ak=${config.ak}`
  return jsonp(url).then(res => {
    return res && res.content.address_detail
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

export function _login (phone, password) {
  return axios({
    method: 'post',
    url: API.login,
    data: {
      phone,
      password
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

export function _register (phone, password, code) {
  return axios({
    method: 'post',
    url: API.register,
    data: {
      phone,
      password,
      code
    }
  }).then(res => res.data)
}

export function _logOutApi () {
  return axios({
    method: 'post',
    url: API.logOut
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
