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
            <span>{{item.label}}</span><span v-if='item.route === "order" && newOrderNum > 0' class='badge'>{{newOrderNum}}</span>
          </el-menu-item>
          <audio controls="controls" v-show='false' ref='audio'>
            <source src="../../common/audio/song.mp3" type="audio/ogg">
          </audio>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { _isNewOrder, _getFoodType } from 'common/javascript/sellerApi'
import { _getShopType } from 'common/javascript/userApi'
import { mapMutations, mapGetters } from 'vuex'

export default {
  data () {
    return {
      defaultActive: '',
      timer: null,
      routes: [
        // {
        //   route: 'home',
        //   label: '首页'
        // },
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
          route: 'rate',
          label: '菜品评论'
        },
        // {
        //   route: 'revenue',
        //   label: '营业信息'
        // },
        {
          route: 'info',
          label: '商铺信息'
        }
        // {
        //   route: 'statistics',
        //   label: '统计信息'
        // }
      ]
    }
  },
  computed: {
    ...mapGetters('seller',
      [
        'newOrderNum',
        'sellerInfo',
        'shopTypeList',
        'foodTypeList'
      ]
    )
  },
  created () {
    const fullPath = this.$router.currentRoute.path
    const path = fullPath.split('/')[2]
    this.defaultActive = this.routes.findIndex(route => route.route === path) + 1 + ''  // defaultActive需要一个String类型
    // 轮询请求是否有新订单
    this.getShopType()
    this.getFoodType()
    this.isNewOrder()
    this.timer = setInterval(() => {
      this.isNewOrder()
    }, 10000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    getShopType () {
      _getShopType().then(res => {
        this.setShopType(res.data)
      })
    },
    getFoodType () {
      const { shopId } = this.sellerInfo
      _getFoodType(shopId).then(res => {
        this.setFoodType(res.data.list)
      })
    },
    isNewOrder () {
      const shopId = this.sellerInfo.shopId
      _isNewOrder(shopId).then(res => {
        if (res.code === 1 && res.data > 0) {
          this.setNewOrderNum(res.data)
          this.$refs.audio.play()
        }
      })
    },
    ...mapMutations({
      setNewOrderNum: 'seller/SET_NEW_ORDER_NUM',
      setShopType: 'seller/SET_SHOPTYPE',
      setFoodType: 'seller/SET_FOODTYPE'
    })
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
    background: #fff
    padding: 0
  .badge
    display: inline-block
    color: #fff
    height: 20px
    width: 20px
    border-radius: 10px
    background: red
    margin-left: 10px
    border: 1px solid #FFF
    line-height: 20px
    text-align: center
</style>
