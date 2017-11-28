<template>
  <div class="shopClass">
    <div class="seller">
      <h1>商家分类</h1>
      <el-tag
        :key="tag"
        v-for="tag in sellerTags"
        closable
        :disable-transitions="false"
        @close="sellerClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="sellerVisible"
        v-model="sellerTag"
        ref="sellerTags"
        size="small"
        @keyup.enter.native="sellerConfirm"
        @blur="sellerConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="sellerClick">+ 新分类</el-button>
    </div>
    <div class="food">
      <h1>商品分类</h1>
      <el-tag
        :key="tag"
        v-for="tag in foodTags"
        closable
        :disable-transitions="false"
        @close="foodClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="foodVisible"
        v-model="foodTag"
        ref="foodTags"
        size="small"
        @keyup.enter.native="foodConfirm"
        @blur="foodConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="foodClick">+ 新分类</el-button>
    
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      sellerTags: ['标签一', '标签二', '标签三'],
      foodTags: ['早餐', '午餐', '晚餐'],
      sellerVisible: false,
      foodVisible: false,
      sellerTag: '',
      inputValue: '',
      foodTag: ''
    }
  },
  methods: {
    sellerClick () {
      this.sellerVisible = true
      this.$nextTick(_ => {
        this.$refs.sellerTags.$refs.input.focus()
      })
    },
    sellerClose (tag) {
      this.sellerTags.splice(this.sellerTags.indexOf(tag), 1)
    },
    foodClose (tag) {
      this.foodTags.splice(this.sellerTags.indexOf(tag), 1)
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
        this.sellerTags.push(sellerTag)
      }
      this.sellerVisible = false
      this.sellerTag = ''
    },
    foodConfirm () {
      let foodTag = this.foodTag
      if (foodTag) {
        this.foodTags.push(foodTag)
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
