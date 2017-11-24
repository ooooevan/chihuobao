<template>
  <div class='shopCard clearfix' @click='select'>
    <img :src='info.img' width='70' height='70'>
    <div class="message">
      <p class='name'>{{info.name}}</p>
      <el-rate
        disabled
        ref='el-rate'
        v-model='info.score'
        show-score
        text-color='#ff9900'>
      </el-rate>
      <p class='perMonth'>{{`月销${info.perMonth}单`}}</p>
      <p class='dispatchCost'>{{`配送费￥${info.dispatchCost}`}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      info: {
        type: Object,
        default: {}
      }
    },
    mounted () {
      this.$refs['el-rate'].$el.querySelectorAll('.el-rate__icon').forEach(item => {
        item.style.fontSize = '14px'
      })
    },
    methods: {
      select () {
        this.$emit('select', this.info)
      }
    }
  }
</script>
<style scoped lang='sass'>
  .shopCard
    height: 118px
    padding: 20px
    box-sizing: border-box
    transition: all .1s
    cursor: pointer
    &:hover
      background: #eee
    &:hover .message .name
      color: #006bc7
    img
      vertical-align: middle
      display: inline-block
    .message
      display: inline-block
      vertical-align: top
      margin-left: 10px
      p
        margin-top: 3px
      .name
        font-size: 15px
        font-weight: 600
      .perMonth, .dispatchCost
        font-size: 13px
      // .perMonth
        float: left
      // .dispatchCost
        float: right
      
      
</style>
