<template>
  <header>
    <div class="container clearfix">
      <router-link to="/place" tag='a' class='fl nav logo'><!--<img :src='logo' />-->吃货宝</router-link>
      <router-link v-show="!home" to="/place" tag='a' class='fl nav'>首 页</router-link>
      <router-link v-show="!home" to="/order" tag='a' class='fl nav'>我的订单</router-link>
      <!-- <router-link v-show="!home" to="/join" tag='a' class='fl nav'>商家入驻</router-link> -->
      <router-link class='kaidian fr' to="" v-if='!userInfo.userName'><span @click='kaidian'>我要开店</span></router-link>
      <el-col :span="12" class='fr nav userName' v-if='userInfo.userName'>
        <el-dropdown :show-timeout='timeout'>
          <span class="el-dropdown-link">
            {{userInfo.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><router-link to="/profile">个人中心</router-link></el-dropdown-item>
            <el-dropdown-item><router-link to=""><span @click='kaidian'>我要开店</span></router-link></el-dropdown-item>
            <el-dropdown-item><router-link to=""><p @click='logOut'>退出</p></router-link></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <router-link to='' tag='a' class='fr nav rightNav' v-else>
        <router-link class='login' to="/login">登录</router-link>
        <router-link class='login' to="/register">| 注册</router-link>
      </router-link>
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
      userInfo: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data () {
      return {
        timeout: 150
      }
    },
    methods: {
      kaidian () {
        this.$emit('kaidian')
      },
      logOut () {
        this.$emit('logOut')
      }
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
  .router-link-active
    background: #006bc7
    &:hover
      background: #006bc7
  .fr
    text-align: right
    &:hover
      background: transparent
    &.router-link-active
      background: transparent
  .rightNav
    width: 100px
  .login
    color: #fff
    background: transparent
    &.router-link-active
      background: transparent
    &:hover
      background: transparent
  .el-dropdown-link
    color: #fff
    line-height: 60px
    display: block
    cursor: default
  .el-dropdown-menu
    .router-link-active
      background: transparent
  .kaidian
    margin-top: 20px
    margin-left: 10px
    padding: 3px
    font-size: 12px
    color: #fff
    background: #5db423!important
    border-radius: 3px
    &:hover
      background: #5db423
  .userName
    width: 200px
</style>
