<template>
  <div class='item'>
    <div class='name'>{{info.dishName}}</div>
    <el-input-number @change='change' size="mini" v-model="num"></el-input-number>
    <div class='price'>￥{{info.dishPrice * num}}</div>
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
      num () {
        return this.$props.info.num
      }
    },
    methods: {
      change (newNum) {
        if (newNum === (this.num + 1)) {
          this.$emit('add')
        } else {
          this.$emit('sub')
        }
      }
    }
  }
</script>

<style lang='sass'>
.item
  font-size: 15px
  line-height: 50px
  div
    display: inline-block
  .name
    width: 100px
  .el-input-number
    width: 140px
  .price
    width: 80px
    font-size: 14px
    text-indent: 50px
    color: #f17530
</style>
