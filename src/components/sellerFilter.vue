<template>
  <div class="filter">
    <div class="label">{{filterMsg}}：</div>
    <ul v-if='filterList.length'>
      <li :key='item.shopTypeCode' :class='{active: activeTag === item.shopTypeCode}' @click='select(item.shopTypeCode)' v-for='item in filterList'>{{item.shopType}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeTag: 1
      }
    },
    props: {
      filterList: {
        type: Array,
        default: []
      },
      filterMsg: {
        type: String,
        default: '商家分类'
      }
    },
    methods: {
      select (code) {
        this.$emit('select', code)
        this.activeTag = code
      }
    }
  }
</script>
<style lang='sass' scoped>
  .filter
    display: flex
    background: #fff
    .label
      flex: 0 0 100px
      padding: 5px
    ul
      flex: 1
      display: flex
      flex-wrap: wrap
      li
        padding: 5px 10px
        margin: auto 5px
        line-height: 20px
        font-size: 15px
        transition: all .1s
        &:hover
          background: #eee
          cursor: pointer
          border-radius: 3px
        &.active
          background: #dedede
</style>
