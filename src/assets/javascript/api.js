import axios from 'axios'
import _jsonp from 'jsonp'
import config from './config'
import { encodeGeoHash } from './geohash'
axios.defaults.withCredentials = true

function jsonp (url) {
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

export function getCity (lat, lng) {
  const url = `http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${lat},${lng}&output=json&pois=1&ak=${config.ak}`
  return jsonp(url).then(res => res.result)
}

export function getSuggestionApi ({coordinate, str}) {
  // geohash是地理位置，this.geohash = a.encode(e.latitude, e.longitude)
  // const url = `https://www.ele.me/restapi/v2/pois?extras%5B%5D=count&geohash=${encodeGeoHash(coordinate[1], coordinate[0])}&keyword=${str}&limit=20&type=nearby`
  const url = 'https://www.ele.me/restapi/v2/pois'
  // 这里调用webpack-dev-server/lib/Server.js  90行
  return axios.get('/elemeSuggestions', {
    params: {
      url,
      keyword: str,
      geohash: encodeGeoHash(coordinate[1], coordinate[0])
    }
  }).then(res => res.data)
}
