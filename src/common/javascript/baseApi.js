import axios from 'axios'
import _jsonp from 'jsonp'
import config from './config'
import store from '../../store'
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

export function baseGET2 (api, param) {
  return axios({
    method: 'get',
    url: `${api}/${param}`
  }).then(res => res.data)
}

export function basePOST (api, params) {
  return axios({
    method: 'post',
    url: api,
    headers: {
      'content-Type': 'application/x-www-form-urlencoded'
    },
    data: config.toFormData({
      ...params
    })
  }).then(res => {
    return res.data
  }).catch(() => {
    store.dispatch('user/reLogin')
  })
}
export function basePOST1 (api, params) {
  return axios({
    method: 'post',
    url: api,
    headers: {
      'content-Type': 'application/x-www-form-urlencoded'
    },
    data: config.toFormData({
      ...params
    })
  }).then(res => {
    return res.data
  }).catch(() => {
    store.dispatch('admin/reLogin')
  })
}
