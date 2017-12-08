<template>
  <div class='container order'>
    <div class="header">
      个人中心
    </div>
    <el-table
      :data='rateData'
      @row-click='toggleClick'
      ref='elTable'
      style='width: 100%'>
      <el-table-column type='expand'>
        <template slot-scope='props'>
          <ul>
            <li v-for='item in props.row.foodList'>{{item.rate_name}}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column
        label='下单时间'
        prop='rated_at'>
      </el-table-column>
      <el-table-column
        label='商品名称'
        prop='name'>
      </el-table-column>
      <el-table-column
        label='支付金额'
        prop='payment'>
      </el-table-column>
      <el-table-column
        label='状态'
        prop='status'>
      </el-table-column>
      <el-table-column
        label='操作'
        prop='do'>
        <template slot-scope='scope'>
          <el-button
            size='mini'>订单详情</el-button>
          <el-button
            size='mini'
            type='danger'
            @click.stop='handleRate(scope.$index, scope.row)'>评价订单</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        rateData: [
          {
            name: '匿**户',
            rating_star: 5,
            foodList: [
              {
                food_id: 1630788111,
                image_hash: '',
                rate_name: '牛肉拌云吞面1',
                rating_star: 5,
                rating_text: ''
              },
              {
                food_id: 163078811,
                image_hash: '',
                rate_name: '牛肉拌云吞面2',
                rating_star: 5,
                rating_text: ''
              }
            ],
            rated_at: '2017-11-23',
            payment: 123,
            status: '待评价'
          },
          {
            name: '匿**户',
            rating_star: 5,
            foodList: [],
            rated_at: '2017-11-23',
            payment: 123,
            status: '待评价'
          },
          {
            name: '匿**户',
            rating_star: 5,
            foodList: [],
            rated_at: '2017-11-23',
            payment: 123,
            status: '待评价'
          }]
      }
    },
    created () {
    },
    methods: {
      toggleClick (item) {
        this.$refs.elTable.toggleRowExpansion(item)
      },
      handleRate (index, row) {
        this.$refs.elTable.toggleRowExpansion(row, true)
      }
    }
  }
</script>

<style scoped lang='sass'>
.order
  min-height: 700px
  .header
    margin: 20px auto
  .demo-table-expand
    font-size: 0
  .demo-table-expand 
    label
      width: 90px
      color: #99a9bf
  .demo-table-expand 
    .el-form-item
      margin-right: 0
      margin-bottom: 0
      width: 50%
</style>
