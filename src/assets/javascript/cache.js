import storage from 'good-storage'

const addressKey = '__address__'

export function _saveAddress (item) {
  storage.set(addressKey, item)
  return item
}
