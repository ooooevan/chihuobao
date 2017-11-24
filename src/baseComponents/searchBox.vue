<template>
  <div class='searchProp'>
    <input class='input' @keyup.enter='search' v-model='query' type="text" placeholder='搜索...'><span @click='search' class='icon el-icon-search'></span>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        query: ''
      }
    },
    methods: {
      search () {
        this.$emit('search', this.query)
      }
    },
    watch: {
    }
  }
</script>
<style lang='sass' scoped>
  .searchProp
    position: relative
  .input
    line-height: 25px
    border: 1px solid #eee
    font-size: 15px
    padding: 5px
    padding-left: 10px
    border-right: none
    outline: none
  .icon
    background: #fff
    padding: 0 10px
    border: 1px solid #eee
    border-left: none
    line-height: 35px
</style>
