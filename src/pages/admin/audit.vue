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
          align='center'
          prop="shopName"
          label="商铺名称"
          width="180">
        </el-table-column>
        <el-table-column
          align='center'
          prop="userName"
          label="联系人"
          width="130">
        </el-table-column>
        <el-table-column
          align='center'
          width="120"
          prop="shopClass"
          label="商铺分类">
        </el-table-column>
        <el-table-column
          align='center'
          prop="phone"
          label="外卖电话"
          width="180">
        </el-table-column>
        <el-table-column
          align='center'
          width="280"
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          align='center'
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleShow(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" @click='submit(scope.row)' size="small">通过</el-button>
            <el-button type="text" @click='reject(scope.row)' size="small">不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <admin-audit-detail-card @reject='reject' @submit='submit' class='detailCard' :visible='detailVisible' @close='closeDetail' :info='detailInfo'></admin-audit-detail-card>
  </div>
</template>
<script>
  import searchBox from 'components/searchBox'
  import adminAuditDetailCard from 'components/adminAudiDetailCard'

  export default {
    components: {
      searchBox,
      adminAuditDetailCard
    },
    data () {
      return {
        filter: '',
        detailVisible: false,
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
            shopName: '海大面包店',
            userName: '王小虎',
            phone: 1231321321,
            shopClass: '1',
            address: '上海市普陀区金沙江路 1518 弄21',
            logo: 'https://fuss10.elemecdn.com/7/37/3035f05e693d405b214af9941e100jpeg.jpeg?imageMogr2/thumbnail/70x70/format/webp/quality/85',
            img1: 'https://fuss10.elemecdn.com/8/24/3f438bbeee3c1ca016aa86e125722jpeg.jpeg?imageMogr/format/webp/',
            img2: 'https://fuss10.elemecdn.com/c/11/ebb61411f0a8530c653c6bee9c86ajpeg.jpeg?imageMogr/format/webp/'
          },
          {
            shopName: '海浪楼下',
            userName: '王小虎',
            phone: 1231321321,
            shopClass: '2',
            address: '上海市普陀区金沙江路 1518 弄2'
          },
          {
            shopName: '三番',
            userName: '王小虎',
            phone: 1231321321,
            shopClass: '3',
            address: '上海市普陀区金沙江路 1518 弄3'
          },
          {
            shopName: '四饭',
            userName: '王小虎',
            phone: 1231321321,
            shopClass: '5',
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ],
        detailInfo: {}
      }
    },
    methods: {
      reject (item) {
        this.closeDetail()
      },
      submit (item) {
        this.closeDetail()
      },
      closeDetail () {
        this.detailVisible = false
      },
      handleShow (item) {
        this.detailInfo = item
        this.detailVisible = true
      },
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
