<template>
  <div class="order">
    <div class="header">
      <ul>
        <li @click='changeTag(index)' :class='{active: tag === activeTag}' v-for='(tag, index) in orderTag'>{{tag}}</li>
      </ul>
    </div>
    <div class="content">
      <order-card :key='index' @accept='accept' @cancel='cancelOrder' class='orderCard' v-for='(item, index) in info' :info='item'></order-card>
    </div>
  </div>
</template>
<script>
  import config from 'common/javascript/config'
  import orderCard from 'components/sellerOrderCard'

  export default {
    components: {
      orderCard
    },
    data () {
      return {
        orderTag: config.orderTag,
        activeTag: config.orderTag[0],
        info: [
          {
            cost: 34,
            user: {
              user_name: '小明',
              user_phone: 14256789
            },
            address: '地址地址地址',
            note: '不要辣',
            status: 0,
            list: [
              {
                name: '咖喱饭',
                price: 10,
                num: 1
              },
              {
                name: '咖喱饭2',
                price: 12,
                num: 2
              }
            ]
          },
          {
            cost: 34,
            user: {
              user_name: '小明2',
              user_phone: 14256789
            },
            address: '地址地址地址',
            note: '不要辣',
            status: 0,
            list: [
              {
                name: '咖喱饭',
                price: 10,
                num: 1
              },
              {
                name: '咖喱饭2',
                price: 12,
                num: 2
              }
            ]
          }
        ]
      }
    },
    methods: {
      accept (item) {
        alert(`接收订单：${item}`)
      },
      cancelOrder (item) {
        // alert(`将要取消订单：${item}`)
      },
      changeTag (index) {
        this.activeTag = config.orderTag[index]
      }
    }
  }
</script>
<style scoped lang='sass'>
  .order
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
    min-height: 500px
    margin: 10px
    padding: 15px
    background: #fff
    .orderCard
      width: 550px
      margin-bottom: 20px
</style>
