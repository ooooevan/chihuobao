<template>
  <div class='rate'>
    <span>{{data.dishName}}</span>
    <el-rate
      v-model="level"
      show-text>
    </el-rate>
    <input class='commend' type="text" v-model='commend' placeholder="写下对此菜品的评价">
  </div>
</template>
<script>
  export default {
    data () {
      return {
        level: 4,
        commend: ''
      }
    },
    watch: {
      level (newL) {
        this.data.level = newL
        this.$emit('update:data', this.data)
      },
      commend (newC) {
        this.data.commend = newC
        this.$emit('update:data', this.data)
      }
    },
    props: {
      data: {
        type: Object,
        default: {}
      }
    }
  }
</script>
<style scoped lang='sass'>
.rate
  margin-bottom: 15px
  .el-rate
    display: inline-block
    transform: translateY(-3px)
  .commend
    display: block
    border: 1px solid #eee
    margin: 5px
    border-radius: 2px
    outline: none
    line-height: 20px
    &:focus
      border-color: #1e89e0
</style>
