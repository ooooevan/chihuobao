const mongoose = require('mongoose')
const ShopOrder = mongoose.model('ShopOrder')
// const request = require('request')
// const User = mongoose.model('User')
const UserOrder = mongoose.model('UserOrder')
const MenuModel = mongoose.model('MenuModel')
const DishComment = mongoose.model('DishComment')
const Shop = mongoose.model('Shop')
// const request = require('request')
// const Session = require('../common/session')
// const config = require('../../config')
// const { registerName } = require('../common/utils')
// const MapMsg = require('./dataMapping').codeToMessage
const shopOrderPerPage = 8
const commentPerPage = 8

exports.needSignIn = async (ctx, next) => {
  if (!ctx.session.db) {
    ctx.throw(401)
  } else {
    await next()
  }
}

exports.getShopOrder = async ctx => {
  const { pageNum = 1, type, shopId } = ctx.request.query
  try {
    const totalPage = Math.ceil(await ShopOrder.count({shop_id: shopId, order_status: type}) / shopOrderPerPage)
    const orderList = await ShopOrder.find({shop_id: shopId, order_status: type})
                                    .populate('user_id shop_id', 'phone_num shop_delivery_cost')
                                    .skip((pageNum - 1) * shopOrderPerPage)
                                    .limit(shopOrderPerPage)
                                    .exec()
    ctx.body = {
      code: 1,
      data: {
        pageNum,
        totalPage,
        shopOrders: orderList.map(item => ({
          shopOrderId: item._id,
          userName: item.userName || '名字',
          dishName: item.dishName || '鸡翅',
          orderAmount: item.order_amount,
          acceptAddress: item.accept_address,
          orderRemarks: item.order_remarks,
          userPhone: item.user_id.phone_num,
          orderStatus: item.order_status,
          dishs: JSON.parse(item.food_list).concat({   // 将配送费放入商品列表
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
      data: err
    }
  }
}

exports.handleOrder = async ctx => {
  // 1为接单，2不接单, 3取消订单, 4删除订单, 5已收货
  const { shopOrderId, type } = ctx.request.body   // 其他参数：shopId
  // 两个订单表_id是一样的
  const shopOrder = await ShopOrder.findOne({_id: shopOrderId}).exec()
  const userOrder = await UserOrder.findOne({_id: shopOrderId}).exec()
  try {
    if (type === '1') {
      shopOrder.order_status = 4
      userOrder.order_status = 4
    } else if (type === '2') {
      shopOrder.order_status = 7
      userOrder.order_status = 7
    } else if (type === '3') {
      shopOrder.order_status = 5
      userOrder.order_status = 5
    } else if (type === '4') {
      shopOrder.order_status = 6
      userOrder.order_status = 6
    } else if (type === '5') {
      // 已完成订单，将菜品销量加一,商铺销量加一
      shopOrder.order_status = 2
      userOrder.order_status = 2
      await Shop.update({_id: shopOrder.shop_id}, {$inc: {monthly_sales: 1}}).exec()
      let foodList = JSON.parse(shopOrder.food_list)
      await Promise.all(foodList.map(async item => {
        await MenuModel.update({_id: item.dishId}, {$inc: {monthly_sales: 1}}).exec()
      }))
      // 计算配送时间,减去上次的update_time
      const pre = shopOrder.order_update_time
      const minutes = (new Date() - pre) / 1000 / 60 // 距上次用了多少分钟
      shopOrder.total_time += minutes
      userOrder.total_time += minutes
    }
    await shopOrder.save()
    await userOrder.save()
    ctx.body = {
      code: 1
    }
  } catch (err) {
    if (err) console.log(err)
    ctx.body = {
      code: 1,
      data: err
    }
  }
}

exports.getAllDish = async ctx => {
  const { shopId } = ctx.request.query
  let shopList = []
  try {
    shopList = await MenuModel.find({shop_id: shopId}).exec()
  } catch (err) {
    console.log(err)
  }
  ctx.body = {
    code: 1,
    data: shopList.map(item => ({
      dishId: item._id,
      dishName: item.dish_name,
      dishImage: item.dish_pics,
      dishPrice: item.dish_price,
      dishAbstract: item.dish_introduction,
      dishType: item.dish_type,
      level: +(item.level / item.comment_sales).toFixed(1) || 0,
      monthlySales: item.monthly_sales
    }))
  }
}

exports.getShopInfo = async ctx => {
  const { shopId } = ctx.request.query
  try {
    const shop = await Shop.findOne({_id: shopId}).exec()
    ctx.body = {
      code: 1,
      data: {
        shopId: shop._id,
        shopName: shop.shop_name,
        logo: shop.shop_logo,
        shopAbstract: shop.shop_abstract,
        shopLocation: shop.shop_location,
        shopAnnouncement: shop.shop_announcement,
        shopPhone: shop.shop_phone,
        shopWorkTime: shop.shop_work_time,
        shopDeliveryCost: shop.shop_delivery_cost,
        shopStartDelivery: shop.shop_start_delivery,
        storesImages: shop.shop_stores_images,
        detailImages: shop.shop_detail_images,
        deliveryTime: shop.delivery_time,
        level: +(shop.level / shop.comment_sales).toFixed(1) || 0
      }
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      data: err
    }
  }
}

exports.modifyDish = async ctx => {
  const { dishId, dishPrice, dishAbstract, dishType } = ctx.request.body // 其他参数：shopId
  let dish
  try {
    dish = await MenuModel.findOne({_id: dishId}).exec()
    dish.dish_introduction = dishAbstract
    dish.dish_price = dishPrice
    dish.dish_type = dishType
    await dish.save()
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

exports.delDish = async ctx => {
  const { dishId } = ctx.request.body
  try {
    await MenuModel.remove({_id: dishId})
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

exports.addDish = async ctx => {
  const { shopId, dishName, dishPrice, dishType, dishAbstract, dishImage } = ctx.request.body
  try {
    await MenuModel.create({shop_id: shopId, dish_name: dishName, dish_introduction: dishAbstract, dish_price: dishPrice, dish_pics: dishImage, dish_type: dishType})
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

exports.modifyShopInfo = async ctx => {
  const { shopId, shopName, shopLogo, shopAbstract, shopLocation, shopAnnouncement, shopPhone, shopWorkTime, shopDeliveryCost, shopStartDelivery } = ctx.request.body
  try {
    let shop = await Shop.findOne({_id: shopId}).exec()
    if (shopName !== 'undefined') shop.shop_name = shopName
    if (shopLogo !== 'undefined') shop.shop_logo = shopLogo
    if (shopAbstract !== 'undefined') shop.shop_abstract = shopAbstract
    if (shopLocation !== 'undefined') shop.shop_location = shopLocation
    if (shopAnnouncement !== 'undefined') shop.shop_announcement = shopAnnouncement
    if (shopPhone !== 'undefined') shop.shop_phone = +shopPhone
    if (shopWorkTime !== 'undefined') shop.shop_work_time = shopWorkTime
    if (shopDeliveryCost !== 'undefined') shop.shop_delivery_cost = +shopDeliveryCost
    if (shopStartDelivery !== 'undefined') shop.shop_start_delivery = shopStartDelivery
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

exports.getRateList = async ctx => {
  const { shopId, pageNum } = ctx.request.query
  let commentList = []
  let totalPage = 1
  let code = 1
  try {
    totalPage = Math.ceil(await DishComment.count({shop_id: shopId}) / commentPerPage)
    commentList = await DishComment.find({shop_id: shopId})
                                  .populate('user_id dish_id', 'user_name dish_name')
                                  .skip((pageNum - 1) * commentPerPage)
                                  .limit(commentPerPage)
                                  .exec()
    commentList = commentList.map(item => ({
      commentId: item._id,
      dishId: item.dish_id,
      dishName: item.dish_id.dish_name,
      userName: item.user_id.user_name,
      level: item.level,
      comment: item.comment,
      commentDate: item.comment_date
    }))
    // commentList = await Promise.all(commentList.map(async item => {
    //   const user = await User.findOne({_id: item.user_id}).exec()
    //   const dish = await MenuModel.findOne({_id: item.dish_id}).exec()
    //   return {
    //     commentId: item._id,
    //     dishId: item.dish_id,
    //     dishName: dish.dish_name,
    //     username: user.user_name,
    //     level: item.level,
    //     comment: item.comment,
    //     commentDate: item.comment_date
    //   }
    // }))
  } catch (err) {
    code = 0
  }
  ctx.body = {
    code,
    data: {
      pageNum,
      totalPage,
      dishComment: commentList
    }
  }
}

exports.isNewOrder = async ctx => {
  const { shopId } = ctx.request.query
  let num = 0
  try {
    num = await ShopOrder.count({shop_id: shopId, order_status: 3}).exec()
  } catch (err) {
    console.log(err)
    ctx.body = {
      code: 0,
      data: 0
    }
  }
  ctx.body = {
    code: 1,
    data: num
  }
}
