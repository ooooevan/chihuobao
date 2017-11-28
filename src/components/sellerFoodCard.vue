<template>
  <div class='card' @click='click'>
    <img :src='info.img'>
    <div class='message'>
      <p>{{info.name}}</p>
      <el-rate
        disabled
        ref='el-rate'
        v-model='info.score'
        show-score
        text-color='#ff9900'>
      </el-rate>
      <p>{{info.perMonth}}</p>
      <p>{{`配送费￥${info.dispatchCost}`}}</p>
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
    methods: {
      click () {
        this.$emit('click', this.info)
      }
    }
  }
</script>
<style scoped lang='sass'>
.card
  text-align: center
  transition: all .2s
  padding: 20px 0
  cursor: pointer
  &:hover
    // box-shadow: 0 0 1px #004
    background: #f3f3f3
</style>
