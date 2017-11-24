<template>
  <div class="order">
    <div class="header">
      <ul>
        <li @click='changeTag(index)' :class='{active: tag === activeTag}' v-for='(tag, index) in orderTag'>{{tag}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
  import config from 'common/javascript/config'
// https://www.ele.me/restapi/shopping/restaurants?extras[]=activities&geohash=w7y2mfr4g2x&latitude=21.15053&limit=24&longitude=110.30151&offset=0&terminal=web

  export default {
    data () {
      return {
        orderTag: config.orderTag,
        activeTag: config.orderTag[0]
      }
    },
    methods: {
      changeTag (index) {
        this.activeTag = config.orderTag[index]
      }
    }
  }
</script>
<style scoped lang='sass'>
  .order
    .header
      background: #fff
      ul
        display: flex
        width: 50%
        li
          flex: 1
          line-height: 50px
          text-align: center
          transition: all .1s
          cursor: pointer
          &.active
            box-shadow: 0px -2px #1e89e0 inset
            color: #1e89e0

</style>
