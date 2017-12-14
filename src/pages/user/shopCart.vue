<template>
  <div class='shopCart'>
    <div class="list">
      <shop-cart-item @add='add(item)' @sub='sub(item)' :key ='item.dishId' v-for='item in shopCartList' :info='item'></shop-cart-item>
    </div>
    <div class="footer">
      <div class="left">总价：{{totalMoney}}<span class='shopDeliveryCost'>   配送费：{{shopDetail.shopDeliveryCost}}元</span></div>
      <div class="right-" v-if='totalMoney > shopDetail.shopStartDelivery' @click='goPay'>
        去支付
      </div>
      <div class="right" v-else>
        {{shopDetail.shopStartDelivery}}元起送
      </div>
    </div>
  </div>
</template>

<script>
import shopCartItem from 'components/shopCartItem'
import { mapGetters, mapActions } from 'vuex'
import config from 'common/javascript/config'
export default {
  components: {
    shopCartItem
  },
  computed: {
    ...mapGetters('user',
      [
        'cartList',
        'shopDetail'
      ]
    ),
    shopCartList () {
      return this.cartList.filter(item => (item.dishId))
    },
    totalMoney () {
      const { accAdd, accMul } = config
      let money = 0
      const shopDeliveryCost = this.shopDetail.shopDeliveryCost
      this.cartList.filter(item => (item.dishId)).forEach(item => {
        money = accAdd(money, accMul(item.num, item.dishPrice))
      })
      if (this.cartList.filter(item => (item.dishId)).length > 0) {
        money = accAdd(money, shopDeliveryCost)
      }
      return money
    }
  },
  methods: {
    goPay () {
      const item = this.cartList[0]
      this.add({
        dishName: '配送费',
        dishPrice: item.shopDeliveryCost,
        shopId: item.shopId,
        shopName: item.shopName
      })
      this.$router.push('/shopCart/checkout')
    },
    add (item) {
      this.addCartNum(item)
    },
    sub (item) {
      this.subCartNum(item)
    },
    ...mapActions('user',
      [
        'addCartNum',
        'subCartNum'
      ]
    )
  }
}
</script>

<style lang='sass'>
.shopCart
  position: fixed
  z-index: 100
  right: 0
  bottom: 0
  width: 350px
  .list
    border-top: 2px solid #1e89e0
    background: #fff
    padding: 5px
  .footer
    height: 50px
    width: 100%
    .left, .right-, .right
      height: 100%
      float: left
      line-height: 50px
      color: #fff
    .left
      width: 220px
      text-indent: 10px
      background: #2c2c2c
      .shopDeliveryCost
        font-size: 14px
        color: #999
    .right
      width: 130px
      text-align: center
      background: #b9b4b4
      color: #000
      cursor: default
    .right-
      width: 130px
      text-align: center
      background: #51d862
      cursor: pointer
</style>
