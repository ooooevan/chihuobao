import storage from 'good-storage'

const addressKey = '__exactAddress__'
const userKey = '__user__'

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
