<template>
  <div class="checkout">
    <div class="title">确认订单</div>
    <el-table
      :data="cartList"
      style="width: 50%;margin: 0 auto">
      <el-table-column
        prop="dishName"
        label="商品"
        width="180">
      </el-table-column>
      <el-table-column
        prop="num"
        label="数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="dishPrice"
        label="单价">
      </el-table-column>
    </el-table>
    <div class='total'>
      总计： <span class='money'>{{totalMoney}}</span>元&nbsp;&nbsp;&nbsp;
    </div>
    <el-form ref="form" :model="form" label-width="80px" label-position="left">
      <el-form-item label="备注">
        <el-input v-model="form.remarks"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.acceptAddress"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即支付</el-button>
      </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { _newOrder, _payOrder } from 'common/javascript/userApi'
export default {
  computed: {
    ...mapGetters('user', [
      'cartList',
      'userInfo'
    ]),
    form () {
      return {
        remarks: '',
        acceptAddress: this.userInfo.acceptAddress
      }
    },
    totalMoney () {
      let money = 0
      this.cartList.forEach(item => {
        money += item.num * item.dishPrice
      })
      return money
    }
  },
  methods: {
    onSubmit () {
      const { userId } = this.userInfo
      let shopId
      let shopName
      const cartList = this.cartList.filter(item => (item.dishType)).map(item => {
        shopId = item.shopId
        shopName = item.shopName
        return {
          dishId: item.dishId,
          dishName: item.dishName,
          dishNum: item.num,
          dishPrice: item.dishPrice
        }
      })
      const amount = this.totalMoney
      const { remarks, acceptAddress } = this.form
      _newOrder(shopId, shopName, userId, cartList, amount, remarks, acceptAddress).then(res => {
        if (res.code === 1) {
          _payOrder(res.data).then(res => {
            debugger
          })
        }
      })
    }
  }
}
</script>

<style scoped lang='sass'>
.checkout
  background: #fff
  padding-bottom: 20px
  .title
    text-align: center
    padding: 20px
    font-size: 25px
.total
  width: 50%
  margin: 20px auto
  text-align: right
  color: red
  .money
    font-size: 30px
.el-form
  width: 50%
  margin: 0 auto
</style>
