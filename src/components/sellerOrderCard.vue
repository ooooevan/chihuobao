<template>
  <div class='card'>
    <el-table
    :data="info"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
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
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button @click="accept(scope.row)" v-if='scope.row.orderStatus === 3' class='accept' type="text" size="small">接单</el-button>
        <el-button @click="notAccept(scope.row)" v-if='scope.row.orderStatus === 3' type="text" size="small">不接单</el-button>
        <!-- <el-button @click="dispatch(scope.row)" v-if='scope.row.orderStatus === 4' class='accept' type="text" size="small">配送</el-button> -->
        <!-- <el-button @click="finish(scope.row)" v-if='scope.row.orderStatus === 4' class='accept' type="text" size="small">完成</el-button> -->
        <el-button @click="cancel(scope.row)" v-if='scope.row.orderStatus !== 5 && scope.row.orderStatus !== 2 && scope.row.orderStatus !== 3' class='notAccept' type="text" size="small">取消订单</el-button>
        <el-button v-if='scope.row.orderStatus === 2' class='disabled' type="text" size="small">已完成</el-button>
        <el-button v-if='scope.row.orderStatus === 5' class='disabled' type="text" size="small">已取消</el-button>
      </template>
    </el-table-column>
    <el-table-column
      label="订单金额"
      prop="orderAmount">
    </el-table-column>
    <el-table-column
      label="联系电话"
      prop="userPhone">
    </el-table-column>
    <el-table-column
      label="收货地址"
      prop="acceptAddress">
    </el-table-column>
    <el-table-column
      label="备注"
      prop="orderRemarks">
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
  export default {
    props: {
      info: {
        type: Array,
        default: []
      }
    },
    methods: {
      accept (item) {
        this.$emit('accept', item)
      },
      notAccept (item) {
        this.$confirm('确认不接收订单吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('notAccept', item)
        }).catch(() => {
          console.log(`取消不接订单`)
        })
      },
      dispatch (item) {
        this.$emit('dispatch', item)
      },
      cancel (item) {
        this.$confirm('确认取消订单吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('cancel', item)
        }).catch(() => {
          console.log(`没有取消订单`)
        })
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
