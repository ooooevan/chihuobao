<template>
  <div class='card' @click='click'>
    <img :src='info.dishImage' width='100' height='100'>
    <div class='message'>
      <p>{{info.dishName}}</p>
      <el-rate
        disabled
        ref='el-rate'
        v-model='_level'
        show-score
        text-color='#ff9900'>
      </el-rate>
      <p>月销售量：{{info.monthlySales}}</p>
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
    computed: {
      _level () {
        return this.$props.info.level
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
