<template>
  <div>
    <ul>
      <p class='label'>评价</p>
      <li class='rateLi' v-for='item in ativeData'>
        <div class="clearfix">
          <el-rate
            v-model="item.score"
            disabled>
          </el-rate>
          <span class='rateTime'>{{item.rated_at}}</span>
        </div>
        {{item.rating_text.length > 30 ? `${item.rating_text.slice(0, 30)}...` : item.rating_text}}
      </li>
    </ul>
    <el-pagination
      v-if='isShow'
      @current-change='changePage'
      layout="prev, pager, next"
      :page-size='pageSize'
      :current-page='currentPage'
      :page-count="pageCount">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        pageSize: 7,
        pageCount: Math.ceil(this.data.length / 3), //  默认一页3个
        currentPage: 1,
        isShow: this.data.length > 3
      }
    },
    props: {
      data: {
        type: Array,
        default: {}
      }
    },
    computed: {
      ativeData () {
        return this.data.slice((this.currentPage - 1) * 3, this.currentPage * 3)
      }
    },
    methods: {
      changePage (page) {
        this.currentPage = page
      }
    }
  }
</script>
<style scoped lang='sass'>
  ul
    min-height: 202px
  .label, .rateLi
    border-bottom: 1px dashed #ccc
  .label
    color: black
    font-size: 16px
  .rateLi
    margin: 10px auto
    .el-rate, .rateTime
      float: left

</style>
