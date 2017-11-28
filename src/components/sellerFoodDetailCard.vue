<template>
  <el-dialog :visible.sync='visible' width='70%' :before-close='close'>
      <img width='360' height='360' :src="img && img.replace('100x100','360x360')">
      <div class='message'>
        <p>菜名：<input class='number' type="text" disabled v-model='name'></p>
        <p>描述：<textarea v-model='abstract' cols="30" rows="10"></textarea></p>
        <p>价格：<input class='number' type="number" v-model='price'></p>
        <input class='btn' type="button" value='确认修改' @click='check'>
      </div>
  </el-dialog>
</template>
<script>

export default {
  data () {
    return {
      img: '',
      name: '',
      abstract: '',
      price: '',
      status: ''
    }
  },
  watch: {
    info (newInfo) {
      this.img = newInfo.img
      this.name = newInfo.name
      this.abstract = newInfo.abstract
      this.price = newInfo.price
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
    check () {
      const obj = {
        img: this.img,
        name: this.name,
        abstract: this.abstract,
        price: this.price,
        id: this.id
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
