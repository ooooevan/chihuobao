<template>
  <div class="shopClass">
    <div class="seller">
      <h1>商家分类</h1>
      <el-tag
        :key="tag.shopTypeId"
        v-for="tag in sellerTags"
        closable
        :disable-transitions="false"
        @close="sellerClose(tag)">
        {{tag.typeDes}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="sellerVisible"
        v-model="sellerTag"
        ref="sellerTags"
        size="small"
        @keyup.enter.native="sellerConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="sellerClick">+ 新分类</el-button>
    </div>
    <div class="food">
      <h1>商品分类</h1>
      <el-tag
        :key="tag.foodTypeId"
        v-for="tag in foodTags"
        closable
        :disable-transitions="false"
        @close="foodClose(tag)">
        {{tag.typeDes}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="foodVisible"
        v-model="foodTag"
        ref="foodTags"
        size="small"
        @keyup.enter.native="foodConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="foodClick">+ 新分类</el-button>
    
    </div>
  </div>
</template>
<script>
import { _getShopTypeList, _getFoodTypeList, _addFoodType, _addShopType, _delFoodTags, _delShopTags } from 'common/javascript/adminApi'
export default {
  data () {
    return {
      sellerTags: [],
      foodTags: [],
      sellerVisible: false,
      foodVisible: false,
      sellerTag: '',
      inputValue: '',
      foodTag: ''
    }
  },
  created () {
    this.getShopTypeList()
    this.getFoodTypeList()
  },
  methods: {
    getShopTypeList () {
      _getShopTypeList().then(res => {
        this.sellerTags = res.data.list
      })
    },
    getFoodTypeList () {
      _getFoodTypeList().then(res => {
        this.foodTags = res.data.list
      })
    },
    sellerClick () {
      this.sellerVisible = true
      this.$nextTick(_ => {
        this.$refs.sellerTags.$refs.input.focus()
      })
    },
    sellerClose (tag) {
      this.$confirm('是否删除分类?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        _delShopTags(tag.shopTypeId).then(res => {
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '已删除'
            })
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
          this.getShopTypeList()
        })
      }).catch(() => {
        console.log('取消删除操作')
      })
    },
    foodClose (tag) {
      this.$confirm('是否删除分类?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        _delFoodTags(tag.foodTypeId).then(res => {
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '已删除'
            })
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
          this.getFoodTypeList()
        })
      }).catch(() => {
        console.log('取消删除操作')
      })
    },
    foodClick () {
      this.foodVisible = true
      this.$nextTick(_ => {
        this.$refs.foodTags.$refs.input.focus()
      })
    },
    sellerConfirm () {
      let sellerTag = this.sellerTag
      if (sellerTag) {
        this.$confirm('是否添加分类?', '提示', {
          confirmButtonText: '添加',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          _addShopType(sellerTag).then(res => {
            if (res.code === 1) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: '添加失败'
              })
            }
            this.getShopTypeList()
          })
        }).catch(() => {
          console.log('取消添加操作')
        })
      }
      this.sellerVisible = false
      this.sellerTag = ''
    },
    foodConfirm () {
      let foodTag = this.foodTag
      if (foodTag) {
        this.$confirm('是否添加分类?', '提示', {
          confirmButtonText: '添加',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          _addFoodType(foodTag).then(res => {
            if (res.code === 1) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: '添加失败'
              })
            }
            this.getFoodTypeList()
          })
        }).catch(() => {
          console.log('取消添加操作')
        })
      }
      this.foodVisible = false
      this.foodTag = ''
    }
  }
}
</script>
<style lang='sass'>
.shopClass
  background: #fff
  height: 100%
  padding: 20px
  box-sizing: border-box
  .el-tag + .el-tag
    margin-left: 10px
  .button-new-tag
    margin-left: 10px
    height: 32px
    line-height: 30px
    padding-top: 0
    padding-bottom: 0
  .input-new-tag 
    width: 90px
    margin-left: 10px
    vertical-align: bottom
  .seller
    min-height: 300px
  h1
    font-size: 20px
    font-weight: 600
    margin-bottom: 20px
</style>
