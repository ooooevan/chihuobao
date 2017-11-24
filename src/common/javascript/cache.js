import storage from 'good-storage'

const addressKey = '__exactAddress__'

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
