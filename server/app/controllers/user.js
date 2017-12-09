const mongoose = require('mongoose')
const User = mongoose.model('User')
const Shop = mongoose.model('Shop')
const Menu = mongoose.model('MenuModel')
const DishType = mongoose.model('DishType')
const request = require('request')
const Session = require('../common/session')
const config = require('../../config')
const { registerName } = require('../common/utils')
const MapMsg = require('./dataMapping').codeToMessage
const shopListNumPerPage = 20
exports.login = async ctx => {
  const { phone, password, loginType } = ctx.request.body
  let user
  let match
  try {
    user = await User.findOne({phone_num: phone}).exec()
    if (user) {
      match = await user.comparePassword(password, user.user_pwd)
    }
  } catch (err) {
    console.log(err)
  }
  if (match) {
    ctx.session.db = new Session(user)
    console.log(user)
    let response = {
      code: 1,
      // data: user
      data: {
        userId: user._id,
        userName: user.user_name,
        avator: 'https://fuss10.elemecdn.com/5/d3/f15d1526ac771189439ea0971c55apng.png?imageMogr2/thumbnail/70x70/format/webp/quality/85',
        gender: 1,
        phone: user.phone_num,
        acceptAddress: '地址地址',
        introduction: '我是简介我是简介'
      }
    }
    if (loginType === 1) {
      response.data.shopId = 12321321
    }
    ctx.body = response
  } else {
    ctx.body = {
      code: 0,
      data: MapMsg[0]
    }
  }
}

exports.sendCode = async ctx => {
  const { phone } = ctx.request.body
  // const hasRegister = await new Promise((resolve, reject) => {
  //   User.findOne({phone_num: phone}, (err, user) => {
  //     if (err) {
  //       console.log(err)
  //     }
  //     resolve(user)
  //   })
  // })
  // if (hasRegister) {
  //   ctx.body = {
  //     data: MapMsg[0],
  //     code: 0
  //   }
  //   return
  // }
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
  const { phone, password, code } = ctx.request.body
  const session = ctx.session
  if (session.code === code) {
    // 判断是否已经注册
    const hasRegister = await new Promise((resolve, reject) => {
      User.findOne({phone_num: phone}, (err, user) => {
        if (err) {
          console.log(err)
        }
        resolve(user)
      })
    })
    if (hasRegister) {
      ctx.body = {
        code: 603,
        data: MapMsg[603]
      }
      return
    }
    // 数据库要新增一条数据
    const create = await new Promise((resolve, reject) => {
      User.create({user_name: registerName(), user_pwd: password, phone_num: phone}, (err, newUser) => {
        if (err) {
          console.log(err)
        } else {
          resolve(newUser)
        }
      })
    })
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
      code: 0,
      message: MapMsg[0]
    }
  }
}

exports.reset = async ctx => {
  const { phone, password, checkCode } = this.request.body
  const { code } = ctx.session
  let user, match
  try {
    user = await User.findOne({phone_num: phone}).exec()
    if (user) {
      match = await user.comparePassword(password, user.user_pwd)
    }
  } catch (err) {
    console.log(err)
  }
  // if (match && code === checkCode) {
  //   user.user_pwd = password
  //   user.save((err, _user) => {
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       console.log(_user)
  //       ctx.body = {
  //         code: 1,
  //         data: {}
  //       }
  //     }
  //   })
  // } else {
  //   ctx.body = {
  //     code: 0,
  //     data: MapMsg[0]
  //   }
  // }
  ctx.body = {
    code: 1,
    data: {}
  }
}

exports.logOut = async ctx => {
  ctx.session = {}
  ctx.body = {
    code: 1,
    data: MapMsg[1]
  }
}

