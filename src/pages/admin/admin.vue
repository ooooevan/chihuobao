<template>
  <el-container>
    <el-aside>
      <el-menu
        :default-active='defaultActive'
        class="el-menu-vertical-demo"
        background-color="#404040"
        active-text-color='#108ee9'
        text-color="#fff"
        :router=true
      >
        <!-- <el-menu-item index="1" route='home'>
          <i class="el-icon-location"></i>
          <span>首页</span>
        </el-menu-item> -->
        <el-menu-item index="2" route='user'>
          <i class="el-icon-menu"></i>
          <span>用户管理</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>商铺管理</span>
          </template>
          <el-menu-item index="3-1" route='audit'>商铺审核</el-menu-item>
          <el-menu-item index="3-2" route='shops'>全部商铺</el-menu-item>
        </el-submenu>
        <el-menu-item index="4" route='classification'>
          <i class="el-icon-setting"></i>
          <span>分类管理</span>
        </el-menu-item>
        <!-- <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>分类管理</span>
          </template>
          <el-menu-item index="4-1" route='shopsClassification'>商铺分类</el-menu-item>
          <el-menu-item index="4-2" route='goodsClassification'>商品分类</el-menu-item>
        </el-submenu> -->
        <el-menu-item index="6" route='administrator' v-if='adminInfo.flagSuper === 1'>
          <i class="el-icon-setting"></i>
          <span>管理员</span>
        </el-menu-item>
        <!-- <el-menu-item index="5" route='statistics'>
          <i class="el-icon-setting"></i>
          <span>统计管理</span>
        </el-menu-item> -->
      </el-menu>
    </el-aside>
    <!-- <admin-login @close='close' :visible='loginVisible'></admin-login> -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
// import adminLogin from './adminLogin'
import { _getShopType } from 'common/javascript/userApi'
import { mapMutations, mapGetters } from 'vuex'
export default {
  // components: {
  //   adminLogin
  // },
  data () {
    return {
      // loginVisible: false,
      defaultActive: '2'
    }
  },
  computed: {
    ...mapGetters('admin',
      [
        'adminInfo',
        'reLogin'
      ]
    )
  },
  watch: {
    reLogin (lll) {
      if (lll) {
        this.$router.push('/admin')
        this.setReLogin(false)
      }
    }
  },
  created () {
    // 判断是否登录，弹出窗口
    // if (this.adminInfo && this.adminInfo.adminName) {
    //   this.loginVisible = false
    // }
    const fullPath = this.$router.currentRoute.path
    const path = fullPath.split('/')[2]
    switch (path) {
      case 'home':
        this.defaultActive = '1'
        break
      case 'user':
        this.defaultActive = '2'
        break
      case 'audit':
        this.defaultActive = '3-1'
        break
      case 'shops':
        this.defaultActive = '3-2'
        break
      case 'classification':
        this.defaultActive = '4'
        break
      case 'shopsClassification':
        this.defaultActive = '4-1'
        break
      case 'goodsClassification':
        this.defaultActive = '4-2'
        break
      case 'statistics':
        this.defaultActive = '5'
        break
      case 'administrator':
        this.defaultActive = '6'
        break
      default:
        this.defaultActive = '2'
        break
    }
  },
  methods: {
    ...mapMutations({
      setShopType: 'admin/SET_SHOPTYPE',
      setReLogin: 'admin/SET_RE_LOGIN'
    }),
    getShopType () {
      _getShopType().then(res => {
        this.setShopType(res.data)
      })
    },
    close () {
      this.loginVisible = false
    }
  }
}
</script>

<style scoped lang='sass'>
  .el-header
    height: 50px!important
    line-height: 50px
    background: #404040
  .el-container
    height: 100%
  .el-aside
    background: #404040
    width: 230px!important
    .el-menu
      border-right: none
  .el-submenu .el-menu-item
    text-indent: 14px
  .el-main
    background: #eee
    padding: 0
  .container
    width: 100%
    height: 100%
</style>
