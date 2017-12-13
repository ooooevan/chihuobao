<template>
  <div class='success'>支付失败, {{second}} 秒后返回首页...  <span class='click' @click='click'>重新查看</span></div>
</template>
<script>
  export default {
    data () {
      return {
        second: 5
      }
    },
    created () {
      this.mins()
    },
    methods: {
      mins () {
        setTimeout(() => {
          if (this.second === 1) {
            this.$router.push('/place')
          } else {
            this.second--
            this.mins()
          }
        }, 1000)
      },
      click () {
        this.$router.push('/shopCart/checkout')
      }
    }
  }
</script>

<style lang='sass' scoped>
  .success
    height: 550px
    text-align: center
    padding-top: 200px
    .click
      color: red
      cursor: pointer
</style>
