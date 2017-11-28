<template>
  <div>
    <el-dialog :visible.sync='visible' width='70%' :before-close='close'>
        <img width='360' height='360' :src="info.img && info.img.replace('100x100','360x360')">
        <div class='message'>
          <p class='name'>{{info.name}}</p>
          <p class='abstract'>{{info.abstract && info.abstract.substr(0,15)}}</p>
          <div class='addTocart clearfix'>
            <span class='money'>￥{{info.money}}</span>
            <div :class='status' @click='addToCart'>加入购物车</div>
          </div>
          <rate :data='data'></rate>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import rate from 'components/simpleRate'

export default {
  data () {
    return {
      data: [
        {
          avatar: '',
          image_hash: '',
          is_satisfied: 1,
          rated_at: '2017-11-23 19:06',
          score: 4,
          rating_text: '还行还行。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。',
          user_id: 110690325,
          user_name: '匿名用户'
        },
        {
          avatar: '',
          image_hash: '',
          is_satisfied: 1,
          rated_at: '2017-11-23 09:24',
          score: 4,
          rating_text: '11',
          user_id: 266094609,
          user_name: '匿名用户'
        },
        {
          avatar: '',
          image_hash: '',
          is_satisfied: 1,
          rated_at: '2017-11-23 09:24',
          score: 4,
          rating_text: '22',
          user_id: 266094609,
          user_name: '匿名用户'
        },
        {
          avatar: '',
          image_hash: '',
          is_satisfied: 1,
          rated_at: '2017-11-23 09:24',
          score: 4,
          rating_text: '33',
          user_id: 266094609,
          user_name: '匿名用户'
        },
        {
          avatar: '',
          image_hash: '',
          is_satisfied: 1,
          rated_at: '2017-11-23 09:24',
          score: 4,
          rating_text: '44',
          user_id: 266094609,
          user_name: '匿名用户'
        },
        {
          avatar: '',
          image_hash: '',
          is_satisfied: 1,
          rated_at: '2017-11-23 09:24',
          score: 4,
          rating_text: '55',
          user_id: 266094609,
          user_name: '匿名用户'
        },
        {
          avatar: '',
          image_hash: '',
          is_satisfied: 1,
          rated_at: '2017-11-23 09:24',
          score: 4,
          rating_text: '66',
          user_id: 266094609,
          user_name: '匿名用户'
        },
        {
          avatar: '',
          image_hash: '',
          is_satisfied: 1,
          rated_at: '2017-11-23 09:24',
          score: 4,
          rating_text: '77',
          user_id: 266094609,
          user_name: '匿名用户'
        },
        {
          avatar: '',
          image_hash: '',
          is_satisfied: 1,
          rated_at: '2017-11-23 09:24',
          score: 4,
          rating_text: '88',
          user_id: 266094609,
          user_name: '匿名用户'
        },
        {
          avatar: '',
          image_hash: '',
          is_satisfied: 1,
          rated_at: '2017-11-23 09:24',
          score: 4,
          rating_text: '99',
          user_id: 266094609,
          user_name: '匿名用户'
        }
      ]
    }
  },
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
    }
  },
  computed: {
    status () {
      return this.info.status
    }
  },
  methods: {
    addToCart () {},
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
