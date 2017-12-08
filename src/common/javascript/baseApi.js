import axios from 'axios'
import _jsonp from 'jsonp'
// import config from './config'
// import { encodeGeoHash } from './geohash'
// import apiList from './apiList'
axios.defaults.withCredentials = true

export function jsonp (url) {
  return new Promise((resolve, reject) => {
    _jsonp(url, (err, res) => {
      if (!err) {
        resolve(res)
      } else {
        reject(err)
      }
    })
  })
}

export function baseGET (api, params) {
  return axios({
    method: 'get',
    url: api,
    params: {
      ...params
    }
  }).then(res => res.data)
}

// export function initCity () {
//   const url = `http://api.map.baidu.com/location/ip?ak=${config.ak}`
//   return jsonp(url).then(res => {
//     return res && res.content.address_detail
//   })
// }

// export function getCity (lat, lng) {
//   const url = `http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${lat},${lng}&output=json&pois=1&ak=${config.ak}`
//   return jsonp(url).then(res => res.result)
// }

// export function locadCoordinate (location) {
//   const url = `http://api.map.baidu.com/geocoder/v2/?address=${location}&output=json&ak=${config.ak}`
//   return jsonp(url).then(res => res.result)
// }

// export function getSuggestionApi ({address, str}) {
//   const url = `http://api.map.baidu.com/place/v2/suggestion?query=${str}&region=${address}&city_limit=false&output=json&ak=${config.ak}`
//   return jsonp(url).then(res => res.result)
//   // geohash是地理位置，this.geohash = a.encode(e.latitude, e.longitude)
//   // const url = `https://www.ele.me/restapi/v2/pois?extras%5B%5D=count&geohash=${encodeGeoHash(coordinate[1], coordinate[0])}&keyword=${str}&limit=20&type=nearby`
//   // const url = 'https://www.ele.me/restapi/v2/pois'
//   // console.log(encodeGeoHash(coordinate[1], coordinate[0]))
//   // return axios.get(apiList.user.elemeSuggestions, {
//   //   withCredentials: true,
//   //   params: {
//   //     url,
//   //     keyword: str,
//   //     geohash: encodeGeoHash(coordinate[1], coordinate[0])
//   //   }
//   // }).then(res => res.data)
// }
