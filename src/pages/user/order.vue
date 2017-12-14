<template>
  <div class="order">
    <div class="header">
      <ul>
        <li @click='changeTag(tag.value)' :key='index' :class='{active: tag.value === activeTag}' v-for='(tag, index) in orderTag'>{{tag.label}}</li>
      </ul>
    </div>
    <div class="content">
      <!-- <order-card :key='index' @accept='accept' @cancel='cancelOrder' class='orderCard' v-for='(item, index) in info' :info='item'></order-card> -->
      <order-card @haveRated='haveRated' @goaccept='goaccept' @accept='accept' @del='del' @notAccept='notAccept' @cancel='cancelOrder' class='orderCard' :info='currentInfo.filter(item => item.status === activeTag)'></order-card>
    </div>
    <el-pagination
      class='el-pagination'
      layout="prev, pager, next"
      :page-size='pageSize'
      @current-change='changePage'
      :page-count="totalPage">
    </el-pagination>
    <el-dialog
        title="提示"
        :visible.sync='dialogVisible'
        width='30%'
        :before-close='handleClose'>
        <span>请支付完后点击我已支付,若已支付请点击‘我已支付’</span>
        <a :href='payLocation' target='_blank' class='payLocation'>若未正常跳转可点击手动跳转</a>
        <span slot="footer" class="dialog-footer">
          <el-button @click='handleClose'>取消支付</el-button>
          <el-button type="primary" @click='handleClick'>我已支付</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
  import orderCard from './userOrderCard'
  import { _getUserOrder, _deleteOrder, _getSopPhone, _finishOrder, _payOrder, _handleIsPay } from 'common/javascript/userApi'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      orderCard
    },
    data () {
      return {
        orderTag: [
          {
            value: 1,
            label: '未支付'
          },
          {
            value: 3,
            label: '商家未接单'
          },
          {
            value: 4,
            label: '商家已接单'
          },
          {
            value: 2,
            label: '已完成'
          },
          {
            value: 5,
            label: '已取消'
          }
        ],
        activeTag: 1,
        pageNum: 1,
        totalPage: 1,
        pageSize: 7,
        currentInfo: [],
        dialogVisible: false,
        payLocation: '',  // 支付的链接
        userOrderId: ''
      }
    },
    mounted () {
      // 请求订单数据
      this.getUserOrder()
    },
    computed: {
      ...mapGetters('user',
        [
          'userInfo'
        ]
      )
    },
    created () {
      if (!this.userInfo.userId) {
        this.$router.push('/login')
      }
    },
    methods: {
      handleClick () {
        // 点击我已支付
        const { orderCode } = this
        _handleIsPay(orderCode).then(res => {
          if (res.code === 1) {
            this.$router.push('/shopCart/success')
          } else {
            this.$message({
              type: 'error',
              message: '未检测到支付，请稍后'
            })
          }
        })
      },
      handleClose () {
        this.dialogVisible = false
      },
      goaccept (item) {
        this.orderCode = item.userOrderId
        _payOrder(item.userOrderId).then(res => {
          this.dialogVisible = true
          this.payLocation = res.data
          window.open(res.data)
        })
      },
      changePage (page) {
        this.pageNum = page
        this.getUserOrder()
      },
      haveRated () {
        this.getUserOrder()
      },
      accept (item) {
        const userOrderId = item.userOrderId
        _finishOrder(userOrderId).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'error',
              message: '操作失败'
            })
            return false
          } else if (res.code === 607) {
            this.$message({
              type: 'error',
              message: '订单不存在'
            })
          } else {
            this.$message({
              type: 'success',
              message: '订单已完成'
            })
          }
          this.getUserOrder()
        })
      },
      notAccept (item) {
        // 1为接单，2不接单，3取消订单
        this.getUserOrder()
      },
      del (item) {
        const userOrderId = item.userOrderId
        _deleteOrder(userOrderId).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'error',
              message: '操作失败'
            })
            return false
          } else if (res.code === 607) {
            this.$message({
              type: 'error',
              message: '订单不存在'
            })
          } else {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          }
          this.getUserOrder()
        })
      },
      cancelOrder (item) {
        const shopId = item.shopId
        _getSopPhone(shopId).then(res => {
          const phone = res.data.shop_phone
          this.$alert(`取消订单需要商家同意，可拨打商家电话：${phone}`, '取消订单', {
            confirmButtonText: '确定'
          })
        })
      },
      getUserOrder () {
        const { pageNum, activeTag } = this
        const userId = this.userInfo.userId
        _getUserOrder(userId, pageNum, activeTag).then(res => {
          this.pageNum = res.data.page
          this.totalPage = res.data.total || 1
          this.currentInfo = res.data.orders
        })
      },
      changeTag (index) {
        if (this.activeTag === index) {
          return false
        }
        this.activeTag = index
        this.pageNum = 1
        this.getUserOrder()
      }
    }
  }
</script>
<style scoped lang='sass'>
  .order
    position: relative
    width: 80%
    margin: 0 auto
    .header
      background: #fff
      ul
        display: flex
        width: 50%
        li
          flex: 1
          line-height: 50px
          text-align: center
          transition: all .1s
          cursor: pointer
          &.active
            box-shadow: 0px -2px #1e89e0 inset
            color: #1e89e0
  .content
    min-height: 550px
    margin: 10px 0
    padding: 15px
    background: #fff
    .orderCard
      margin-bottom: 20px
  .el-pagination
    position: absolute
    bottom: 0
    right: 100px
  .payLocation
    cursor: pointer
    color: red
    &:hover
      text-decoration: underline
</style>
