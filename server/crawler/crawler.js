const request = require('request')
const fs = require('fs')

// 这是商家列表接口
// 输入参数为经纬度和geohash
// 输出为附近的商家列表
const shopsList = `https://www.ele.me/restapi/shopping/restaurants?extras[]=activities&geohash=w7y2mfr4g2x&latitude=21.15053&limit=24&longitude=110.30151&offset=0&terminal=web`

// 这是商家信息接口
// 输入参数为商家id，位置经纬度
// 输出为该商家基本信息
const shopInfo = `https://www.ele.me/restapi/shopping/restaurant/1423546?extras[]=activities&extras[]=license&extras[]=identification&extras[]=albums&extras[]=flavors&latitude=21.15053&longitude=110.30151`

// 这是商家菜单接口
// 输入为商家id
// 输出为商家的菜单列表
const shopMenu = `https://www.ele.me/restapi/shopping/v2/menu?restaurant_id=1423546`

// 这是某个商品的评价
// 输入为food_id
// 输出为评价的数组
const simpleFoodRate = `https://www.ele.me/restapi/ugc/v2/food/ratings?food_ids[]=73871143&has_text=1&limit=999&offset=0`

// 这是商家评论，包含对应的菜品
// 输入为商家id、limit和offset
// 输出评论列表
const foodRate = `https://www.ele.me/restapi/ugc/v1/restaurant/712434/ratings?limit=10&offset=0&record_type=1`
function getData (url, target) {
  // 获取到原始数据文件， 并格式化
  request(url, (err, res, body) => {
    if (err) console.log(err)
    fs.writeFile(target, body, () => {
      fs.readFile(target, (err, data) => {
        if (err) console.log(err)
        const ddd = JSON.stringify(JSON.parse(data.toString()), null, 2)
        fs.writeFile(target, ddd, () => {
          getSomeKeys(target, `${target}_o`, () => {
            toTXT(`${target}_o`, `${target}_sql`)
          })
        })
      })
    })
  })
}

// 取部分字段
function getSomeKeys (origin, target, cb) {
  fs.readFile(origin, (err, data) => {
    if (err) console.log(err)
    data = JSON.parse(data.toString())
    let ooo
    if (typeof data.map === 'function') {
      ooo = data.map(item => {
        return {
          address: item.address,
          description: item.description,
          name: item.username,
          status: item.status,
          latitude: item.latitude,
          longitude: item.longitude,
          image_path: item.image_path,
          rating_star: item.rating_star,
          foodList: item.item_rating_list,
          rated_at: item.rated_at
        }
      })
    } else if (typeof data === 'object') {
      ooo = {
        address: data.address
      }
    }
    fs.writeFile(target, JSON.stringify(ooo, null, 2), cb)
  })
}

function toTXT (origin, target) {
  fs.readFile(origin, (err, data) => {
    if (err) console.log(err)
    data = JSON.parse(data.toString())
    let tempData = []
    if (typeof data.map === 'function') {
      tempData = data.map(item => {
        let arr = []
        for (let key in item) {
          arr.push([key, item[key]].join())
        }
        return arr
      })
    } else if (typeof data === 'object') {
      for (let key in data) {
        tempData.push([key, data[key]].join())
      }
    }
    let tarStr = ''
    tempData.forEach((item, index) => {
      tarStr += (1 + index) + '\n'
      if (typeof item.forEach === 'function') {
        item.forEach(ite => {
          tarStr += ite + '\n'
        })
      } else {
        tarStr += item + '\n'
      }
    })
    fs.writeFile(target, tarStr)
  })
}

// getData(foodRate, 'foodRate')

// getData(shopInfo, 'shopInfo')  // 这个好像是上面列表的一个

// getData(shopMenu, 'shopMenu')
getData(shopsList, 'shopsList')   // 商家列表
