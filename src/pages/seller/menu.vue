<template>
  <div class="menu">
    <div class="header">
      <search-box class='search-box' @search='search'></search-box>
      分类：<el-select v-model="value" placeholder="请选择" ref='elSelect'>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="content clearfix">
      <seller-food-card :key='index' v-for='(item, index) in info'  :info='item' class='card' @click='showDetail(item)'></seller-food-card>
    </div>
    <seller-food-detail-card class='detailCard' @check='check' :visible='detailVisible' @close='closeDetail' :info='detailInfo'></seller-food-detail-card>
  </div>
</template>
<script>
  import SearchBox from 'components/searchBox'
  import sellerFoodCard from 'components/sellerFoodCard'
  import sellerFoodDetailCard from 'components/sellerFoodDetailCard'

export default{
    data () {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        info: [{
          name: '咖喱饭',
          id: 123123123,
          img: 'https://fuss10.elemecdn.com/8/77/41eb9ee1123516297dfcf2c09a2f1jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
          score: 3.6,
          perMonth: 123,
          duration: 123,
          dispatchCost: 3,
          abstract: '这是描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
          price: 19,
          status: 'on'
        },
        {
          name: '咖喱饭',
          id: 123123123,
          img: 'https://fuss10.elemecdn.com/8/77/41eb9ee1123516297dfcf2c09a2f1jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
          score: 3.6,
          perMonth: 123,
          duration: 123,
          dispatchCost: 3,
          status: 'on'
        },
        {
          name: '咖喱饭',
          id: 123123123,
          img: 'https://fuss10.elemecdn.com/8/77/41eb9ee1123516297dfcf2c09a2f1jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
          score: 3.6,
          perMonth: 123,
          duration: 123,
          dispatchCost: 3,
          status: 'on'
        },
        {
          name: '咖喱饭',
          id: 123123123,
          img: 'https://fuss10.elemecdn.com/8/77/41eb9ee1123516297dfcf2c09a2f1jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
          score: 3.6,
          perMonth: 123,
          duration: 123,
          dispatchCost: 3,
          status: 'on'
        },
        {
          name: '咖喱饭',
          id: 123123123,
          img: 'https://fuss10.elemecdn.com/8/77/41eb9ee1123516297dfcf2c09a2f1jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85',
          score: 3.6,
          perMonth: 123,
          duration: 123,
          dispatchCost: 3,
          status: 'on'
        }],
        detailInfo: {},
        detailVisible: false
      }
    },
    components: {
      SearchBox,
      sellerFoodCard,
      sellerFoodDetailCard
    },
    mounted () {
      this.$refs.elSelect.$el.getElementsByTagName('input')[0].style.height = '37px'
    },
    methods: {
      check (obj) {
        alert(`要修改为：${JSON.stringify(obj)}`)
      },
      search () {
        alert()
      },
      showDetail (item) {
        this.detailInfo = item
        this.detailVisible = true
      },
      closeDetail () {
        this.detailVisible = false
      }
    }
  }
</script>
<style scoped lang='sass'>
.menu
  height: 100%
  background: #fff
  .header
    padding: 10px
    .search-box
      display: inline-block
      margin: auto 20px
  .content
    margin: 20px
    .card
      float: left
      width: 20%
</style>
