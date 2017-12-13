<template>
  <div class="shops">
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
        @expand-change='expandChange'
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                :<span>{{ props.row.shopName }}</span>
              </el-form-item>
              <el-form-item label="店铺id">
                :<span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="用户id">
                :<span>{{ props.row.userId }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                :<span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="简介">
                :<span>{{ props.row.shopAbstract }}</span>
              </el-form-item>
              <el-form-item label="公告">
                :<span>{{ props.row.shopAnnouncement }}</span>
              </el-form-item>
              <el-form-item label="商铺状态">
                :<span>{{ props.row.shopStatus }}</span>
              </el-form-item>
              <el-form-item label="商铺电话">
                :<span>{{ props.row.shopPhone }}</span>
              </el-form-item>
              <el-form-item label="营业时间">
                :<span>{{ props.row.shopWorkTime }}</span>
              </el-form-item>
              <el-form-item label="配送费">
                :<span>{{ props.row.shopDeliveryCost }}</span>
              </el-form-item>
              <el-form-item label="起送价">
                :<span>{{ props.row.shopStartDelivery }}</span>
              </el-form-item>
              <el-form-item label="经度">
                :<span>{{ props.row.shopLongitude }}</span>
              </el-form-item>
              <el-form-item label="纬度">
                :<span>{{ props.row.shopLatitude }}</span>
              </el-form-item>
              <br>
              <el-form-item label="门面照">
                :<span><img :src="props.row.shopStores_images" width='50' height='50'></span>
              </el-form-item>
              <el-form-item label="简介照">
                :<span><img :src="props.row.shopDetail_images" width='50' height='50'></span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="shopId"
          label="商铺id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="shopName"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="shopPhone"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="shopStatus"
          label="商铺状态">
        </el-table-column>
        <el-table-column
          prop="shopLocation"
          label="地址">
        </el-table-column>
         <el-table-column
          align='center'
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click='freeze(scope.row)' size="small">冻结</el-button>
            <el-button type="text" @click='unFreeze(scope.row)' size="small">解冻</el-button>
          </template>
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
  import config from 'common/javascript/config'
  import { _getShopsList, _getShopInfoById, _freeze } from 'common/javascript/adminApi'
  export default {
    components: {
      searchBox
    },
    data () {
      return {
        property: '',
        pageNum: 1,
        pages: 1, // 总页数
        keyword: '',
        options: [
          {
            label: '商铺id',
            value: 'shopId'
          },
          {
            label: '用户id',
            value: 'userId'
          },
          {
            label: '商铺名称',
            value: 'shopName'
          }
        ],
        infoData: []
      }
    },
    created () {
      this.getShopsList()
    },
    methods: {
      getShopsList () {
        const { pageNum, property, keyword } = this
        _getShopsList(pageNum, property, keyword).then(res => {
          this.infoData = res.data.list.map(item => {
            return Object.assign(item, {
              shopStatus: config.shopStatus[item.shopStatus]
            })
          })
          this.pages = res.data.pages
          this.pageNum = res.data.pageNum
        })
      },
      freeze (item) {
        this.$confirm('是否冻结该商铺?', '提示', {
          confirmButtonText: '冻结',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          const type = 'freeze'
          _freeze(item.shopId, type).then(res => {
            if (res.code === 1) {
              this.$message({
                type: 'success',
                message: '已冻结'
              })
            } else {
              this.$message({
                type: 'error',
                message: '冻结失败'
              })
            }
            this.getShopsList()
          })
        }).catch(() => {
          console.log('取消冻结操作')
        })
      },
      unFreeze (item) {
        this.$confirm('是否解冻该商铺?', '提示', {
          confirmButtonText: '解冻',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          const type = 'unfreeze'
          _freeze(item.shopId, type).then(res => {
            if (res.code === 1) {
              this.$message({
                type: 'success',
                message: '已解冻'
              })
            } else {
              this.$message({
                type: 'error',
                message: '解冻失败'
              })
            }
            this.getShopsList()
          })
        }).catch(() => {
          console.log('取消解冻')
        })
      },
      expandChange (row) {
        if (!row.expand) {
          _getShopInfoById(row.shopId).then(res => {
            row = Object.assign(row, res.data)
            row.expand = true
          })
        } else {
          row.expand = false
        }
      },
      changePage (page) {
        this.pageNum = page
        this.getShopsList()
      },
      search (keyword) {
        this.keyword = keyword
        this.pageNum = 1
        this.getShopsList()
      }
    }
  }
</script>
<style lang='sass'>
.shops
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
