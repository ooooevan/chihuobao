<template>
  <div class="user">
    <div class="header">
      <el-select v-model="property" placeholder="筛选">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <search-box class='searchBox' @search='search'></search-box>
    </div>
    <div class="content">
      <el-table
        :data="infoData"
        style="width: 100%">
        <el-table-column
          prop="userId"
          label="用户id"
          width="230">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width='180'>
        </el-table-column>
        <el-table-column
          prop="introduction"
          label="简介"
          width='180'>
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          width='180'>
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      layout="prev, pager, next"
      @current-change='changePage'
      :page-count='pages'>
    </el-pagination>
  </div>
</template>
<script>
  import searchBox from 'components/searchBox'
  import { _getUserList } from 'common/javascript/adminApi'
  export default {
    components: {
      searchBox
    },
    created () {
      this.getUserList()
    },
    data () {
      return {
        property: '',
        pageNum: 1,
        pages: 1,
        keyword: '',
        options: [
          {
            label: '用户id',
            value: 'userId'
          },
          {
            label: '用户名',
            value: 'userName'
          },
          {
            label: '手机号',
            value: 'phone'
          }
        ],
        infoData: []
      }
    },
    methods: {
      getUserList () {
        const { pageNum, keyword, property } = this
        _getUserList(pageNum, keyword, property).then(res => {
          this.infoData = res.data.list
          this.pages = res.data.pages
          this.pageNum = res.data.pageNum
        })
      },
      changePage (page) {
        this.pageNum = page
        this.getUserList()
      },
      search (keyword) {
        this.keyword = keyword
        this.pageNum = 1
        this.getUserList()
      }
    }
  }
</script>
<style lang='sass'>
.user
  background: #fff
  height: 100%
  padding: 20px
  box-sizing: border-box
  .searchBox
    display: inline-block
  .el-select
    width: 100px
    vertical-align: top
  .el-select .el-input input
    height: 37px
  .content
    margin: 30px auto
</style>
