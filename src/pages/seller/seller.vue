<template>
  <div id="app">
    <el-header>吃货宝·商家版</el-header>
    <el-container>
      <el-aside>
        <el-menu
          :default-active='defaultActive'
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          :router=true
        >
          <el-menu-item :key='index' :index='(index+1)+""' :route='item.route' v-for='(item, index) in routes'>
            <i class="el-icon-location"></i>
            <span>{{item.label}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  data () {
    return {
      defaultActive: '',
      routes: [
        {
          route: 'home',
          label: '首页'
        },
        {
          route: 'order',
          label: '订单'
        },
        {
          route: 'menu',
          label: '菜单'
        },
        {
          route: 'new',
          label: '上传新品'
        },
        {
          route: 'revenue',
          label: '营业信息'
        },
        {
          route: 'info',
          label: '商铺信息'
        },
        {
          route: 'statistics',
          label: '统计信息'
        }
      ]
    }
  },
  created () {
    const fullPath = this.$router.currentRoute.path
    const path = fullPath.split('/')[2]
    this.defaultActive = this.routes.findIndex(route => route.route === path) + 1 + ''  // defaultActive需要一个String类型
  }
}
</script>

<style scoped lang='sass'>
  #app
    height: 100%
  .el-header
    height: 50px!important
    line-height: 50px
    background: #409eff
    color: #fff
  .el-container
    height: calc(100% - 50px)
  .el-aside
    background: #545c64
    width: 230px!important
    .el-menu
      border-right: none
  .el-main
    // border: 1px solid #eee
    background: #eee
    padding: 0
</style>
