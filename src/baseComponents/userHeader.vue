<template>
  <header>
    <div class="container clearfix">
      <router-link to="/" tag='a' class='fl nav logo'><!--<img :src='logo' />-->吃货宝</router-link>
      <router-link v-show="!home" to="/place" tag='a' class='fl nav'>首 页</router-link>
      <router-link v-show="!home" to="/order" tag='a' class='fl nav'>我的订单</router-link>
      <!-- <router-link v-show="!home" to="/join" tag='a' class='fl nav'>商家入驻</router-link> -->
      <router-link to="/register" tag='a' class='fr nav'>登录 | 注册</router-link>
      
    </div>
  </header>
</template>
<script>
  export default {
    props: {
      home: {
        type: Boolean,
        default: false
      },
      logo: {
        type: String,
        default: ''
      },
      profile: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    created () {
      // debugger
    }
  }
</script>
<style lang='sass' scoped>
  @import '../common/style/variable.sass'
  header
    background-color: #1e89e0
  .container
    margin: 0 auto
    width: 80%
  .logo
    font-size: 28px
    margin-right: 10px
    text-decoration: none
    color: #fff
    background: transparent!important
  .nav
    width: 100px
    color: #fff
    line-height: 60px
    text-align: center
    &:hover
      background: #0c77d1
  .fr
    text-align: right
  .fr:hover
    background: transparent
  .router-link-exact-active
    background: #006bc7
    &:hover
      background: #006bc7
</style>
