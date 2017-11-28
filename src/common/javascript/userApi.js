import axios from 'axios'
import { jsonp } from './baseApi'
import config from './config'
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

export function _login (phone, pass) {
  return axios.get()
}
