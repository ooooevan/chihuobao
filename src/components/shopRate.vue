<template>
  <div>
    <ul>
      <li :key='item.rated_at' v-for='item in data' class='outer'>
        <div class="clearfix">
          <div class="name">{{item.user_name}}</div>
          <div class='time'>{{item.rated_at}}</div>
        </div>
        <div class="content">
          <span class='text'>{{item.rating_text}}</span>
          <el-rate
            v-model="item.score"
            disabled
            show-text
            text-color="#ff9900">
          </el-rate>
          <ul>
            <li :key='food.foodName' v-for='food in item.foodList'>{{food.foodName}}</li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    }
  }
</script>
<style scoped lang='sass'>
  .outer
    margin: 20px auto
    padding-bottom: 20px
    box-shadow: 0 1px #eee
    .text
      color: #999
    .name
      float: left
    .time
      float: right
    .content
      ul
        margin: 10px auto
        li
          margin: 5px auto

</style>
