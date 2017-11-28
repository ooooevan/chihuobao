<template>
  <div>
    <div id="header">
      <div class="header container clearfix">
        <div class="simpleInfo">
          <img src="//fuss10.elemecdn.com/e/5a/3d934467f2db898f0d7afcd42043cpng.png?imageMogr2/thumbnail/95x95/format/webp/quality/85">
          <div class='shopName'>
            <h1>YASO沙拉</h1>
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
            <p>20元</p>
          </div>
          <div class="dispatchCost">
            <h2>配送费</h2>
            <br>
            <p>￥3</p>
          </div>
          <div class="arriveTime">
            <h2>平均送达速度</h2>
            <br>
            <p>24分钟</p>
          </div>
        </div>
      </div>
      <div class="container clearfix shopButtom">
        <div class="shopNav fl">
          <ul>
            <li @click='changeTag(index)' :class='{active: tag === activeTag}' v-for='(tag, index) in shopTag'>{{tag}}</li>
          </ul>
        </div>
        <search-box class='shopSearch fr' @search='search'></search-box>
      </div>
    </div>
    <div id="content" class="container clearfix">
      <div class="main fl" v-if="activeTag === shopTag[0]">
        <seller-filter filterMsg='商品分类' class='filter padding15' :filterList='filterList' @select='filterSelect'></seller-filter>
        <h2 class='padding15'>热销</h2>
        <div class="cardWrapper">
          <food-card status='on' @detail='detail' @addOne='addOne' :info='foodInfo1' class='card'></food-card>
          <food-card status='off' @detail='detail' @addOne='addOne' :info='foodInfo2' class='card'></food-card>
          <food-card status='on' @detail='detail' @addOne='addOne' :info='foodInfo1' class='card'></food-card>
          <food-card status='on' @detail='detail' @addOne='addOne' :info='foodInfo1' class='card'></food-card>
          <food-card status='on' @detail='detail' @addOne='addOne' :info='foodInfo1' class='card'></food-card>
        </div>
        <h2 class='padding15'>快餐</h2>
        <div class="cardWrapper">
          <div class="card padding15">456</div>
        </div>
      </div>
      <div class="main fl" v-else-if="activeTag === shopTag[1]">
        <rate :data='rateData' class='rate padding15'></rate>
      </div>
      <div class="main fl" v-else-if="activeTag === shopTag[2]">
        商家信息
      </div>
      <div class="notice fr padding15">公告</div>
    </div>
    <food-detail-card class='detailCard' :visible='detailVisible' @close='closeDetail' :info='detailInfo'></food-detail-card>
  </div>
</template>
<script>
import searchBox from 'components/searchBox'
import config from 'common/javascript/config'
import sellerFilter from 'components/sellerfilter'
import foodCard from 'components/foodCard'
import foodDetailCard from 'components/foodDetailCard'
import rate from 'components/rate'

export default {
  components: {
    searchBox,
    sellerFilter,
    foodCard,
    foodDetailCard,
    rate
  },
  data () {
    return {
      score: 3,
      filterList: ['热销', '面食', '粉类', '拌面类', '双拼类', '小吃', '水饺', '云吞'],
      foodInfo1: {
        img: 'https://fuss10.elemecdn.com/f/c0/0ffb0941ffd0a9f6de864692c494fjpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
        id: 123123123,
        name: '土豆泥',
        abstract: '一份不管抱，不符你咬我一份不管一份不管抱，不符你咬我一份不管一份不管抱，不符你咬我一份不管',
        score: 4.6,
        perMonth: 312,
        money: 4.9,
        status: 'on'
      },
      foodInfo2: {
        img: 'https://fuss10.elemecdn.com/f/c0/0ffb0941ffd0a9f6de864692c494fjpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
        id: 99999999,
        name: '土豆泥',
        abstract: '一份不管抱，不符你咬我一份不管一份不管抱，不符你咬我一份不管一份不管抱，不符你咬我一份不管',
        score: 4.6,
        perMonth: 312,
        money: 4.9,
        status: 'off'
      },
      rateData: [
        {
          avatar: '',
          image_hash: '',
          is_satisfied: 1,
          rated_at: '2017-11-23 19:06',
          score: 4,
          rating_text: '还行还行还行还行还行还行还行还行还行还行还行还行还行还行还行还行还行还行',
          user_id: 110690325,
          user_name: '匿名用户',
          foodList: [
            {
              foodId: 28319394332,
              foodName: '瘦肉拌刀削面1'
            },
            {
              foodId: 28319394322,
              foodName: '瘦肉拌刀削面2'
            },
            {
              foodId: 28319394321,
              foodName: '瘦肉拌刀削面3'
            }
          ]
        },
        {
          avatar: '',
          image_hash: '',
          is_satisfied: 1,
          rated_at: '2017-11-23 09:24',
          score: 1,
          rating_text: '11',
          user_id: 266094609,
          user_name: '匿名用户'
        },
        {
          avatar: '',
          image_hash: '',
          is_satisfied: 1,
          rated_at: '2017-11-23 09:24',
          score: 2,
          rating_text: '22',
          user_id: 266094609,
          user_name: '匿名用户'
        },
        {
          avatar: '',
          image_hash: '',
          is_satisfied: 1,
          rated_at: '2017-11-23 09:24',
          score: 3,
          rating_text: '33',
          user_id: 266094609,
          user_name: '匿名用户'
        },
        {
          avatar: '',
          image_hash: '',
          is_satisfied: 1,
          rated_at: '2017-11-23 09:24',
          score: 4,
          rating_text: '44',
          user_id: 266094609,
          user_name: '匿名用户'
        }
      ],
      shopTag: config.shopTag,
      activeTag: config.shopTag[0],
      detailVisible: false,
      detailInfo: {}
    }
  },
  watch: {
    score (score) {
      console.log('score变了：' + score)
    }
  },
  created () {
  },
  methods: {
    detail (item) {
      this.detailInfo = item
      this.detailVisible = true
    },
    closeDetail () {
      this.detailVisible = false
    },
    addOne (item) {
      this.$notify({
        title: '添加成功',
        message: `商品：${item.name}`,
        type: 'success',
        customClass: 'notification',
        position: 'bottom-right',
        duration: 3000,
        offset: 200
      })
    },
    filterSelect (item) {
      alert(`选择了：${item}`)
    },
    changeTag (index) {
      this.activeTag = config.shopTag[index]
    },
    search (str) {
      alert(`搜索：${str}`)
    }
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
    width: 400px
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
.detailCard
  min-width: 990px
</style>
