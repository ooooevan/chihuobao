const mongoose = require('mongoose')
const User = mongoose.model('User')
const Shop = mongoose.model('Shop')
// const Menu = mongoose.model('MenuModel')
const DishType = mongoose.model('DishType')
const ShopType = mongoose.model('ShopType')
const Admin = mongoose.model('Admin')
const ShopApply = mongoose.model('ShopApply')
// const request = require('request')
const Session = require('../common/session')
// const config = require('../../config')
// const { registerName } = require('../common/utils')
const MapMsg = require('./dataMapping').codeToMessage
const shopApplyPerPage = 8
const shopPerPage = 8
const userPerPage = 8

exports.needSignIn = async (ctx, next) => {
  if (!ctx.session.db) {
    ctx.throw(401)
  } else {
    await next()
  }
}
exports.login = async ctx => {
  const { adminName, adminPwd } = ctx.request.body
  let admin
  let match
  try {
    admin = await Admin.findOne({admin_name: adminName}).exec()
    if (admin) {
      match = await admin.comparePassword(adminPwd, admin.admin_pwd)
    }
  } catch (err) {
    console.log(err)
  }
  if (match) {
    ctx.session = new Session(admin)
    ctx.body = {
      code: 1,
      data: {
        adminName: admin.admin_name,
        shopMp: admin.shop_mp,
        shopTypeMp: admin.shop_type_mp,
        foodTypeMp: admin.food_type_mp,
        flagSuper: admin.is_super
      }
    }
  } else {
    ctx.body = {
      code: 0,
      message: MapMsg[4]
    }
  }
}

exports.getAdminList = async ctx => {
  const list = await Admin.find({}).exec()
  ctx.body = {
    code: 1,
    data: {
      list: list.map(item => ({
        adminName: item.admin_name,
        adminPwd: item.admin_pwd,
        shopMp: item.shop_mp,
        shopTypeMp: item.shop_type_mp,
        foodTypeMp: item.food_type_mp,
        flagSuper: item.is_super
      }))
    }
  }
}

exports.addition = async ctx => {
  const { adminName, adminPwd } = ctx.request.body
  let admin
  try {
    admin = await Admin.create({admin_name: adminName, admin_pwd: adminPwd})
    if (admin) {
      ctx.body = {
        code: 1
      }
    } else {
      ctx.body = {
        code: 0
      }
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      data: err
    }
  }
}

exports.deletion = async ctx => {
  const { adminName } = ctx.request.body
  try {
    await Admin.remove({admin_name: adminName})
    ctx.body = {
      code: 1
    }
  } catch (err) {
    ctx.body = {
      code: 1,
      data: err
    }
  }
}

exports.configuration = async ctx => {
  const { adminName, foodTypeMp, shopMp, shopTypeMp } = ctx.request.body
  let admin
  try {
    admin = await Admin.findOne({admin_name: adminName}).exec()
    if (admin) {
      admin.shop_mp = shopMp
      admin.food_type_mp = foodTypeMp
      admin.shop_type_mp = shopTypeMp
    }
    await admin.save()
    ctx.body = {
      code: 1
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      data: err
    }
  }
}

exports.getShopsList = async ctx => {
  // property是筛选，可为shopId、userId、shopName，keyword为关键字
  let { pageNum, property, keyword } = ctx.request.query
  let totalPage = 1
  let shopList = []
  try {
    if (!keyword) {
      // 只有页数，不搜索
      totalPage = Math.ceil(await Shop.count({}) / shopPerPage)
      shopList = await Shop.find({})
                                  .skip((pageNum - 1) * shopPerPage)
                                  .limit(shopPerPage)
                                  .exec()
    } else if (!property) {
      // 有keyword，没有筛选类型,需要每一种的查找
      shopList = shopList.concat(await Shop.find({shop_name: new RegExp(keyword, 'igm')}))
      shopList = shopList.concat(await Shop.find({user_id: keyword}))
      shopList = shopList.concat(await Shop.find({_id: keyword}))
      totalPage = Math.ceil(shopList.length / shopPerPage)
      shopList = shopList.splice((pageNum - 1) * shopPerPage, shopPerPage)
    } else {
      // 有指定类型筛选
      if (property === 'shopId') property = '_id'
      if (property === 'userId') property = 'user_id'
      if (property === 'shopName') property = 'shop_name'
      shopList = shopList.concat(await Shop.find({[property]: new RegExp(keyword, 'igm')}))
      totalPage = shopList.length
      shopList = shopList.splice((pageNum - 1) * shopPerPage, shopPerPage)
    }
  } catch (err) {
    console.log(err)
  }
  ctx.body = {
    code: 1,
    data: {
      pageNum,
      pages: totalPage,
      list: shopList.map(item => ({
        shopId: item._id,
        userId: item.user_id,
        shopName: item.shop_name,
        shopPhone: item.shop_phone,
        shopLocation: item.shop_location,
        shopStatus: item.shop_status
      }))
    }
  }
}

