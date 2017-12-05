<template>
  <div class="shops">
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
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                :<span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                :<span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                :<span>{{ props.row.address }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="商铺id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="address"
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
      freeze () {
        this.$confirm('是否冻结该商铺?', '提示', {
          confirmButtonText: '冻结',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          // 冻结
        }).catch(() => {
          console.log('取消冻结')
        })
      },
      unFreeze () {
        this.$confirm('是否解冻该商铺?', '提示', {
          confirmButtonText: '解冻',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          // 解冻
        }).catch(() => {
          console.log('取消解冻')
        })
      },
      search (keyword) {
        if (keyword) {
          alert(`搜索${keyword},分类，${this.filter}`)
        }
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
