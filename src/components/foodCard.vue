<template>
  <div class="card" ref='card'>
    <img :src="info.img" @click='detail'>
    <div class="message">
      <p class='name'>{{info.name}}</p>
      <p class='abstract'>{{info.abstract.length > 15 ? `${info.abstract.substr(0, 15)}...` : info.abstract}}</p>
      <div class="clearfix padding">
        <el-rate
          disabled
          ref='el-rate'
          v-model='info.score'
          :allow-half='allowHalf'
          show-score
          text-color='#ff9900'>
        </el-rate>
        <p class='perMonth'>月售{{info.perMonth}}份</p>
      </div>
      <span class='money'>￥{{info.money}}</span>
      <div :class="status" @click='addToCart'>加入购物车</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      info: {
        type: Object,
        default: {}
      },
      status: {
        type: String,
        default: 'on'
      }
    },
    data () {
      return {
        allowHalf: true
      }
    },
    mounted () {
      this.$refs['el-rate'].$el.querySelectorAll('.el-rate__icon').forEach(item => {
        item.style.fontSize = '14px'
      })
    },
    methods: {
      detail () {
        this.$emit('detail', this.info)
      },
      addToCart () {
        if (this.status === 'on') {
          this.$emit('addOne', this.info)
        }
      }
    }
  }
</script>
<style scoped lang='sass'>
  .card
    display: flex
    img
      vertical-align: middle
      flex: 0 0 100px
      height: 100px
      cursor: pointer
    .message
      flex: 1
      vertical-align: top
      padding: 5px
      padding-left: 15px
      p
        margin: 6px 0
      .name
        margin-top: 0
        font-size: 15px
        font-weight: 600
      .abstract
        font-size: 14px
        color: #999
        text-overflow: ellipsis
        white-space: nowrap
        overflow: hidden
      .el-rate
        float: left
        .el-rate__item
          .el-rate__icon
            font-size: 13px
      .perMonth
        font-size: 13px
        color: #999
        float: left
        line-height: 9px
        text-indent: 5px
      .padding
        padding-bottom: 8px
      .money
        font-size: 16px
        color: red
      .on, .off
        float: right
        padding: 4px 10px
        border-radius: 12px
        font-size: 13px
        color: #fff
        cursor: pointer
      .on
        background: #1e89e0
      .off
        background: #c3c3c3
      
</style>