exports.getUserInfo = async ctx => {
  // const user = ctx.session.db
  // if (user) {
  //   ctx.body = {
  //     code: 1,
  //     data: {
  //       userId: user._id,
  //       userName: user.user_name,
  //       avator: '',
  //       gender: 1,
  //       phone: user.phone_num,
  //       acceptAddress: '',
  //       introduction: ''
  //     }
  //   }
  // } else {
  //   ctx.body = {
  //     code: 0,
  //     data: ''
  //   }
  // }
  ctx.body = {
    code: 1,
    data: {
      userId: 3213232132141421,
      userName: '名字名字',
      avator: 'https://fuss10.elemecdn.com/5/d3/f15d1526ac771189439ea0971c55apng.png?imageMogr2/thumbnail/70x70/format/webp/quality/85',
      gender: 1,
      phone: 1357912579,
      acceptAddress: '地址地址',
      introduction: '我是简介我是简介'
    }
  }
}

exports.modifyInfo = async ctx => {
  // let { user } = ctx.session
  // const { userName, avator, gender, acceptAddress, introduction, phone } = ctx.request.body
  // Object.assign(user, {
  //   user_name: userName,
  //   phone_num: phone,
  //   avator,  // 这个属性没有
  //   gender,
  //   acceptAddress,
  //   introduction
  // })
  // user.save((err, _user) => {
  //   if (err) console.log(err)
  //   ctx.body = {
  //     code: 1,
  //     data: {}
  //   }
  // })
  ctx.body = {
    code: 1,
    data: {}
  }
}

exports.applyShop = async ctx => {
  ctx.body = {
    code: 1,
    data: {}
  }
}

exports.getShopList = async ctx => {
  const { longitude, latitude, pageNum, shopType, name } = ctx.request.query
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
        shopDeliveryCost: item.shopDeliveryCost || '3',
        level: item.level || 3,
        monthlySales: item.monthlySales || 121
      }))
      // shopBrieflys: [
      //   {
      //     shopId: 123,
      //     shopName: '名字',
      //     shopLogo: 'https://fuss10.elemecdn.com/a/07/b14a3c916e62d27163ced7a1c9c7fpng.png?imageMogr2/thumbnail/70x70',
      //     shopAbstract: '这是商铺简介',
      //     shopDeliveryCost: '3',
      //     level: 3,
      //     monthlySales: 312
      //   },
      //   {
      //     shopId: 123,
      //     shopName: '名字1',
      //     shopLogo: 'https://fuss10.elemecdn.com/a/07/b14a3c916e62d27163ced7a1c9c7fpng.png?imageMogr2/thumbnail/70x70',
      //     shopAbstract: '这是商铺简介1',
      //     shopDeliveryCost: '3',
      //     level: 4,
      //     monthlySales: 312
      //   },
      //   {
      //     shopId: 321,
      //     shopName: '名字2',
      //     shopLogo: 'https://fuss10.elemecdn.com/a/07/b14a3c916e62d27163ced7a1c9c7fpng.png?imageMogr2/thumbnail/70x70',
      //     shopAbstract: '这是商铺简介2',
      //     shopDeliveryCost: '3',
      //     level: 3.5,
      //     monthlySales: 433
      //   },
      //   {
      //     shopId: 121,
      //     shopName: '名字3',
      //     shopLogo: 'https://fuss10.elemecdn.com/a/07/b14a3c916e62d27163ced7a1c9c7fpng.png?imageMogr2/thumbnail/70x70',
      //     shopAbstract: '这是商铺简介3',
      //     shopDeliveryCost: '3',
      //     level: 3,
      //     monthlySales: 122
      //   }
      // ]
    }
  }
}

