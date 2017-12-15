<template>
  <div class='container'>
    <div class="header clearfix">
      <div class="address">
        <span>当前位置：</span>
        <span>{{exactAddress && exactAddress.name}}</span>
        <span @click='changeAddress' class='changeAddress'>[切换地址]</span>
      </div>
      <search-box class='search' @search='search'></search-box>
    </div>
    <seller-filter class='filter' :filterList='shopTypeList' @select='filterSelect'></seller-filter>
    <div class="content clearfix">
      <shop-card :key='item.shopId' class='shopCard' :info='item' @select='selectShop' v-for='item in shopList'></shop-card>
      <div class='loading' v-if='loading'><i class='el-icon-loading'></i>正在加载</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import searchBox from 'components/searchBox'
import sellerFilter from 'components/sellerFilter'
import shopCard from 'components/shopCard'
import { _getShopList } from 'common/javascript/userApi'

export default {
  data () {
    return {
      pageNum: 1,
      totalPage: 1,
      loading: false,
      name: '',  // 搜索的关键字
      shopType: 1   // 商铺类型
    }
  },
  components: {
    searchBox,
    sellerFilter,
    shopCard
  },
  created () {
    this.getList()
    window.onscroll = () => {
      if (!this.loading && this.__getScrollHeight() <= (this.__getWindowHeight() + window.scrollY + 100)) {
        if (this.pageNum < this.totalPage) {
          this.loading = true
          this.pageNum++
          this.getList()
        }
      }
    }
  },
  beforeDestroy () {
    window.onscroll = null
    this.clearShopList()   // 情况shopList防止再次返回时数据重复，如果不存store就不用这样
  },
  computed: {
    ...mapGetters('user', [
      'exactAddress',
      'shopList',
      'shopTypeList'
    ])
  },
  // beforeRouteUpdate (to, from, next) {
  //   this.getList()
  // },
  watch: {
    $route () {
      if (this.$router.currentRoute.name === 'place') {
        this.getList()
      }
    }
  },
  methods: {
    getList () {
      this.loading = true
      const name = this.$router.currentRoute.query.name  // 搜索的关键字
      const longitude = this.exactAddress.location.lng
      const latitude = this.exactAddress.location.lat
      const pageNum = this.pageNum
      const shopType = this.shopType
      _getShopList(longitude, latitude, pageNum, shopType, name).then(res => {
        this.pageNum = res.data.pageNum
        this.totalPage = res.data.totalPage
        setTimeout(() => {
          this.loading = false   // 防止滚动到底部同时出现多个请求
        }, 50)
        const list = this.shopList.concat(res.data.shopBrieflys)
        this.setShopList(list) // 这里在strict模式会提示不是通过mutations设置state的，不知为何
      })
    },
    selectShop (item) {
      this.$router.push(`/shop/${item.shopId}`)
    },
    filterSelect (code) {
      this.pageNum = 1
      this.shopType = code
      this.name = ''
      this.clearShopList()
      this.$router.push({path: '/place', query: {shopType: code, name: undefined, pageNum: undefined}})
    },
    search (str) {
      this.name = str
      this.pageNum = 1
      this.shopType = 1
      this.clearShopList()
      this.$router.push({path: '/place', query: {shopType: undefined, name: this.name, pageNum: undefined}})
    },
    changeAddress () {
      this.clearExactAddress()
      this.$router.push('/home')
    },
    __getScrollHeight () {
      let scrollHeight
      let bodyScrollHeight
      let documentScrollHeight
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight
      }
      scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
      return scrollHeight
    },
    __getWindowHeight () {
      var windowHeight = 0
      if (document.compatMode === 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight
      } else {
        windowHeight = document.body.clientHeight
      }
      return windowHeight
    },
    ...mapActions('user', [
      'clearExactAddress'
    ]),
    ...mapMutations({
      setShopList: 'user/SET_SHOP_LIST',
      clearShopList: 'user/CLEAR_SHOP_LIST'
    })
  }
}
</script>

<style scoped lang='sass'>
.container
  min-width: 1050px
  .header
    margin: 10px 0
    .address
      float: left
      .changeAddress
        cursor: pointer
        &:hover
          color: #1e89e0
    .search
      float: right
  .filter
    border: 1px solid #eee
    padding: 15px
  .content
    min-height: 500px
    border: 1px solid #eee
    margin-top: 20px
    background: #fff
    .shopCard
      float: left
      width: 25%
    .loading
      margin: 20px auto
      text-align: center
</style>
