<template>
  <div class='success'>假装正在支付.. {{second}} 秒后关闭页面...多次点击已支付即可下一步</div>
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
            window.close()
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