exports.getInfoByShopId = async ctx => {
  const { shopId } = ctx.request.query
  const shop = await Shop.findById(shopId)
  const dishs = await Menu.find({shop_id: shopId})

  ctx.body = {
    code: 1,
    data: {
      shopDetail: {
        shopId: shop._id,
        shopName: shop.shop_name,
        logo: shop.shop_logo,
        shopAbstract: shop.shop_abstract,
        shopLocation: shop.shop_location,
        shopAnnouncement: shop.shop_announcement || '公告公告···',
        shopPhone: shop.shop_phone || 13151315432,
        shopWorkTime: shop.shop_work_time || '8:00~22:00',
        shopDeliveryCost: shop.shop_delivery_cost || 3,
        level: shop.level || 5,
        shopStartDelivery: shop.shop_start_delivery || 12,
        deliveryTime: shop.shop_delivery_time || 49,
        status: shop.shop_status || 1,
        storesImages: shop.shop_stores_images,
        detailImages: shop.shop_detail_images || 'https://fuss10.elemecdn.com/c/b4/8b2b01d64f72a4e9bf434b72c8a85jpeg.jpeg?imageMogr/format/webp/'
      },
      dishs: dishs.map(item => ({
        dishId: item._id,
        dishName: item.dish_name,
        dishImage: item.dish_pics,
        dishPrice: item.dish_price,
        level: item.level || '4',
        dishAbstract: item.dish_introduction,
        monthlySales: item.monthly_sales,
        dishType: item.dish_type || 2
      }))
      // dishs: [
      //   {
      //     dishId: '3123231',
      //     dishName: '炸鸡块',
      //     dishImage: 'https://fuss10.elemecdn.com/4/ad/11cf68cb44416e3a9316b65d6fa93jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
      //     dishPrice: 11,
      //     level: 5,
      //     dishAbstract: '这是菜品描述····',
      //     monthlySales: 123,
      //     dishType: 3
      //   },
      //   {
      //     dishId: '12123231',
      //     dishName: '麦香鱼',
      //     dishImage: 'https://fuss10.elemecdn.com/2/a1/4d914c92a96d8248a2042351911e1jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
      //     dishPrice: 17,
      //     level: 5,
      //     dishAbstract: '这是菜品描述····',
      //     monthlySales: 123,
      //     dishType: 3
      //   },
      //   {
      //     dishId: '31233231',
      //     dishName: '巨无霸',
      //     dishImage: 'https://fuss10.elemecdn.com/5/3e/5ca037d2090ec808f61cc4ef0719ajpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
      //     dishPrice: 20,
      //     level: 5,
      //     dishAbstract: '这是菜品描述····',
      //     monthlySales: 123,
      //     dishType: 3
      //   },
      //   {
      //     dishId: '122312231',
      //     dishName: '麦趣鸡盒',
      //     dishImage: 'https://fuss10.elemecdn.com/e/ae/dfbfc113c0036278355017844259ajpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
      //     dishPrice: 89,
      //     level: 5,
      //     dishAbstract: '这是菜品描述····',
      //     monthlySales: 123,
      //     dishType: 3
      //   },
      //   {
      //     dishId: '123232231',
      //     dishName: '鸡翅',
      //     dishImage: 'https://fuss10.elemecdn.com/f/d3/0e5d77178e55cac3e2ac2cda2698ejpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
      //     dishPrice: 16,
      //     level: 5,
      //     abstract: '这是菜品描述····',
      //     monthlySales: 123,
      //     dishType: 3
      //   },
      //   {
      //     dishId: '12323321',
      //     dishName: '香芋派',
      //     dishImage: 'https://fuss10.elemecdn.com/a/f2/5c1713881b46dfc75975ba19e0838jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
      //     dishPrice: 12,
      //     level: 5,
      //     abstract: '这是菜品描述····',
      //     monthlySales: 123,
      //     dishType: 3
      //   }
      // ]
    }
  }
}

