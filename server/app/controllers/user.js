const mongoose = require('mongoose')
const User = mongoose.model('User')
const Shop = mongoose.model('Shop')
const MenuModel = mongoose.model('MenuModel')
const DishComment = mongoose.model('DishComment')
const UserOrder = mongoose.model('UserOrder')
const ShopOrder = mongoose.model('ShopOrder')
const ShopApply = mongoose.model('ShopApply')
const request = require('request')
const Session = require('../common/session')
const config = require('../../config')
const { registerName } = require('../common/utils')
const MapMsg = require('./dataMapping').codeToMessage
const shopListNumPerPage = 20
const userOrderPerPage = 8

exports.login = async ctx => {
  const { phone, password, loginType } = ctx.request.body
  let user
  let match
  try {
    user = await User.findOne({phone_num: phone}).exec()
    if (user) {
      match = await user.comparePassword(password, user.user_pwd)
    }
    if (match) {
      ctx.session = new Session(user)
      let response = {
        code: 1,
        data: {
          userId: user._id,
          userName: user.user_name,
          avator: user.avator,
          gender: user.gender,
          phone: user.phone_num,
          acceptAddress: user.accept_address,
          introduction: user.introduction
        }
      }
      if (loginType === '1') {
        const shop = await Shop.findOne({user_id: user._id}).exec()
        if (!shop) {
          ctx.body = {
            code: 0,
            data: MapMsg[4]   // 非商户
          }
        }
        response.data.shopId = shop._id
      }
      ctx.body = response
    } else {
      ctx.body = {
        code: 0,
        data: MapMsg[0]
      }
    }
  } catch (err) {
    console.log(err)
    ctx.body = {
      code: 0,
      data: MapMsg[0]
    }
  }
}

exports.sendCode = async ctx => {
  const { phone } = ctx.request.body
  const ranCode = Math.random().toString().substr(2, 6)
  ctx.session = new Session(null, ranCode)
  const result = await new Promise((resolve, reject) => {
    request({
      method: 'GET',
      uri: config.uri,
      qs: {
        mobile: phone,
        tpl_id: config.tpl_id,
        key: config.key,
        tpl_value: `${config.tplPre}${ranCode}`
      },
      json: true
    }, (err, response, body) => {
      if (err) {
        throw new Error(err)
      }
      resolve(body)
    })
  })
  let code = 1
  if (result.error_code) {
    code = 0
  }
  ctx.body = {
    code,
    data: MapMsg[code]
  }
}

exports.register = async ctx => {
  const { phone, password, checkCode } = ctx.request.body
  const session = ctx.session
  if (session.code === checkCode) {
    // 判断是否已经注册
    const hasRegister = await User.findOne({phone_num: phone})
    if (hasRegister) {
      ctx.body = {
        code: 603,
        data: MapMsg[603]
      }
      return
    }
    // 数据库要新增一条数据
    const create = await User.create({user_name: registerName(), user_pwd: password, phone_num: phone})
    if (create) {
      // 创建成功
      ctx.body = {
        code: 1,
        message: MapMsg[1]
      }
    }
  } else {
    // 验证码不正确
    ctx.body = {
      code: 5,
      message: MapMsg[5]
    }
  }
}

exports.reset = async ctx => {
  const { phone, password, checkCode } = this.request.body
  const { code } = ctx.session
  let user
  if (code === checkCode) {
    try {
      user = await User.findOne({phone_num: +phone}).exec()
      user.user_pwd = password
      await user.save()
      ctx.body = {
        code: 1
      }
    } catch (err) {
      console.log(err)
      ctx.body = {
        code: 0,
        data: err
      }
    }
  } else {
    ctx.body = {
      code: 5,
      data: MapMsg[5]
    }
  }
}

exports.logOut = async ctx => {
  ctx.session = {}
  ctx.body = {
    code: 1
  }
}