exports.getShopInfoById = async ctx => {
  const { shopId } = ctx.params
  try {
    const shop = await Shop.findOne({_id: shopId}).exec()
    ctx.body = {
      code: 1,
      data: {
        shopId: shop._id,
        userId: shop.user_id,
        shopName: shop.shop_name,
        shopLogo: shop.shop_logo,
        shopAbstract: shop.shop_abstract,
        shopLocation: shop.shop_location,
        shopAnnouncement: shop.shop_announcement,
        shopStatus: shop.shop_status, // 商铺状态
        shopPhone: shop.shop_phone, // 商铺联系方式
        shopWorkTime: shop.shop_work_time, // 商铺营业时间
        shopDeliveryCost: shop.shop_delivery_cost, // 商铺配送费
        shopStartDelivery: shop.shop_start_delivery, // 商铺起送价
        shopStores_images: shop.shop_stores_images, // 商铺门店照
        shopDetail_images: shop.shop_detail_images, // 商铺简介照
        shopLongitude: shop.shop_longitude, // 商铺经度
        shopLatitude: shop.shop_latitude // 商铺纬度
      }
    }
  } catch (err) {
    ctx.body = {
      code: 1,
      data: {}
    }
  }
}

exports.freezeShop = async ctx => {
  const { shopId, type } = ctx.request.body
  try {
    let shop = await Shop.findOne({_id: shopId}).exec()
    if (type === 'freeze') shop.shop_status = 3
    if (type === 'unfreeze') shop.shop_status = 1
    await shop.save()
    ctx.body = {
      code: 1
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      data: err
    }
  }
}

exports.getApplyList = async ctx => {
  const { pageNum } = ctx.request.query
  // 返回状态为未审核的申请
  const totalPage = Math.ceil(await ShopApply.count({status: 0}) / shopApplyPerPage)
  const applyList = await ShopApply.find({status: 0})
                            .skip((pageNum - 1) * shopApplyPerPage)
                            .limit(shopApplyPerPage)
                            .exec()
  ctx.body = {
    code: 1,
    data: {
      pageNum,
      pages: totalPage,
      list: applyList.map(item => ({
        shopApplyId: item._id,
        userId: item.user_id,
        identificationNum: item.identification_num,
        shopName: item.shop_name,
        shopLocation: item.shop_location
      }))
    }
  }
}

exports.getApplyInfoById = async ctx => {
  const { shopApplyId } = ctx.params
  let info
  try {
    info = await ShopApply.findOne({_id: shopApplyId}).exec()
    ctx.body = {
      code: 1,
      data: {
        shopApplyId: info._id,
        userId: info.user_id,
        identificationNum: info.identification_num,
        identificationPic: info.identification_pic,
        shopName: info.shop_name,
        shopLogo: info.shop_logo,
        shopAbstract: info.shop_abstract,
        shopLocation: info.shop_location,
        shopAuthImages: info.shop_auth_images
      }
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      data: err
    }
  }
}