exports.getCommentByDishId = async ctx => {
  ctx.body = {
    code: 1,
    data: {
      dishComment: [
        {
          commentId: 321313,
          username: 'dfsaf',
          level: 3,
          comment: '还行还行2121221212321321321321',
          commentDate: '2017-12-01',
          replyComment: '我回复了2121',
          reply: '2017-12-02'
        },
        {
          commentId: 321321,
          username: 'dfsaf',
          level: 3,
          comment: '还行还行21321321',
          commentDate: '2017-12-01',
          replyComment: '我回复321321321312了',
          reply: '2017-12-02'
        },
        {
          commentId: 543543,
          username: 'dfsaf',
          level: 3,
          comment: '还行还行cds``1',
          commentDate: '2017-12-01',
          replyComment: '我回复了dsa1`',
          reply: '2017-12-02'
        },
        {
          commentId: 654765,
          username: 'dfsaf',
          level: 3,
          comment: '还行还行dd2```',
          commentDate: '2017-12-01',
          replyComment: '我回复了`11111',
          reply: '2017-12-02'
        },
        {
          commentId: 15431,
          username: 'dfsaf',
          level: 3,
          comment: '还行还行`````',
          commentDate: '2017-12-01',
          replyComment: '我回复了`1`1```',
          reply: '2017-12-02'
        },
        {
          commentId: 7653245,
          username: 'dfsaf',
          level: 3,
          comment: '还行还212121212121行',
          commentDate: '2017-12-01',
          replyComment: '我回复21了',
          reply: '2017-12-02'
        },
        {
          commentId: 654314,
          username: 'dfsaf',
          level: 3,
          comment: '还行还行22222222222222',
          commentDate: '2017-12-01',
          replyComment: '我回复了1',
          reply: '2017-12-02'
        },
        {
          commentId: 543163,
          username: 'dfsaf',
          level: 3,
          comment: '还行还行1111111111111111111111',
          commentDate: '2017-12-01',
          replyComment: '我回复了21',
          reply: '2017-12-02'
        }
      ],
      dish: {
        dishId: 1321321321,
        dishName: '名字名字',
        dishImage: 'https://fuss10.elemecdn.com/5/3e/5ca037d2090ec808f61cc4ef0719ajpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
        dishPrice: '12',
        dishAbstract: '这是描述描述描述描述·················'
      }
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
  ctx.body = {
    code: 1,
    data: {
      total: 11,
      page: 1,
      orders: [
        {
          userOrderId: +Math.random().toString().substr(2, 10),
          userId: +Math.random().toString().substr(2, 10),
          shopId: +Math.random().toString().substr(2, 10),
          shopNamme: '商铺名称',
          orderCode: +Math.random().toString().substr(2, 10),
          amount: +Math.random().toString().substr(2, 4),
          status: 3,
          createTime: '2017-12-02',
          remarks: '备注备注备注',
          deliveryWay: '美团专送',
          payWay: '支付宝',
          acceptAddress: '海浪',
          dishs: [
            {
              dishId: 23243214,
              dishName: '鸡翅',
              dishPrice: 12.2,
              dishNum: 2
            },
            {
              dishId: 23321,
              dishName: '鸡翅2',
              dishPrice: 12.2,
              dishNum: 3
            },
            {
              dishId: 23321123,
              dishName: '鸡翅3',
              dishPrice: 12.2,
              dishNum: 4
            }
          ]
        },
        {
          userOrderId: +Math.random().toString().substr(2, 10),
          userId: +Math.random().toString().substr(2, 10),
          shopId: +Math.random().toString().substr(2, 10),
          shopNamme: '商铺名称',
          orderCode: +Math.random().toString().substr(2, 10),
          amount: +Math.random().toString().substr(2, 4),
          status: 5,
          createTime: '2017-12-02',
          remarks: '备注备注备注',
          deliveryWay: '美团专送',
          payWay: '支付宝',
          acceptAddress: '海浪',
          dishs: [
            {
              dishId: 23243214,
              dishName: '鸡翅',
              dishPrice: 12.2,
              dishNum: 2
            },
            {
              dishId: 23321,
              dishName: '鸡翅2',
              dishPrice: 12.2,
              dishNum: 3
            },
            {
              dishId: 23321123,
              dishName: '鸡翅3',
              dishPrice: 12.2,
              dishNum: 4
            }
          ]
        },
        {
          userOrderId: +Math.random().toString().substr(2, 10),
          userId: +Math.random().toString().substr(2, 10),
          shopId: +Math.random().toString().substr(2, 10),
          shopNamme: '商铺名称',
          orderCode: +Math.random().toString().substr(2, 10),
          amount: +Math.random().toString().substr(2, 4),
          status: 4,
          createTime: '2017-12-02',
          remarks: '备注备注备注',
          deliveryWay: '美团专送',
          payWay: '支付宝',
          acceptAddress: '海浪',
          dishs: [
            {
              dishId: 23243214,
              dishName: '鸡翅',
              dishPrice: 12.2,
              dishNum: 2
            },
            {
              dishId: 23321,
              dishName: '鸡翅2',
              dishPrice: 12.2,
              dishNum: 3
            },
            {
              dishId: 23321123,
              dishName: '鸡翅3',
              dishPrice: 12.2,
              dishNum: 4
            }
          ]
        },
        {
          userOrderId: +Math.random().toString().substr(2, 10),
          userId: +Math.random().toString().substr(2, 10),
          shopId: +Math.random().toString().substr(2, 10),
          shopNamme: '商铺名称',
          orderCode: +Math.random().toString().substr(2, 10),
          amount: +Math.random().toString().substr(2, 4),
          status: 3,
          createTime: '2017-12-02',
          remarks: '备注备注备注',
          deliveryWay: '美团专送',
          payWay: '支付宝',
          acceptAddress: '海浪',
          dishs: [
            {
              dishId: 23243214,
              dishName: '鸡翅',
              dishPrice: 12.2,
              dishNum: 2
            },
            {
              dishId: 23321,
              dishName: '鸡翅2',
              dishPrice: 12.2,
              dishNum: 3
            },
            {
              dishId: 23321123,
              dishName: '鸡翅3',
              dishPrice: 12.2,
              dishNum: 4
            }
          ]
        },
        {
          userOrderId: +Math.random().toString().substr(2, 10),
          userId: +Math.random().toString().substr(2, 10),
          shopId: +Math.random().toString().substr(2, 10),
          shopNamme: '商铺名称',
          orderCode: +Math.random().toString().substr(2, 10),
          amount: +Math.random().toString().substr(2, 4),
          status: 2,
          createTime: '2017-12-02',
          remarks: '备注备注备注',
          deliveryWay: '美团专送',
          payWay: '支付宝',
          acceptAddress: '海浪',
          dishs: [
            {
              dishId: 23243214,
              dishName: '鸡翅',
              dishPrice: 12.2,
              dishNum: 2
            },
            {
              dishId: 23321,
              dishName: '鸡翅2',
              dishPrice: 12.2,
              dishNum: 3
            },
            {
              dishId: 23321123,
              dishName: '鸡翅3',
              dishPrice: 12.2,
              dishNum: 4
            }
          ]
        },
        {
          userOrderId: +Math.random().toString().substr(2, 10),
          userId: +Math.random().toString().substr(2, 10),
          shopId: +Math.random().toString().substr(2, 10),
          shopNamme: '商铺名称',
          orderCode: +Math.random().toString().substr(2, 10),
          amount: +Math.random().toString().substr(2, 4),
          status: 1,
          createTime: '2017-12-02',
          remarks: '备注备注备注',
          deliveryWay: '美团专送',
          payWay: '支付宝',
          acceptAddress: '海浪',
          dishs: [
            {
              dishId: 23243214,
              dishName: '鸡翅',
              dishPrice: 12.2,
              dishNum: 2
            },
            {
              dishId: 23321,
              dishName: '鸡翅2',
              dishPrice: 12.2,
              dishNum: 3
            },
            {
              dishId: 23321123,
              dishName: '鸡翅3',
              dishPrice: 12.2,
              dishNum: 4
            }
          ]
        }
      ]
    }
  }
}

exports.deleteOrder = async ctx => {
  ctx.body = {
    code: 1,
    data: {}
  }
}

exports.getShopPhone = async ctx => {
  ctx.body = {
    code: 1,
    data: {
      shop_phone: 11111113638
    }
  }
}

exports.finishOrder = async ctx => {
  ctx.body = {
    code: 1,
    data: {}
  }
}
exports.rateOrder = async ctx => {
  ctx.body = {
    code: 1,
    data: {}
  }
}
exports.getShopType = async ctx => {
  const ShopType = mongoose.model('ShopType')
  const _types = await ShopType.find({}).exec()
  const types = _types.map(item => {
    return {
      shopType: item.type,
      shopTypeCode: item.code
    }
  })
  ctx.body = {
    code: 1,
    data: types
  }
}
