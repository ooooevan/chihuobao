<template>
  <div>
    <div id="header">
      <div class="header container clearfix">
        <div class="simpleInfo">
          <img :src='shopDetail.logo' width='95' height='95'>
          <div class='shopName'>
            <h1>{{shopDetail.shopName}}</h1>
            <br>
            <el-rate
              disabled
              v-model='score'
              show-score
              text-color='#ff9900'>
            </el-rate>
          </div>
        </div>
        <div class="simpleCost">
          <div class="sendCost">
            <h2>起送价</h2>
            <br>
            <p>{{shopDetail.shopStartDelivery}}元</p>
          </div>
          <div class="dispatchCost">
            <h2>配送费</h2>
            <br>
            <p>{{shopDetail.shopDeliveryCost}}元</p>
          </div>
          <div class="arriveTime">
            <h2>平均送达速度</h2>
            <br>
            <p>{{shopDetail.deliveryTime}}分钟</p>
          </div>
        </div>
      </div>
      <div class="container clearfix shopButtom">
        <div class="shopNav fl">
          <ul>
            <li @click='changeTag(index)' :key='index' :class='{active: tag === activeTag}' v-for='(tag, index) in shopTag'>{{tag}}</li>
          </ul>
        </div>
        <search-box class='shopSearch fr' @search='search'></search-box>
      </div>
    </div>
    <div id="content" class="container clearfix">
      <div class="main fl" v-if="activeTag === shopTag[0]">
        <seller-filter filterMsg='商品分类' class='filter padding15' :filterList='filterList' @select='filterSelect'></seller-filter>
        <!-- <h2 class='padding15'>热销</h2> -->
        <div class="cardWrapper">
          <food-card :key='info.dishId' :status='shopDetail.status' @detail='detail' @addOne='addOne' :info='info' v-for='info in currentShopDishs' class='card'></food-card>
        </div>
      </div>
      <!-- <div class="main fl" v-else-if="activeTag === shopTag[1]">
        <rate :data='rateData' class='rate padding15'></rate>
      </div> -->
      <div class="main fl" v-else-if="activeTag === shopTag[1]">
        <img :src='shopDetail.storesImages' style='float:left' alt="门面照" width='50%'>
        <img :src='shopDetail.detailImages' style='float:left' alt="" width='50%'>
      </div>
      <div class="notice fr padding15">
        <p class='header'>公告</p>
        <p class='content'>{{shopDetail.shopAnnouncement}}</p>
        <p class='header'>营业时间</p>
        <p class='content'>{{shopDetail.shopWorkTime}}</p>
        <p class='header'>联系电话</p>
        <p class='content'>{{shopDetail.shopPhone}}</p>
      </div>
    </div>
    <food-detail-card class='detailCard' :status='shopDetail.shopStatus' @addToCart='addOne' :visible='detailVisible' @close='closeDetail' :info='detailInfo'></food-detail-card>
    <shop-cart></shop-cart>
  </div>
</template>
<script>
import searchBox from 'components/searchBox'
import config from 'common/javascript/config'
import { mapMutations, mapGetters, mapActions } from 'vuex'
import { _getInfoByShopId, _getCommentByDishId } from 'common/javascript/userApi'
import sellerFilter from 'components/sellerFilter'
import foodCard from 'components/foodCard'
import foodDetailCard from 'components/foodDetailCard'
import rate from 'components/shopRate'
import shopCart from './shopCart'

export default {
  components: {
    searchBox,
    sellerFilter,
    foodCard,
    foodDetailCard,
    rate,
    shopCart
  },
  data () {
    return {
      score: 0,
      shopId: 0,
      currentShopDishs: [],
      filterList: [
        {
          shopType: '热销',
          shopTypeCode: 1
        },
        {
          shopType: '面食',
          shopTypeCode: 2
        },
        {
          shopType: '粉类',
          shopTypeCode: 3
        },
        {
          shopType: '拌面类',
          shopTypeCode: 4
        },
        {
          shopType: '双拼类',
          shopTypeCode: 5
        }
      ],
      shopTag: config.shopTag,
      activeTag: config.shopTag[0],
      detailVisible: false,
      detailInfo: {},
      rateData: []
    }
  },
  watch: {
    shopDetail (newInfo) {
      this.score = newInfo.level
    },
    shopDishs (newInfo) {
      this.currentShopDishs = newInfo
    }
  },
  created () {
    const shopId = this.shopId = this.$route.params.shopId
    _getInfoByShopId(shopId).then(res => {
      this.setShopDishs(res.data.dishs)
      this.setShopDetail(res.data.shopDetail)
    })
  },
  computed: {
    ...mapGetters('user', [
      'shopDetail',
      'shopDishs'
    ])
  },
  methods: {
    detail (item) {
      this.detailVisible = true
      // 点开菜品详情，加载评论
      _getCommentByDishId(this.shopId, item.dishId).then(res => {
        this.detailInfo = res.data
      })
    },
    closeDetail () {
      this.detailVisible = false
    },
    addOne (item) {
      const { shopId, shopName, shopDeliveryCost } = this.shopDetail
      item.shopId = shopId
      item.shopName = shopName
      item.shopDeliveryCost = shopDeliveryCost
      this.addCartNum(item)
      this.$message({
        type: 'success',
        message: '添加成功'
      })
    },
    filterSelect (code) {
      alert(`选择了：${this.filterList.find(item => (item.shopTypeCode === code)).shopType}`)
    },
    changeTag (index) {
      this.activeTag = config.shopTag[index]
    },
    search (str) {
      this.currentShopDishs = this.shopDishs.filter(item => {
        return item.dishName.indexOf(str) > -1
      })
    },
    ...mapMutations({
      setShopDetail: 'user/SET_SHOP_DETAIL',
      setShopDishs: 'user/SET_SHOP_DISHS'
    }),
    ...mapActions('user',
      [
        'addCartNum'
      ]
    )
  }
}
</script>
<style scoped lang='sass'>
#header
  background: #fff
  .header
    height: 100px
    padding: 10px
    min-width: 1050px
    border-bottom: 1px solid #eee
  .shopButtom
    min-width: 1050px
  .simpleInfo
    float: left
    width: 350px
    img
      vertical-align: middle
      display: inline-block
    .shopName
      vertical-align: middle
      display: inline-block
  .simpleCost
    height: 100px
    width: 350px
    float: right
    display: flex
    justify-content: flex-start
    align-items: center
    .arriveTime, .dispatchCost, .sendCost
      width: 100px
      text-align: center
  .shopNav
    width: 300px
    ul
      display: flex
      li
        flex: 1
        text-align: center
        line-height: 50px
        transition: all .1s
        &.active
          box-shadow: 0px -2px #1e89e0 inset
  .shopSearch
    line-height: 50px
#content
  margin: 20px auto
  min-width: 1050px
  .main
    width: 75%
    min-height: 500px
    box-sizing: border-box
    .rate
    background: #fff
    .cardWrapper
      width: 100%
      background: #fff
      display: flex
      flex-wrap: wrap
      .card
        flex: 0 0 46%
        padding: 15px
        box-shadow: 0 1px #eee
  .notice
    width: 23%
    box-sizing: border-box
    background: #fff
    .header
      margin: 15px auto
    .content
      font-size: 15px
.detailCard
  min-width: 990px
</style>
