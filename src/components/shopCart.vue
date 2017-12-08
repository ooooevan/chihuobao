<template>
  <div class='shopCart'>
    <div class="list">
      <shop-cart-item @add='add(item)' @sub='sub(item)' :key ='item.dishId' v-for='item in cartList' :info='item'></shop-cart-item>
    </div>
    <div class="footer">
      <div class="left">总价：{{totalMoney}}</div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import shopCartItem from 'components/shopCartItem'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    shopCartItem
  },
  computed: {
    ...mapGetters('user',
      [
        'cartList'
      ]
    ),
    totalMoney () {
      let money = 0
      this.cartList.forEach(item => {
        money += item.num * item.dishPrice
      })
      return money
    }
  },
  methods: {
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
    .left, .right
      height: 100%
      float: left
    .left
      width: 220px
      background: #2c2c2c
    .right
      width: 130px
      background: #51d862
</style>
