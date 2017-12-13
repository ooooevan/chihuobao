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
import { mapGetters } from 'vuex'
import config from 'common/javascript/config'
import { _newOrder, _payOrder, _handleIsPay } from 'common/javascript/userApi'
export default {
  data () {
    return {
      dialogVisible: false,
      payLocation: '',  // 去支付的链接
      orderCode: 0  // 订单id
    }
  },
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
      const { accMul, accAdd } = config
      let money = 0
      this.cartList.forEach(item => {
        money = accAdd(money, accMul(item.num, item.dishPrice))
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
      if (!shopId || !userId) {
        this.$message({
          type: 'error',
          message: '操作失败'
        })
        return false
      }
      _newOrder(shopId, shopName, userId, cartList, amount, remarks, acceptAddress).then(res => {
        if (res.code === 1) {
          this.orderCode = res.data
          _payOrder(res.data).then(res => {
            this.dialogVisible = true
            this.payLocation = res.data
            window.open(res.data)
          })
        }
      })
    },
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
      // 取消支付
      this.$confirm('确认取消支付?')
            .then(_ => {
              this.$router.push('/order')
            })
            .catch(_ => {})
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
.payLocation
  cursor: pointer
  color: red
  &:hover
    text-decoration: underline
</style>
