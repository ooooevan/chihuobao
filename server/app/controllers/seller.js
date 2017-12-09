// const mongoose = require('mongoose')
// const User = mongoose.model('User')
// const request = require('request')
// const Session = require('../common/session')
// const config = require('../../config')
// const { registerName } = require('../common/utils')
// const MapMsg = require('./dataMapping').codeToMessage

exports.getShopOrder = async ctx => {
  ctx.body = {
    code: 1,
    data: {
      pageNum: 1,
      totalPage: 10,
      shopOrders: [
        {
          shopOrderId: 63465,
          userName: '点菜者',
          dishName: '鸡翅',
          orderAmount: 14,
          acceptAddress: '广东海洋大学西区',
          orderRemarks: '我是备注beizhu 备注',
          userPhone: '16484382432',
          orderStatus: 4,
          dishs: [
            {
              dishId: 62,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            },
            {
              dishId: 31372421,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            },
            {
              dishId: 62472,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            },
            {
              dishId: 31132511,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            }
          ]
        },
        {
          shopOrderId: 145653652,
          userName: '点菜者名字',
          dishName: '鸡翅',
          orderAmount: 14,
          userPhone: '16484382432',
          acceptAddress: '广东海洋大学海浪',
          orderRemarks: '我是备注',
          orderStatus: 3,
          dishs: [
            {
              dishId: 64137636,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            },
            {
              dishId: 5436543437,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            },
            {
              dishId: 364134621321,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            },
            {
              dishId: 321763321,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            }
          ]
        },
        {
          shopOrderId: 12456522,
          userName: '点菜者名字2',
          dishName: '鸡翅2',
          orderAmount: 14,
          userPhone: '16484382432',
          acceptAddress: '广东海洋大学海浪2',
          orderRemarks: '我是备注2',
          orderStatus: 5,
          dishs: [
            {
              dishId: 64137636,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            },
            {
              dishId: 5436543437,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            },
            {
              dishId: 364134621321,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            },
            {
              dishId: 321763321,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            }
          ]
        },
        {
          shopOrderId: 1212456522,
          userName: '点菜者名字2',
          dishName: '鸡翅2',
          orderAmount: 14,
          userPhone: '16484382432',
          acceptAddress: '广东海洋大学海浪2',
          orderRemarks: '我是备注2',
          orderStatus: 2,
          dishs: [
            {
              dishId: 64137636,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            },
            {
              dishId: 5436543437,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            },
            {
              dishId: 364134621321,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            },
            {
              dishId: 321763321,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            }
          ]
        },
        {
          shopOrderId: 1231212456522,
          userName: '点菜者名字2',
          dishName: '鸡翅2',
          orderAmount: 14,
          userPhone: '16484382432',
          acceptAddress: '广东海洋大学海浪2',
          orderRemarks: '我是备注2',
          orderStatus: 3,
          dishs: [
            {
              dishId: 64137636,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            },
            {
              dishId: 5436543437,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            },
            {
              dishId: 364134621321,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            },
            {
              dishId: 321763321,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            }
          ]
        },
        {
          shopOrderId: 1231212456522,
          userName: '点菜者名字2',
          dishName: '鸡翅2',
          orderAmount: 14,
          userPhone: '16484382432',
          acceptAddress: '广东海洋大学海浪2',
          orderRemarks: '我是备注2',
          orderStatus: 3,
          dishs: [
            {
              dishId: 64137636,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            },
            {
              dishId: 5436543437,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            },
            {
              dishId: 364134621321,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            },
            {
              dishId: 321763321,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            }
          ]
        },
        {
          shopOrderId: 1212456522123,
          userName: '点菜者名字2',
          dishName: '鸡翅2',
          orderAmount: 14,
          userPhone: '16484382432',
          acceptAddress: '广东海洋大学海浪2',
          orderRemarks: '我是备注2',
          orderStatus: 3,
          dishs: [
            {
              dishId: 64137636,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            },
            {
              dishId: 5436543437,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            },
            {
              dishId: 364134621321,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            },
            {
              dishId: 321763321,
              dishName: '鸡翅',
              dishImage: 'https://fuss10.elemecdn.com/b/54/0933a2222d026b618221d680c5251jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
              dishPrice: 123,
              dishNum: 21
            }
          ]
        }
      ]
    }
  }
}

exports.handleOrder = async ctx => {
  ctx.body = {
    code: 1,
    data: ''
  }
}

