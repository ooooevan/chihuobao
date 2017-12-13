<template>
  <el-dialog :visible.sync='visible' width='70%' :before-close='close'>
      <img width='360' height='360' :src="img">
      <div class='message'>
        <p>菜名：<input class='number' type="text" disabled v-model='name'></p>
        <p>描述：<textarea v-model='abstract' cols="30" rows="10"></textarea></p>
        <p>价格：<input class='number' type="number" v-model='price'></p>
        <p>类型：
          <select name="select" v-model='type'>
            <option :key='item.foodTypeId' :value='item.foodTypeId' v-for='item in foodTypeList'>{{item.typeDes}}</option>
          </select></p>
        <input type="button" value='删除此菜品' @click='del'>
        <input class='btn' type="button" value='修改' @click='check'>
      </div>
  </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      img: '',
      name: '',
      abstract: '',
      price: '',
      status: '',
      type: '',
      dishId: 0
    }
  },
  computed: {
    ...mapGetters('seller',
      [
        'foodTypeList'
      ]
    )
  },
  watch: {
    info (newInfo) {
      this.img = newInfo.dishImage
      this.name = newInfo.dishName
      this.abstract = newInfo.dishAbstract
      this.price = newInfo.dishPrice
      this.type = newInfo.dishType
      this.dishId = newInfo.dishId
    }
  },
  props: {
    info: {
      type: Object,
      default: {}
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    del () {
      this.$confirm('确认删除菜品吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('delete', this.info)
      }).catch(() => {
        console.log(`取消删除`)
      })
    },
    check () {
      const obj = {
        dishName: this.name,
        dishAbstract: this.abstract,
        dishType: this.type,
        dishPrice: this.price,
        dishId: this.dishId
      }
      this.$emit('check', obj)
    }
  }
}
</script>
<style scoped lang='sass'>
.el-dialog
  min-width: 990px
  img
    display: inline-block
    margin-right: 30px
  .message
    width: 500px
    display: inline-block
    vertical-align: top
    .name
      font-size: 22px
      color: #333
      margin-bottom: 10px
    .abstract
      color: #aaa
    .number
      border: 1px solid rgb(169, 169, 169)
    .btn
      padding: 10px
      border-radius: 3px
      background: #49a2ff
      color: #fff
      outline: none
      cursor: pointer
      &:hover
        background: #409eff
</style>
