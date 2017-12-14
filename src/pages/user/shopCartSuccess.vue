<template>
  <div class='success'>支付成功, {{second}} 秒后返回首页...</div>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        second: 5,
        timer: 0
      }
    },
    created () {
      this.mins()
      this.clearCartList()
    },
    beforeDestroy () {
      clearTimeout(this.timer)
    },
    methods: {
      ...mapActions('user',
        [
          'clearCartList'
        ]
      ),
      mins () {
        this.timer = setTimeout(() => {
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