exports.getAllDish = async ctx => {
  ctx.body = {
    code: 1,
    data: [
      {
        dishId: 63,
        dishName: '名字名字222',
        dishImage: 'https://fuss10.elemecdn.com/8/77/41eb9ee1123516297dfcf2c09a2f1jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
        dishPrice: 13.2,
        dishAbstract: '这是描述······1·',
        dishType: 3,
        level: 3,
        monthlySales: 412
      },
      {
        dishId: 765,
        dishName: '名字名字222',
        dishImage: 'https://fuss10.elemecdn.com/8/77/41eb9ee1123516297dfcf2c09a2f1jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
        dishPrice: 13.2,
        dishAbstract: '这是描述······1·',
        dishType: 1,
        level: 3,
        monthlySales: 412
      },
      {
        dishId: 52,
        dishName: '名字名字222',
        dishImage: 'https://fuss10.elemecdn.com/8/77/41eb9ee1123516297dfcf2c09a2f1jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
        dishPrice: 13.2,
        dishAbstract: '这是描述······1·',
        dishType: 1,
        level: 3,
        monthlySales: 412
      },
      {
        dishId: 154,
        dishName: '名字名字222',
        dishImage: 'https://fuss10.elemecdn.com/8/77/41eb9ee1123516297dfcf2c09a2f1jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
        dishPrice: 13.2,
        dishAbstract: '这是描述······1·',
        dishType: 1,
        level: 3,
        monthlySales: 412
      },
      {
        dishId: 1354,
        dishName: '名字名字222',
        dishImage: 'https://fuss10.elemecdn.com/8/77/41eb9ee1123516297dfcf2c09a2f1jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
        dishPrice: 13.2,
        dishAbstract: '这是描述······1·',
        dishType: 1,
        level: 3,
        monthlySales: 412
      },
      {
        dishId: 543,
        dishName: '名字名字222',
        dishImage: 'https://fuss10.elemecdn.com/8/77/41eb9ee1123516297dfcf2c09a2f1jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
        dishPrice: 13.2,
        dishAbstract: '这是描述······1·',
        dishType: 1,
        level: 3,
        monthlySales: 412
      },
      {
        dishId: 12,
        dishName: '名字名字222',
        dishImage: 'https://fuss10.elemecdn.com/8/77/41eb9ee1123516297dfcf2c09a2f1jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
        dishPrice: 13.2,
        dishAbstract: '这是描述······1·',
        dishType: 1,
        level: 3,
        monthlySales: 412
      },
      {
        dishId: 213,
        dishName: '名字名字222',
        dishImage: 'https://fuss10.elemecdn.com/8/77/41eb9ee1123516297dfcf2c09a2f1jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
        dishPrice: 13.2,
        dishAbstract: '这是描述······1·',
        dishType: 1,
        level: 3,
        monthlySales: 412
      }
    ]
  }
}

exports.getShopInfo = async ctx => {
  ctx.body = {
    code: 1,
    data: {
      shopId: 12321321,
      shopName: '名字',
      logo: 'https://fuss10.elemecdn.com/a/c3/9f33ec59741cb71d2e786cd6f2786png.png?imageMogr2/thumbnail/70x70/format/webp/quality/85',
      shopAbstract: '商铺简介····、···。。·。',
      shopLocation: '地址地址',
      shopAnnouncement: '我是公告',
      shopPhone: 1233242142143,
      shopWorkTime: '08-20',
      shopDeliveryCost: 3.4,
      shopStartDelivery: 12,
      storesImages: 'https://fuss10.elemecdn.com/0/9f/23cfcc8ad15a56734ab10d95c14aajpeg.jpeg?imageMogr/format/webp/',
      detailImages: 'https://fuss10.elemecdn.com/a/43/4cacac3068b534c56a3cb1288ca67jpeg.jpeg?imageMogr/format/webp/',
      deliveryTime: '40',
      level: 4.3
    }
  }
}

exports.modifyDish = async ctx => {
  ctx.body = {
    code: 1,
    data: ''
  }
}

exports.delDish = async ctx => {
  ctx.body = {
    code: 1,
    data: ''
  }
}

exports.addDish = async ctx => {
  ctx.body = {
    code: 1,
    data: ''
  }
}

exports.modifyShopInfo = async ctx => {
  ctx.body = {
    code: 1,
    data: ''
  }
}

exports.getRateList = async ctx => {
  // 评论一页九条
  ctx.body = {
    code: 1,
    data: {
      pageNum: 2,
      totalPage: 10,
      dishComment: [
        {
          commentId: 653214234423432,
          dishId: 5435365,
          dishName: '鸡腿',
          username: '用户名名222222222222222222222222222222222222222222222222',
          level: 4.5,
          comment: '还行还行还行2222222222222222222222222222222222222222222还行还行还行2222222222222222222222222222222222222222222还行还行还行2222222222222222222222222222222222222222222还行还行还行2222222222222222222222222222222222222222222',
          commentDate: '2017-12-02'
        },
        {
          commentId: 4723312214423432,
          dishId: 5435365,
          dishName: '鸡腿',
          username: '用户名名',
          level: 4.5,
          comment: '还行还行还行',
          commentDate: '2017-12-02'
        },
        {
          commentId: 267321442331432123,
          dishId: 5435365,
          dishName: '鸡腿',
          username: '用户名名',
          level: 4.5,
          comment: '还行还行还行',
          commentDate: '2017-12-02'
        },
        {
          commentId: 3583214423432132,
          dishId: 5435365,
          dishName: '鸡腿',
          username: '用户名名',
          level: 4.5,
          comment: '还行还行还行',
          commentDate: '2017-12-02'
        },
        {
          commentId: 8763214423432123,
          dishId: 5435365,
          dishName: '鸡腿',
          username: '用户名名',
          level: 4.5,
          comment: '还行还行还行',
          commentDate: '2017-12-02'
        },
        {
          commentId: 8543214423432321,
          dishId: 5435365,
          dishName: '鸡腿',
          username: '用户名名',
          level: 4.5,
          comment: '还行还行还行',
          commentDate: '2017-12-02'
        },
        {
          commentId: 765321442331432123,
          dishId: 5435365,
          dishName: '鸡腿',
          username: '用户名名',
          level: 4.5,
          comment: '还行还行还行',
          commentDate: '2017-12-02'
        },
        {
          commentId: 5433214423432132,
          dishId: 5435365,
          dishName: '鸡腿',
          username: '用户名名',
          level: 4.5,
          comment: '还行还行还行',
          commentDate: '2017-12-02'
        },
        {
          commentId: 5323213214423432123,
          dishId: 5435365,
          dishName: '鸡腿',
          username: '用户名名',
          level: 4.5,
          comment: '还行还行还行',
          commentDate: '2017-12-02'
        }
      ]
    }
  }
}

exports.isNewOrder = async ctx => {
  ctx.body = {
    code: 1,
    data: 2
  }
}
