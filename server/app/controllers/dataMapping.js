module.exports = {
  codeToMessage: {
    0: 'error',
    1: 'no error',
    603: 'the number has registered',
    3: 'identifying code error',
    4: 'Incorrect username or password',
    5: 'Verification code error'
  },
  is_merchant: {
    0: '普通用户',
    1: '商户'  // 由普通用户升级为商户，即普通用户申请开店
  },
  order_is_comment: {  // 在订单标记是否已评论
    0: '未评论',
    1: '已评论'
  },
  orderStatus: {
    1: '未支付',
    3: '商家未接单',
    4: '商家已接单',
    2: '已完成',
    5: '已取消',
    6: '已删除',
    7: '不接单'
  },
  shopApplyStatus: {
    0: '未审核',
    1: '审核通过',
    2: '审核不通过'
  },
  shopStatus: {
    0: '营业',
    1: '被冻结',
    2: '休息'
  }
}