exports.auditApply = async ctx => {
  // 1通过，2不通过
  const { shopApplyId, result } = ctx.request.body
  let apply
  try {
    apply = await ShopApply.findOne({_id: shopApplyId}).exec()
    apply.status = result
    // 通过就建shop表
    if (+result === 1) {
      Shop.create({
        user_id: apply.user_id,
        identification_num: apply.identification_num,
        identification_pic: apply.identification_pic,
        shop_name: apply.shop_name,
        shop_logo: apply.shop_logo,
        shop_abstract: apply.shop_abstract,
        shop_location: apply.shop_location,
        shop_stores_images: apply.shop_auth_images,
        shop_type: apply.shop_type,
        shop_longitude: apply.shop_longitude,
        shop_latitude: apply.shop_latitude
      })
    }
    await apply.save()
    ctx.body = {
      code: 1
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      data: err
    }
  }
}

exports.getShopTypeList = async ctx => {
  const types = await ShopType.find({}).exec()
  ctx.body = {
    code: 1,
    data: {
      list: types.map(item => ({
        shopTypeId: item._id,
        typeDes: item.type
      }))
    }
  }
}

exports.getFoodTypeList = async ctx => {
  const types = await DishType.find({}).exec()
  ctx.body = {
    code: 1,
    data: {
      list: types.map(item => ({
        foodTypeId: item._id,
        typeDes: item.type
      }))
    }
  }
}

exports.delShopType = async ctx => {
  const { shopTypeId } = ctx.request.body
  try {
    await ShopType.remove({_id: shopTypeId})
    ctx.body = {
      code: 1
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      data: err
    }
  }
}

exports.delFoodType = async ctx => {
  const { foodTypeId } = ctx.request.body
  try {
    await DishType.remove({_id: foodTypeId})
    ctx.body = {
      code: 1
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      data: err
    }
    console.log(err)
  }
}

exports.addFoodType = async ctx => {
  const { typeDes } = ctx.request.body
  try {
    await DishType.create({typeDes})
    ctx.body = {
      code: 1
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      data: err
    }
    console.log(err)
  }
}

exports.addShopType = async ctx => {
  const { typeDes } = ctx.request.body
  try {
    await ShopType.create({typeDes})
    ctx.body = {
      code: 1
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      data: err
    }
    console.log(err)
  }
}

exports.getUserList = async ctx => {
  // property是筛选，可为userName、userId、phone, keyword为关键字
  let { pageNum, property, keyword } = ctx.request.query
  let totalPage = 1
  let userList = []
  try {
    if (!keyword) {
      // 只有页数，不搜索
      totalPage = Math.ceil(await User.count({}) / userPerPage)
      userList = await User.find({})
                                  .skip((pageNum - 1) * userPerPage)
                                  .limit(userPerPage)
                                  .exec()
    } else if (!property) {
      // 有keyword，没有筛选类型,需要每一种的查找
      userList = userList.concat(await User.find({user_name: new RegExp(keyword, 'igm')}))
      userList = userList.concat(await User.find({_id: keyword}))
      if (Number.isInteger(+keyword)) {
        userList = userList.concat(await User.find({phone_num: +keyword}))
      }
      totalPage = Math.ceil(userList.length / userPerPage)
      userList = userList.splice((pageNum - 1) * userPerPage, userPerPage)
    } else {
      // 有指定类型筛选,注意数字值要先判断为数字才查找
      if (property === 'phone' && Number.isInteger(+keyword)) {
        property = 'phone_num'
        userList = userList.concat(await User.find({[property]: +keyword}).exec())
      } else if (property === 'userName') {
        property = 'user_name'
        userList = userList.concat(await User.find({[property]: new RegExp(keyword, 'igm')}).exec())
      } else if (property === 'userId') {
        property = '_id'
        userList = userList.concat(await User.find({[property]: keyword}).exec())
      }
      totalPage = Math.ceil(userList.length / userPerPage)
      userList = userList.splice((pageNum - 1) * userPerPage, userPerPage)
    }
  } catch (err) {
    console.log(err)
    // 当搜索失败，返回空数据
  }
  ctx.body = {
    code: 1,
    data: {
      pageNum,
      pages: totalPage,
      list: userList.map(item => ({
        userId: item._id,
        userName: item.user_name,
        phone: item.phone_num,
        address: item.accept_address,
        avator: item.avator,
        introduction: item.introduction,
        gender: item.gender
      }))
    }
  }
}
