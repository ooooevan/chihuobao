<template>
  <div>
    <el-dialog :visible.sync='visible' width='70%' :before-close='close'>
        <img width='360' height='360' :src="info.dish && info.dish.dishImage">
        <div class='message'>
          <p class='name'>{{info.dish && info.dish.dishName}}</p>
          <p class='abstract'>{{info.dish && info.dish.dishAbstract && info.dish.dishAbstract.substr(0,15)}}</p>
          <div class='addTocart clearfix'>
            <span class='money'>￥{{info.dish && info.dish.dishPrice}}</span>
            <div :class='_status' @click='addToCart'>加入购物车</div>
          </div>
          <rate :data='info.dishComment'></rate>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import rate from 'components/simpleRate'

export default {
  components: {
    rate
  },
  props: {
    info: {
      type: Object,
      default: {}
    },
    visible: {
      type: Boolean,
      default: false
    },
    status: {
      type: Number,
      default: 1
    }
  },
  computed: {
    _status () {
      return this.$props.status === 1 ? 'on' : 'off'
    }
  },
  methods: {
    addToCart () {
      if (this._status === 'on') {
        this.$emit('addToCart', this.info.dish)
      }
    },
    close () {
      this.$emit('close')
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
    .addTocart
      margin: 25px auto
      .money
        float: left
      .on, .off
          float: left
          padding: 4px 10px
          margin-left: 70%
          border-radius: 12px
          font-size: 13px
          color: #fff
          cursor: pointer
      .on
        background: #1e89e0
      .off
        background: #c3c3c3
</style>
