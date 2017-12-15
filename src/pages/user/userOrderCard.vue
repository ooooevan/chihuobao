<template>
  <div class='card'>
    <el-table
    :data="_info"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <!-- <p>共支付：<span class='cost'>{{props.row.amount}}</span></p>
          <p class='userInfo'>{{props.row.userName}}&nbsp;&nbsp;&nbsp;{{props.row.shopNamme}}</p>
          <p>地址：{{props.row.acceptAddress}}</p>
          <p>备注：{{props.row.remarks}}</p> -->
          <el-table
            :data="props.row.dishs"
            show-summary
            >
            <el-table-column
              prop="dishName"
              label="商品名">
            </el-table-column>
            <el-table-column
              prop="dishNum"
              label="数量">
            </el-table-column>
            <el-table-column
              prop="dishPrice"
              label="单价">
            </el-table-column>
          </el-table>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="订单金额"
      prop="amount">
    </el-table-column>
    <el-table-column
      label="店铺"
      prop="shopNamme">
    </el-table-column>
    <el-table-column
      label="收货地址"
      prop="acceptAddress">
    </el-table-column>
    <el-table-column
      label="备注"
      prop="remarks">
    </el-table-column>
    <el-table-column
      label="日期"
      prop="createTime">
    </el-table-column>
    <el-table-column
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button @click="goaccept(scope.row)" v-if='scope.row.status === 1' class='accept' type="text" size="small">去支付</el-button>
        <el-button @click="accept(scope.row)" v-if='scope.row.status === 4' class='accept' type="text" size="small">已收货</el-button>
        <!-- <el-button @click="dispatch(scope.row)" v-if='scope.row.status === 4' class='accept' type="text" size="small">配送</el-button> -->
        <!-- <el-button @click="finish(scope.row)" v-if='scope.row.status === 4' class='accept' type="text" size="small">完成</el-button> -->
        <el-button @click="cancel(scope.row)" v-if='scope.row.status === 1 || scope.row.status === 3 || scope.row.status === 4' class='notAccept' type="text" size="small">取消订单</el-button>
        <el-button @click="showRate(scope.row)" v-if='scope.row.status === 2 && !scope.row.isComment' class='accept' type="text" size="small">评价</el-button>
        <el-button v-if='scope.row.status === 2 && scope.row.isComment' class='disabled' type="text" size="small">已评价</el-button>
        <el-button v-if='scope.row.status === 5' class='disabled' type="text" size="small">已取消</el-button>
        <el-button @click="del(scope.row)" v-if='scope.row.status === 2 || scope.row.status === 5' class='notAccept' type="text" size="small">删除订单</el-button>
      </template>
    </el-table-column>
  </el-table>
  <rate-card class='rateCard' @haveRated='haveRated' :visible='rateVisible' @close='closeRate' :info='rateItems'></rate-card>
  </div>
</template>
<script>
  import rateCard from './rateCard'
  export default {
    components: {
      rateCard
    },
    data () {
      return {
        rateVisible: false,
        rateItems: []
      }
    },
    props: {
      info: {
        type: Array,
        default: []
      }
    },
    computed: {
      _info () {
        return this.$props.info.map((item, index) => {
          return Object.assign(this.$props.info[index], {
            createTime: this.$moment(this.$props.info.createTime).format('YYYY-MM-DD HH:mm:ss')
          })
        })
      }
    },
    methods: {
      goaccept (item) {
        this.$emit('goaccept', item)
      },
      accept (item) {
        this.$emit('accept', item)
      },
      showRate (item) {
        this.rateItems = item.dishs.filter(item => (item.dishId))
        // 将商家id等填入
        this.rateItems.forEach(ite => {
          ite.userId = item.userId
          ite.userOrderId = item.userOrderId
          ite.shopId = item.shopId
        })
        this.rateVisible = true
      },
      haveRated () {
        this.$emit('haveRated')
      },
      dispatch (item) {
        this.$emit('dispatch', item)
      },
      cancel (item) {
        this.$emit('cancel', item)
      },
      del (item) {
        this.$confirm('确认删除订单吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('del', item)
        }).catch(() => {
          console.log(`没有删除订单`)
        })
      },
      closeRate () {
        this.rateVisible = false
      }
    }
  }
</script>
<style scoped lang='sass'>
  .card
    padding: 10px
    height: 100%
    position: relative
    .cost
      font-size: 20px
      color: red
    p
      margin: 10px
    .btn
      float: right
      padding: 10px
      border-radius: 3px
      transform: translateY(-25px)
      background: #49a2ff
      color: #fff
      outline: none
      cursor: pointer
      &:hover
        background: #409eff
    .btnN
      float: right
      margin-right: 10px
      transform: translateY(-9px)
      font-size: 14px
      border-radius: 2px
      padding: 3px
  .accept
    background: #409eff
    padding: 10px 15px
    color: #fff
  .notAccept
    font-size: 12px
  .disabled
    color: #ccc
    cursor: auto
  .el-pagination
    position: absolute
    bottom: 25px
    right: 100px
</style>
