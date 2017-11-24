<template>
  <div id="app">
    <el-header>吃货宝·商家版</el-header>
    <el-container>
      <el-aside>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          :router=true
        >
          <el-menu-item index="1" route='home'>
            <i class="el-icon-location"></i>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="2" route='order'>
            <i class="el-icon-menu"></i>
            <span>订单</span>
          </el-menu-item>
          <el-menu-item index="3" route='menu'>
            <i class="el-icon-setting"></i>
            <span>菜单</span>
          </el-menu-item>
          <el-menu-item index="4" route='new'>
            <i class="el-icon-setting"></i>
            <span>上传新品</span>
          </el-menu-item>
          <el-menu-item index="5" route='revenue'>
            <i class="el-icon-setting"></i>
            <span>营业信息</span>
          </el-menu-item>
          <el-menu-item index="6" route='info'>
            <i class="el-icon-setting"></i>
            <span>商铺信息</span>
          </el-menu-item>
          <el-menu-item index="7" route='statistics'>
            <i class="el-icon-setting"></i>
            <span>统计信息</span>
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
    border: 1px solid #eee
    background: #eee
    padding: 0
</style>
