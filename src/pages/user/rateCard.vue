<template>
  <el-dialog :visible.sync='visible' width='50%' :before-close='close'>
    <h1>评价菜品</h1>
    <div>
      <card-item :key='item.dishId' v-for='item in info' :data.sync='item'></card-item>
      <input type='submit' value='提交' @click='commend' class='submit'></input>
    </div>
  </el-dialog>
</template>
<script>
import cardItem from 'components/rateCardItem'
import { _rate } from 'common/javascript/userApi'
export default {
  components: {
    cardItem
  },
  data () {
    return {
      dishId: 0
    }
  },
  watch: {
    info (newInfo) {
      this.dishId = newInfo.dishId
    }
  },
  props: {
    info: {
      type: Array,
      default: []
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async commend () {
      const promises = await this.info.map(item => {
        const { dishId, level, commend, userId, userOrderId, shopId } = item
        return _rate(dishId, level, commend, userId, userOrderId, shopId)
      })
      await Promise.all(promises).then(res => {
        this.$message({
          type: 'success',
          message: '评论成功'
        })
        this.close()
      }).catch(err => {
        this.$message({
          type: 'error',
          message: '操作失败'
        })
        console.log(err)
      })
      this.$emit('haveRated')
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style scoped lang='sass'>
.el-dialog
  h1
    text-align: center
    font-size: 20px
  .submit
    background: #409eff
    padding: 7px 15px
    color: #fff
    border-radius: 3px
</style>
