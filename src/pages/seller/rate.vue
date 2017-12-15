<template>
  <div class="rate" ref='rate'>
    <ul>
      <li :key='item.commentId' v-for='item in rateList'>
        <div class='name' :title='item.userName'>{{item.userName.slice(0, 2) + '**' + item.userName.substr(-2)}}</div>
        <div class='comment'>
          <div class="clearfix">
            <p class='fl dishName'>{{item.dishName}}</p>
            <p class='fr date'>{{$moment(item.commentDate).format('YYYY-MM-DD HH:mm:ss')}}</p>
            <el-rate
              disabled
              ref='el-rate'
              class='el-rate'
              v-model='item.level'
              show-text
              text-color='#ff9900'>
            </el-rate>
          </div>
          <p class='content'>{{item.comment}}</p>
        </div>
      </li>
    </ul>
    <el-pagination
      layout="prev, pager, next"
      :page-size='pageSize'
      @current-change='changePage'
      :page-count="totalPage">
    </el-pagination>
  </div>
</template>
<script>
  import { _getRateList } from 'common/javascript/sellerApi'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        pageNum: 1,
        totalPage: 1,
        pageSize: 9,
        loading: false,
        rateList: []
      }
    },
    computed: {
      ...mapGetters('seller',
        [
          'sellerInfo'
        ]
      )
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        this.loading = true
        const { pageNum } = this
        const shopId = this.sellerInfo.shopId
        _getRateList(shopId, pageNum).then(res => {
          this.pageNum = res.data.pageNum
          this.totalPage = res.data.totalPage
          setTimeout(() => {
            this.loading = false   // 防止滚动到底部同时出现多个请求
          }, 1000)
           // 这里在strict模式会提示不是通过mutations设置state的，不知为何
          this.rateList = res.data.dishComment
        })
      },
      changePage (page) {
        this.pageNum = page
        this.getList()
      }
    }
  }
</script>
<style lang='sass' scoped>
  .rate
    background: #fff
    min-height: 100%
    ul
      li
        padding: 25px 28px
        .name,.comment
          display: inline-block
        .name
          vertical-align: top
          width: 10%
        .comment
          width: 50%
          padding-left: 20px
          .dishName
            margin-right: 10px
          .content
            margin-top: 5px
            color: #969696
          .date
            font-size: 15px
      .el-rate
        transform: translateY(-3px)
    
</style>