exports.getUserInfo = async ctx => {
  const _user = ctx.session.db
  try {
    const user = await User.findOne({_id: _user._id}).exec()
    console.log(user)
    ctx.body = {
      code: 1,
      data: {
        userId: user._id,
        userName: user.user_name,
        avator: user.avator,
        gender: user.gender,
        phone: user.phone_num,
        acceptAddress: user.accept_address,
        introduction: user.introduction
      }
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      data: err
    }
  }
}

exports.modifyInfo = async ctx => {
  let _user = ctx.session.db
  const { userName, avator, gender, acceptAddress, introduction, phone } = ctx.request.body
  try {
    const user = await User.findOne({_id: _user._id}).exec()
    if (avator) user.avator = avator
    if (+gender) user.gender = gender
    if (phone) user.phone_num = +phone
    if (userName) user.user_name = userName
    if (acceptAddress) user.accept_address = acceptAddress
    if (introduction) user.introduction = introduction
    user.modify = 'modify'
    await user.save()
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

exports.getApplyInfo = async ctx => {
  const { userId } = ctx.request.body
  try {
    const apply = await ShopApply.findOne({user_id: userId}).exec()
    if (apply) {
      console.log(apply)
      ctx.body = {
        code: 1,
        data: {
          userId: apply.user_id,
          shopAbstract: apply.shop_abstract,
          shopName: apply.shop_name,
          identificationNum: apply.identification_num,
          shopType: apply.shop_type,
          shopLocation: apply.shop_location,
          shopLogo: apply.shop_logo,
          identificationPic: apply.identification_pic,
          shopAuthImages: apply.shop_auth_images,
          shopLongitude: apply.shop_longitude,
          shopLatitude: apply.shop_latitude,
          shopStatus: apply.status
        }
      }
    }
  } catch (err) {
    ctx.body = {
      code: 0
    }
  }
}

exports.applyShop = async ctx => {
  const { userId, shopAbstract, shopName, identificationNum, shopTypeCode, shopLocation, shopLogo, identificationPic, shopAuthImages, shopLongitude, shopLatitude } = ctx.request.body
  try {
    const _user = ctx.session.db
    ShopApply.create({
      user_id: _user._id,
      shop_abstract: shopAbstract,
      shop_name: shopName,
      identification_num: identificationNum,
      shop_type: shopTypeCode,
      shop_location: shopLocation,
      shop_logo: shopLogo,
      identification_pic: identificationPic,
      shop_auth_images: shopAuthImages,
      shop_longitude: shopLongitude,
      shop_latitude: shopLatitude
    })
    // 将用户表 标记为商户
    await User.update({_id: userId}, {$set: {is_merchant: 1}}).exec()
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

exports.getShopList = async ctx => {
  const { pageNum } = ctx.request.query /* 其他参数：longitude, latitude, shopType, name */
  // 本来是要根据经纬度，返回附近的商家，现在直接返回全部商家
  const totalPage = Math.ceil(await Shop.count({}) / shopListNumPerPage)
  const shopList = await Shop.find({})
                            .skip((pageNum - 1) * shopListNumPerPage)
                            .limit(shopListNumPerPage)
                            .exec()

  ctx.body = {
    code: 1,
    data: {
      pageNum: pageNum,
      totalPage: totalPage,
      shopBrieflys: shopList.map(item => ({
        shopId: item._id,
        shopName: item.shop_name,
        shopLogo: item.shop_logo,
        shopAbstract: item.shop_abstract,
        shopDeliveryCost: item.shop_delivery_cost,
        level: +(item.level / item.comment_sales).toFixed(1) || 0,
        monthlySales: item.monthly_sales
      }))
    }
  }
}

exports.getInfoByShopId = async ctx => {
  const { shopId } = ctx.request.query
  try {
    const shop = await Shop.findById(shopId)
    const dishs = await MenuModel.find({shop_id: shopId})
    ctx.body = {
      code: 1,
      data: {
        shopDetail: {
          shopId: shop._id,
          shopName: shop.shop_name,
          logo: shop.shop_logo,
          shopAbstract: shop.shop_abstract,
          shopLocation: shop.shop_location,
          shopAnnouncement: shop.shop_announcement,
          shopPhone: shop.shop_phone,
          shopWorkTime: shop.shop_work_time,
          shopDeliveryCost: shop.shop_delivery_cost,
          level: +(shop.level / shop.comment_sales).toFixed(1) || 0,
          shopStartDelivery: shop.shop_start_delivery,
          deliveryTime: +(shop.total_time / shop.monthly_sales).toFixed(1) || 0,
          status: shop.shop_status,
          storesImages: shop.shop_stores_images,
          detailImages: shop.shop_detail_images
        },
        dishs: dishs.map(item => ({
          dishId: item._id,
          dishName: item.dish_name,
          dishImage: item.dish_pics,
          dishPrice: item.dish_price,
          level: +(item.level / item.comment_sales).toFixed(1) || 0,
          dishAbstract: item.dish_introduction,
          monthlySales: item.monthly_sales,
          dishType: item.dish_type
        }))
      }
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      data: {
        message: err
      }
    }
  }
}

exports.getCommentByDishId = async ctx => {
  const { dishId } = ctx.request.query
  try {
    const dish = await MenuModel.findOne({_id: dishId}).exec()
    let comments = await DishComment.find({dish_id: dishId})
                                    .populate('user_id', 'user_name')
                                    .exec()
    ctx.body = {
      code: 1,
      data: {
        dish: {
          dishId: dish._id,
          dishName: dish.dish_name,
          dishImage: dish.dish_pics,
          dishPrice: dish.dish_price,
          dishAbstract: dish.dish_abstract
        },
        dishComment: comments.map(item => ({
          commentId: item._id,
          username: item.user_id.user_name,
          level: item.level,
          comment: item.comment,
          commentDate: item.comment_date
        }))
      }
    }
  } catch (err) {
    ctx.body = {
      code: 0
    }
  }
}

exports.needSignIn = async (ctx, next) => {
  if (!ctx.session.db) {
    ctx.throw(401)
  } else {
    await next()
  }
}
exports.getUserOrder = async ctx => {
  const { userId, page, orderType } = ctx.request.body
  try {
    const totalPage = Math.ceil(await UserOrder.count({user_id: userId, order_status: orderType}).exec() / userOrderPerPage)
    let orderList = await UserOrder.find({user_id: userId, order_status: orderType})
                        .skip((page - 1) * userOrderPerPage)
                        .limit(userOrderPerPage)
                        .populate('shop_id', 'shop_name')
                        .exec()
    ctx.body = {
      code: 1,
      data: {
        total: totalPage,
        page,
        orders: orderList.map(item => ({
          userOrderId: item._id,
          userId: item.user_id,
          shopId: item.shop_id._id,
          shopNamme: item.shop_id.shop_name,
          orderCode: +Math.random().toString().substr(2, 10),  // 不需要，临时随机用
          amount: item.order_amount,
          isComment: item.is_comment,
          status: item.order_status,
          createTime: item.order_create_time,
          remarks: item.order_remarks,
          deliveryWay: '美团专送',  // 不需要，临时随机用
          payWay: '支付宝', // 不需要，临时随机用
          acceptAddress: item.accept_address,
          dishs: item.food_list && JSON.parse(item.food_list).concat({   // 将配送费放入商品列表
            dishName: '配送费',
            dishNum: 1,
            dishPrice: item.shop_id.shop_delivery_cost
          })
        }))
      }
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      err: err,
      data: {
        total: 1,
        page: 1,
        orders: []
      }
    }
  }
}

exports.deleteOrder = async ctx => {
  const { userOrderId } = ctx.request.body
  try {
    const res = await new Promise((resolve, reject) => {
      request.post(`${config.domain}/api/shopOrder/handle`, {
        form: {
          shopOrderId: userOrderId,
          type: 4
        }
      }, (err, res, body) => {
        if (err) console.log(err)
        resolve(body)
      })
    })
    ctx.body = res
  } catch (err) {
    ctx.body = {
      code: 0,
      data: err
    }
  }
}

exports.getShopPhone = async ctx => {
  const { shopId } = ctx.request.body
  const shop = await Shop.find({_id: shopId}).exec()
  ctx.body = {
    code: 1,
    data: {
      shop_phone: shop.shop_phone
    }
  }
}

exports.finishOrder = async ctx => {
  const { userOrderId } = ctx.request.body
  try {
    const res = await new Promise((resolve, reject) => {
      request.post(`${config.domain}/api/shopOrder/handle`, {
        form: {
          shopOrderId: userOrderId,
          type: 5
        }
      }, (err, res, body) => {
        if (err) console.log(err)
        resolve(body)
      })
    })
    ctx.body = res  // 返回的就包含code和data。所以直接返回即可
  } catch (err) {
    ctx.body = {
      code: 0,
      data: err
    }
    console.log(err)
  }
}
exports.rateOrder = async ctx => {
  const { dishId, level, commend, userId, userOrderId, shopId } = ctx.request.body
  try {
    await DishComment.create({dish_id: dishId, shop_id: shopId, order_id: userOrderId, user_id: userId, level: +level, comment: commend})
    MenuModel.update({_id: dishId}, {$inc: {level}}).exec()   // 将这道菜评分加上
    MenuModel.update({_id: dishId}, {$inc: {comment_sales: 1}}).exec()   // 将这道菜评分加上
    Shop.update({_id: shopId}, {$inc: {level}}).exec()   // 将商家总体的评分加上
    Shop.update({_id: shopId}, {$inc: {comment_sales: 1}}).exec()   // 将商家
    UserOrder.update({_id: userOrderId}, {$set: {is_comment: 1}}).exec()  // 标记订单为已评论
    ShopOrder.update({_id: userOrderId}, {$set: {is_comment: 1}}).exec()
    UserOrder.update({_id: userOrderId}, {$inc: {comment_sales: 1}}).exec()  // 评价数加一，用于计算评价平均分
    ShopOrder.update({_id: userOrderId}, {$inc: {comment_sales: 1}}).exec()

    ctx.body = {
      code: 1,
      data: {}
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      data: {}
    }
  }
}
exports.getShopType = async ctx => {
  const ShopType = mongoose.model('ShopType')
  const _types = await ShopType.find({}).exec()
  const types = _types.map(item => {
    return {
      shopType: item.type,
      shopTypeCode: item._id
    }
  })
  ctx.body = {
    code: 1,
    data: types
  }
}
exports.newOrder = async ctx => {
  const { shopId, userId, dishs, amount, remarks, acceptAddress } = ctx.request.body
  // 生成订单，默认未支付状态
  const userOrder = await UserOrder.create({
    user_id: userId,
    shop_id: shopId,
    food_list: JSON.stringify(dishs),
    order_amount: amount,
    order_remarks: remarks,
    accept_address: acceptAddress
  })
  // 建商铺订单表，_id是一样的，便于查找
  await ShopOrder.create({
    _id: userOrder._id,
    user_id: userId,
    shop_id: shopId,
    food_list: JSON.stringify(dishs),
    order_amount: amount,
    order_remarks: remarks,
    accept_address: acceptAddress
  })
  ctx.body = {
    code: 1,
    data: userOrder._id
  }
}
exports.payOrder = async ctx => {
  // 支付接口，应该返回支付页面接口
  ctx.body = {
    code: 1,
    data: '/shopCart/paying'
  }
}
exports.handleIsPay = async ctx => {
  // 判断是否已经支付
  const { userOrdersId } = ctx.request.body
  if (Math.random() > 0.5) {
    try {
      let userOrder = await UserOrder.findOne({_id: userOrdersId})
      let shopOrder = await ShopOrder.findOne({_id: userOrdersId})
      userOrder.order_status = 3
      shopOrder.order_status = 3
      userOrder.save()
      shopOrder.save()
      ctx.body = {
        code: 1
      }
    } catch (err) {
      ctx.body = {
        code: 0
      }
    }
  } else {
    ctx.body = {
      code: 0
    }
  }
}
