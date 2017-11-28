<template>
  <div class='card'>
    <p>共支付：<span class='cost'>{{info.cost}}</span></p>
    <input type="button" class='btn' @click='accept' value='接收订单'>
    <input type="button" class='btnN' @click='confirm' value='不接单'>
    <p class='userInfo'>{{info.user.user_name}}&nbsp;&nbsp;&nbsp;{{info.user.user_phone}}</p>
    <p>地址：{{info.address}}</p>
    <p>备注：{{info.note}}</p>
    
    <el-table
      :data="info.list"
      show-summary
      >
      <el-table-column
        prop="name"
        label="商品名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="num"
        label="数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="price"
        label="金额"
        width="180">
      </el-table-column>
    </el-table>
    <div class="rate">
      <p>评价：{{info.rate || '未评价'}}</p>
      <p>回复：
        <input class='reply' type="text" v-model='reply' @keyup.enter='doReply'>
        <input class='replyBtn' type="button" value='回复' @click='doReply'>
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        reply: ''
      }
    },
    props: {
      info: {
        type: Object,
        default: {}
      }
    },
    methods: {
      doReply () {
        alert(this.reply)
      },
      accept () {
        this.$emit('accept', this.info)
      },
      confirm () {
        this.$confirm('确认取消订单吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('cancel', this.info)
          this.$message({
            type: 'success',
            message: '已取消订单'
          })
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
    border: 1px solid #eee
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
  .reply
    border: 1px solid #eee
    height: 20px
    padding: 3px
    border-radius: 3px
  .replyBtn
    height: 28px
    margin-left: 10px
    padding: 3px 10px
    border-radius: 3px
    background: #409eff
    color: #fff
    outline: none
</style>
