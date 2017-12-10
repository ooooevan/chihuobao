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

exports.login = async ctx => {
  const { adminName, adminPwd } = ctx.request.body
  ctx.body = {
    code: 1,
    data: {
      adminName,
      shopMp: 1,
      shopTypeMp: 1,
      foodTypeMp: 1,
      flagSuper: 1
    }
  }
}

exports.getAdminList = async ctx => {
  ctx.body = {
    code: 1,
    data: {
      pageNum: 1,
      pageSize: 5,   // 每页的数量
      size: 5, // 当前页的数量
      total: 3, // 总记录数
      pages: 2,  // 总页数
      list: [
        {
          adminName: 'root',
          adminPwd: 'root',
          shopMp: 1, // 商铺模块权限
          shopTypeMp: 1, // 商铺类型模块权限
          foodTypeMp: 1, // 食物类型模块权限
          flagSuper: 1, // 是否超级管理员
          createTime: 123456 // 创建时间时间戳
        },
        {
          adminName: 'admin1',
          adminPwd: 'root',
          shopMp: 1, // 商铺模块权限
          shopTypeMp: 1, // 商铺类型模块权限
          foodTypeMp: 1, // 食物类型模块权限
          flagSuper: 1, // 是否超级管理员
          createTime: 123456 // 创建时间时间戳
        },
        {
          adminName: 'admin2',
          adminPwd: 'root',
          shopMp: 1, // 商铺模块权限
          shopTypeMp: 1, // 商铺类型模块权限
          foodTypeMp: 1, // 食物类型模块权限
          flagSuper: 1, // 是否超级管理员
          createTime: 123456 // 创建时间时间戳
        },
        {
          adminName: 'admin3',
          adminPwd: 'root',
          shopMp: 1, // 商铺模块权限
          shopTypeMp: 1, // 商铺类型模块权限
          foodTypeMp: 1, // 食物类型模块权限
          flagSuper: 1, // 是否超级管理员
          createTime: 123456 // 创建时间时间戳
        },
        {
          adminName: 'admin4',
          adminPwd: 'root',
          shopMp: 1, // 商铺模块权限
          shopTypeMp: 1, // 商铺类型模块权限
          foodTypeMp: 1, // 食物类型模块权限
          flagSuper: 1, // 是否超级管理员
          createTime: 123456 // 创建时间时间戳
        }
      ]
    }
  }
}

exports.addition = async ctx => {
  ctx.body = {
    code: 1,
    data: {}
  }
}

exports.deletion = async ctx => {
  ctx.body = {
    code: 1,
    data: {}
  }
}

exports.configuration = async ctx => {
  ctx.body = {
    code: 1,
    data: {}
  }
}

exports.getShopsList = async ctx => {
  ctx.body = {
    code: 1,
    data: {
      pageNum: 1,
      pageSize: 5,
      size: 5,
      total: 122,
      pages: 12,
      list: [
        {
          shopId: 1,
          userId: 1,
          shopName: 'abc',
          shopPhone: '1333333111',
          shopLocation: '北京xxxxxx'
        },
        {
          shopId: 2,
          userId: 2,
          shopName: 'abc',
          shopPhone: '13233333222',
          shopLocation: '北京xxxxxx'
        },
        {
          shopId: 3,
          userId: 3,
          shopName: 'abc',
          shopPhone: '1333333333',
          shopLocation: '北京xxxxxx'
        },
        {
          shopId: 4,
          userId: 4,
          shopName: 'abc',
          shopPhone: '13233333444',
          shopLocation: '北京xxxxxx'
        },
        {
          shopId: 5,
          userId: 5,
          shopName: '55',
          shopPhone: '13233333555',
          shopLocation: '北京xxxxxx'
        }
      ]
    }
  }
}

exports.getShopInfoById = async ctx => {
  const { shopId } = ctx.params
  ctx.body = {
    code: 1,
    data: {
      shopId: shopId,
      userId: 11,
      shopName: '大碗饭',
      shopLogo: 'url2',
      shopAbstract: '非常好吃',
      shopLocation: '北京xxxxxxx',
      shopAnnouncement: '今天不开店',
      shopStatus: '未开启', // 商铺状态
      shopPhone: '12345678990', // 商铺联系方式
      shopWorkTime: '9-19', // 商铺营业时间
      shopDeliveryCost: 5.00, // 商铺配送费
      shopStartDelivery: 10.00, // 商铺起送价
      shopStores_images: 'url3', // 商铺门店照
      shopDetail_images: 'url1', // 商铺简介照
      shopLongitude: 31.44, // 商铺经度
      shopLatitude: 44.11 // 商铺纬度
    }
  }
}
