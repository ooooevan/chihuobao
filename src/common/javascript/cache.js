import storage from 'good-storage'

const addressKey = '__exactAddress__'
const userKey = '__user__'
const sellerKey = '__seller__'
const cartKey = '__cartList__'
const shopTypeKey = '__shopType__'
const adminKey = '__admin__'

// 定位信息
export function _saveExactAddress (item) {
  storage.set(addressKey, item)
  return item
}
export function _clearExactAddress () {
  storage.remove(addressKey)
  return null
}
export function _hashExactAddress () {
  return storage.has(addressKey)
}
export function _getExactAddress () {
  return storage.get(addressKey)
}
// 用户信息
export function _saveUserInfo (info) {
  storage.set(userKey, info)
  return info
}
export function _clearUserInfo () {
  storage.remove(userKey)
  return null
}
export function _hasUserInfo () {
  return storage.has(userKey)
}
export function _getUserInfo () {
  return storage.get(userKey)
}

// 商家信息
export function _saveSellerInfo (info) {
  storage.session.set(sellerKey, info)
  return info
}
export function _clearSellerInfo () {
  storage.session.remove(sellerKey)
  return null
}
export function _hasSellerInfo () {
  return storage.session.has(sellerKey)
}
export function _getSellerInfo () {
  return storage.session.get(sellerKey)
}

// 购物车信息
export function _clearCartList () {
  storage.session.remove(cartKey)
  return []
}
export function _hashCartList () {
  return storage.session.has(cartKey)
}
export function _getCartList () {
  return storage.session.get(cartKey) || []
}
export function _addCartNum (item) {
  let list = _getCartList()
  if (list[0] && list[0].shopId !== item.shopId) {
    // 不是一个商家，清空上一家的购物车
    list = _clearCartList()
  }

  let temp = list.find(ite => (ite.dishId === item.dishId))
  if (item.dishName === '配送费' && temp) {
    // 同一家多次点击支付，防止生成多个配送费。
    temp.num = 1
  } else if (temp) {
    temp.num++
  } else {
    item.num = 1
    list.push(item)
  }
  storage.session.set(cartKey, list)
  return list
}
export function _subCartNum (item) {
  let list = _getCartList()
  let temp = list.find(ite => (ite.dishId === item.dishId))
  if (temp.num === 1) {
    let index = list.findIndex(ite => (ite === temp))
    list.splice(index, 1)
  } else {
    temp.num--
  }
  storage.session.set(cartKey, list)
  return list
}
export function _getShopTypeList () {
  return storage.get(shopTypeKey)
}
export function _setShopTypeList (list) {
  storage.set(shopTypeKey, list)
  return list
}

// 管理员
export function _saveAdminInfo (info) {
  storage.session.set(adminKey, info)
  return info
}
export function _clearAdminInfo () {
  storage.session.remove(adminKey)
  return {}
}
export function _hasAdminInfo () {
  return storage.session.has(adminKey)
}
export function _getAdminInfo () {
  return storage.session.get(adminKey) || {}
}
