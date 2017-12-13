<template>
  <div class='success'>支付成功, {{second}} 秒后返回首页...</div>
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
      }
    }
  }
</script>

<style lang='sass' scoped>
  .success
    height: 550px
    text-align: center
    padding-top: 200px
</style>
