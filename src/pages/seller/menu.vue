<template>
  <div class="menu">
    <div class="header">
      分类：<el-select v-model="type" placeholder="全部" ref='elSelect'>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="content clearfix">
      <seller-food-card :key='index' v-for='(item, index) in _info'  :info='item' class='card' @click='showDetail(item)'></seller-food-card>
    </div>
    <seller-food-detail-card class='detailCard' @delete='del' @check='check' :visible='detailVisible' @close='closeDetail' :info='detailInfo'></seller-food-detail-card>
  </div>
</template>
<script>
  import sellerFoodCard from 'components/sellerFoodCard'
  import sellerFoodDetailCard from './sellerFoodDetailCard'
  import { _getAllDish, _modifyDish, _deleteDish } from 'common/javascript/sellerApi'
  import { mapGetters } from 'vuex'
  export default{
    data () {
      return {
        type: undefined,
        info: [],
        detailInfo: {},
        detailVisible: false
      }
    },
    components: {
      sellerFoodCard,
      sellerFoodDetailCard
    },
    computed: {
      _info () {
        // 返回对应的类型或者'全部'
        return this.info.filter(item => (item.dishType === this.type || this.type === undefined))
      },
      ...mapGetters('seller',
        [
          'sellerInfo',
          'foodTypeList'
        ]
      ),
      options () {
        return this.foodTypeList.map(item => {
          return {
            label: item.typeDes,
            value: item.foodTypeId
          }
        })
      }
    },
    created () {
      this.getAllDish()
    },
    mounted () {
      this.$refs.elSelect.$el.getElementsByTagName('input')[0].style.height = '37px'
    },
    methods: {
      check (obj) {
        if (obj.dishPrice !== this.detailInfo.dishPrice || obj.dishAbstract !== this.detailInfo.dishAbstract || obj.dishType !== this.detailInfo.dishType) {
          const shopId = this.sellerInfo.shopId
          _modifyDish(shopId, obj.dishId, obj.dishPrice, obj.dishAbstract, obj.dishType).then(res => {
            if (res.code === 1) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              this.closeDetail()
              this.getAllDish()
            } else {
              this.$message({
                type: 'error',
                message: '修改失败!'
              })
            }
          })
        } else {
          this.closeDetail()
        }
      },
      del (obj) {
        const shopId = this.sellerInfo.shopId
        const dishId = obj.dishId
        _deleteDish(shopId, dishId).then(res => {
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.closeDetail()
            this.getAllDish()
          }
        })
      },
      getAllDish () {
        const shopId = this.sellerInfo.shopId
        const dishType = this.type  // 可选，菜品类型
        _getAllDish(shopId, dishType).then(res => {
          this.info = res.data
        })
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
  .content
    margin: 20px
    .card
      float: left
      width: 20%
      min-width: 200px
</style>
