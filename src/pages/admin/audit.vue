<template>
  <div class="user">
    <!-- <div class="header">
      <el-select v-model="filter" placeholder="筛选">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <search-box class='searchBox' @search='search'></search-box>
    </div> -->
    <div class="content">
      <el-table
        :data="applyList"
        style="width: 100%">
        <el-table-column
          align='center'
          prop="shopApplyId"
          label="商铺申请id"
          width="180">
        </el-table-column>
        <el-table-column
          align='center'
          prop="shopName"
          label="商铺名称"
          width="180">
        </el-table-column>
        <el-table-column
          align='center'
          prop="userId"
          label="用户id"
          width="180">
        </el-table-column>
        <el-table-column
          align='center'
          width="180"
          prop="shopLocation"
          label="地址">
        </el-table-column>
        <el-table-column
          align='center'
          prop="identificationNum"
          label="用户身份证"
          width="180">
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
    <el-pagination
      layout="prev, pager, next"
      @current-change='changePage'
      :page-count='pages'>
    </el-pagination>
    <admin-audit-detail-card @reject='_reject' @submit='_submit' class='detailCard' :visible='detailVisible' @close='closeDetail' :info='detailInfo'></admin-audit-detail-card>
  </div>
</template>
<script>
  import searchBox from 'components/searchBox'
  import adminAuditDetailCard from 'components/adminAudiDetailCard'
  import { _getApplyList, _getApplyInfoById, _auditApply } from 'common/javascript/adminApi'
  export default {
    components: {
      searchBox,
      adminAuditDetailCard
    },
    data () {
      return {
        filter: '',
        detailVisible: false,
        pageNum: 1,
        pages: 2,  // 总页数
        // options: [
        //   {
        //     label: '用户id',
        //     value: 'id'
        //   },
        //   {
        //     label: '用户名',
        //     value: 'name'
        //   },
        //   {
        //     label: '手机号',
        //     value: 'phone'
        //   }
        // ],
        applyList: [],
        detailInfo: {}
      }
    },
    created () {
      this.getApplyList()
    },
    methods: {
      getApplyList () {
        const { pageNum } = this
        _getApplyList(pageNum).then(res => {
          this.applyList = res.data.list
          this.pageNum = res.data.pageNum
          this.pages = res.data.pages
        })
      },
      reject (item) {
        this.$confirm('是否审核不通过?', '提示', {
          confirmButtonText: '不通过',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this._reject(item)
        }).catch(() => {
          console.log('取消不通过操作')
        })
      },
      submit (item) {
        this.$confirm('是否审核通过?', '提示', {
          confirmButtonText: '通过',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this._submit(item)
        }).catch(() => {
          console.log('取消通过操作')
        })
      },
      _submit (item) {
        const { shopApplyId } = item
        // 1表示通过，2表示不通过
        const result = 1
        _auditApply(shopApplyId, result).then(res => {
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '已审核通过'
            })
          } else {
            this.$message({
              type: 'error',
              message: '操作失败'
            })
          }
          this.getApplyList()
        })
        this.closeDetail()
      },
      _reject (item) {
        const { shopApplyId } = item
        const result = 2
        _auditApply(shopApplyId, result).then(res => {
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '已审核为不通过'
            })
          } else {
            this.$message({
              type: 'error',
              message: '操作失败'
            })
          }
          this.getApplyList()
        })
        this.closeDetail()
      },
      closeDetail () {
        this.detailVisible = false
      },
      changePage (page) {
        this.pageNum = page
        this.getApplyList()
      },
      handleShow (item) {
        const { shopApplyId } = item
        _getApplyInfoById(shopApplyId).then(res => {
          this.detailInfo = res.data
          this.detailVisible = true
        })
      }
      // search (keyword) {
      //   alert(`搜索${keyword},分类，${this.filter}`)
      // }
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
