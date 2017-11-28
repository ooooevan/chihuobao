<template>
  <div class="user">
    <div class="header">
      <el-select v-model="filter" placeholder="筛选">
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
          prop="id"
          label="用户id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import searchBox from 'components/searchBox'

  export default {
    components: {
      searchBox
    },
    data () {
      return {
        filter: '',
        options: [
          {
            label: '用户id',
            value: 'id'
          },
          {
            label: '用户名',
            value: 'name'
          },
          {
            label: '手机号',
            value: 'phone'
          }
        ],
        infoData: [
          {
            id: '1321321321',
            name: '王小虎',
            phone: 1231321321,
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            id: '1321321321',
            name: '王小虎',
            phone: 1231321321,
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            id: '1321321321',
            name: '王小虎',
            phone: 1231321321,
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            id: '1321321321',
            name: '王小虎',
            phone: 1231321321,
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ]
      }
    },
    methods: {
      search (keyword) {
        alert(`搜索${keyword},分类，${this.filter}`)
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
