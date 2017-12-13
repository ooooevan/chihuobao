<template>
  <div class="order" ref='order'>
    <div class="header">
      <ul>
        <li @click='changeTag(tag.value)' :key='index' :class='{active: tag.value === activeTag}' v-for='(tag, index) in orderTag'>{{tag.label}}</li>
      </ul>
    </div>
    <div class="wrapper">
      <div class="content">
        <!-- <order-card :key='index' @accept='accept' @cancel='cancelOrder' class='orderCard' v-for='(item, index) in info' :info='item'></order-card> -->
        <order-card @accept='accept' @notAccept='notAccept' @cancel='cancelOrder' class='orderCard' :info='currentInfo.filter(item => item.orderStatus === activeTag)'></order-card>
      </div>
      <el-pagination
        class='el-pagination'
        layout="prev, pager, next"
        :page-size='pageSize'
        @current-change='changePage'
        :page-count="totalPage">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import orderCard from 'components/sellerOrderCard'
  import { _getSellerOrder, _handleOrder } from 'common/javascript/sellerApi'
  import { mapMutations, mapGetters } from 'vuex'

  export default {
    components: {
      orderCard
    },
    data () {
      return {
        orderTag: [
          {
            value: 3,
            label: '新订单'
          },
          {
            value: 4,
            label: '进行中'
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
        activeTag: 3,
        pageNum: 1,
        totalPage: 1,
        pageSize: 7,
        currentInfo: []
      }
    },
    mounted () {
      // 请求订单数据
      this.getSellerOrder()
      // 进入订单路由就返回顶部方便看订单
      document.getElementsByClassName('el-main')[0].scrollTo(0, 0)
    },
    computed: {
      ...mapGetters('seller',
        [
          'sellerInfo',
          'newOrderNum'
        ]
      )
    },
    watch: {
      newOrderNum () {
        this.getSellerOrder()
      }
    },
    methods: {
      changePage (page) {
        this.pageNum = page
        this.getSellerOrder()
      },
      accept (item) {
        // 1为接单，2不接单，3取消订单
        const shopId = this.sellerInfo.shopId
        console.log(shopId)
        const shopOrderId = item.shopOrderId
        const type = 1
        _handleOrder(shopId, shopOrderId, type).then(res => {
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '订单已接收'
            })
          } else {
            this.$message({
              type: 'error',
              message: '操作失败'
            })
          }
        })
        this.getSellerOrder()
      },
      notAccept (item) {
        // 1为接单，2不接单，3取消订单
        const shopId = this.sellerInfo.shopId
        const shopOrderId = item.shopOrderId
        const type = 2
        _handleOrder(shopId, shopOrderId, type).then(res => {
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '已拒接一个订单'
            })
          } else {
            this.$message({
              type: 'error',
              message: '操作失败'
            })
          }
        })
        this.getSellerOrder()
      },
      cancelOrder (item) {
        // 1为接单，2不接单，3取消订单
        const shopId = this.sellerInfo.shopId
        const shopOrderId = item.shopOrderId
        const type = 3
        _handleOrder(shopId, shopOrderId, type).then(res => {
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '已取消订单'
            })
          } else {
            this.$message({
              type: 'error',
              message: '操作失败'
            })
          }
        })
        this.getSellerOrder()
      },
      getSellerOrder () {
        const { pageNum, activeTag } = this
        const shopId = this.sellerInfo.shopId
        _getSellerOrder(shopId, pageNum, activeTag).then(res => {
          this.pageNum = res.data.pageNum
          this.totalPage = res.data.totalPage
          this.currentInfo = res.data.shopOrders
          if (activeTag === 3) {
            this.setNewOrderNum(res.data.shopOrders.length)
          }
        })
      },
      changeTag (index) {
        if (this.activeTag === index) {
          return false
        }
        this.activeTag = index
        this.pageNum = 1
        this.getSellerOrder()
      },
      ...mapMutations({
        setNewOrderNum: 'seller/SET_NEW_ORDER_NUM'
      })
    }
  }
</script>
<style scoped lang='sass'>
  .order
    position: relative
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
  .wrapper
    background: #eee
    padding: 10px
  .content
    height: 550px
    padding: 15px
    background: #fff
    .orderCard
      margin-bottom: 20px
  .el-pagination
    position: absolute
    bottom: 25px
    right: 100px
</style>
