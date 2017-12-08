import storage from 'good-storage'

const addressKey = '__exactAddress__'
const userKey = '__user__'
const sellerKey = '__seller__'
const cartKey = '__cartList__'

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
  storage.set(sellerKey, info)
  return info
}
export function _clearSellerInfo () {
  storage.remove(sellerKey)
  return null
}
export function _hasSellerInfo () {
  return storage.has(sellerKey)
}
export function _getSellerInfo () {
  return storage.get(sellerKey)
}

// 购物车信息
export function _clearCartList () {
  storage.remove(cartKey)
  return null
}
export function _hashCartList () {
  return storage.has(cartKey)
}
export function _getCartList () {
  return storage.get(cartKey) || []
}
export function _addCartNum (item) {
  let list = _getCartList()
  let temp = list.find(ite => (ite.dishId === item.dishId))
  if (temp) {
    temp.num++
  } else {
    item.num = 1
    list.push(item)
  }
  storage.set(cartKey, list)
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
  storage.set(cartKey, list)
  return list
}
