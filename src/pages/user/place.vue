<template>
  <div class='container'>
    <div class="header clearfix">
      <div class="address">
        <span>当前位置：</span>
        <span>{{exactAddress && exactAddress.name}}</span>
        <span @click='changeAddress'>[切换地址]</span>
      </div>
      <search-box class='search' @search='search'></search-box>
    </div>
    <seller-filter class='filter' :filterList='filterList' @select='filterSelect'></seller-filter>
    <div class="content">
      <shop-card :info='item' class='shopCard' @select='selectShop'></shop-card>
      <shop-card :info='item' class='shopCard' @select='selectShop'></shop-card>
      <shop-card :info='item' class='shopCard' @select='selectShop'></shop-card>
      <shop-card :info='item' class='shopCard' @select='selectShop'></shop-card>
      <shop-card :info='item' class='shopCard' @select='selectShop'></shop-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import searchBox from 'components/searchBox'
import sellerFilter from 'components/sellerfilter'
import shopCard from 'components/shopCard'

export default {
  data () {
    return {
      filterList: ['全部商家', '美食', '快餐便当', '特色菜系', '异国料理', '小吃宵夜', '甜品饮品', '果蔬生鲜', '商店超市', '早餐', '午餐', '下午茶', '晚餐'],
      item: {
        name: '小笼包',
        id: 123123123,
        img: 'https://fuss10.elemecdn.com/8/2f/afd2162b4ef788a4259707e35dbffpng.png?imageMogr2/thumbnail/70x70/format/webp/quality/85',
        score: 3.6,
        perMonth: 123,
        duration: 123,
        dispatchCost: 3,
        status: 'on'
      }
    }
  },
  components: {
    searchBox,
    sellerFilter,
    shopCard
  },
  computed: {
    ...mapGetters('user', [
      'exactAddress'
    ])
  },
  methods: {
    selectShop (item) {
      alert(`要进入店铺：${item.name}`)
    },
    filterSelect (item) {
      alert(`选择：${item}`)
    },
    search (str) {
      alert(`搜索：${str}`)
    },
    changeAddress () {
      this.clearExactAddress()
      this.$router.push('/home')
    },
    ...mapActions('user', [
      'clearExactAddress'
    ])
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
</style>
