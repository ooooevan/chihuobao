import axios from 'axios'
// import { jsonp } from './baseApi'
// import config from './config'
import ALLAPI from './apiList'
const API = ALLAPI.seller

export function _getSellerOrder (shopId, pageNum, type) {
  return axios({
    method: 'get',
    url: API.getSellerOrder,
    params: {
      shopId,
      pageNum,
      type
    }
  }).then(res => res.data)
}

export function _handleOrder (shopId, shopOrderId, type) {
  return axios({
    method: 'post',
    url: API.handleOrder,
    data: {
      shopId,
      shopOrderId,
      type
    }
  }).then(res => res.data)
}

export function _initInfo (shopId) {
  return axios({
    method: 'get',
    url: API.initInfo,
    params: {
      shopId
    }
  }).then(res => res.data)
}

export function _getAllDish (shopId) {
  return axios({
    method: 'get',
    url: API.getAllDish,
    params: {
      shopId
    }
  }).then(res => res.data)
}

export function _modifyDish (shopId, dishId, dishPrice, dishAbstract, dishType) {
  return axios({
    method: 'post',
    url: API.modifyDish,
    data: {
      shopId,
      dishId,
      dishPrice,
      dishAbstract,
      dishType
    }
  }).then(res => res.data)
}

export function _deleteDish (shopId, dishId) {
  return axios({
    method: 'post',
    url: API.deleteDish,
    data: {
      shopId,
      dishId
    }
  }).then(res => res.data)
}

export function _addDish (shopId, dishName, dishPrice, dishType, dishAbstract, dishImage) {
  return axios({
    method: 'post',
    url: API.addDish,
    data: {
      shopId,
      dishName,
      dishImage,
      dishPrice,
      dishType,
      dishAbstract
    }
  }).then(res => res.data)
}
// 修改商铺信息，字段较多
export function _modifyShopInfo (info) {
  const { shopId, shopName, shopLogo, shopAbstract, shopLocation, shopAnnouncement, shopPhone, shopWorkTime, shopDeliveryCost, shopStartDelivery } = info
  return axios({
    method: 'post',
    url: API.modifyShopInfo,
    data: {
      shopId,
      shopName,
      shopLogo,
      shopAbstract,
      shopLocation,
      shopAnnouncement,
      shopPhone,
      shopWorkTime,
      shopStartDelivery,
      shopDeliveryCost
    }
  }).then(res => res.data)
}

export function _getRateList (shopId, pageNum) {
  return axios({
    method: 'get',
    url: API.getRateList,
    params: {
      shopId,
      pageNum
    }
  }).then(res => res.data)
}

export function _isNewOrder (shopId) {
  return axios({
    method: 'get',
    url: API.isNewOrder,
    params: {
      shopId
    }
  }).then(res => res.data)
}
