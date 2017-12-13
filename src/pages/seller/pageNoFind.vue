<template>
  <div class="div">页面已经被吃掉了...  <span class='click' @click='click'>>></span></div>
</template>
<script>
  export default {
    methods: {
      click () {
        this.$router.push('/seller')
      }
    }
  }
</script>
<style lang='sass' scoped>
  .div
    padding: 20px
  .click
    cursor: pointer
</style>
