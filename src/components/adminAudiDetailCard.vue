<template>
  <el-dialog :visible.sync='visible' width='70%' :before-close='close'>
    <p>商铺申请审核</p>
      <el-form label-position="right" label-width="150px" :model="info">
        <el-form-item label="商铺名称">
          <el-input v-model="info.shopName" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户id">
          <el-input v-model="info.userId" disabled></el-input>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input v-model="info.identificationNum" disabled></el-input>
        </el-form-item>
        <el-form-item label="身份证照片">
          <img :src="info.identificationPic" width='200'>
        </el-form-item>
        <el-form-item label="外卖电话">
          <el-input v-model="info.phone" disabled></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="info.shopAbstract" disabled></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="info.shopAbstract" disabled></el-input>
        </el-form-item>
        <el-form-item label="商铺logo">
          <img :src="info.shopLogo">
        </el-form-item>
        <el-form-item label="商铺图片">
          <img :src="info.shopAuthImages" height='200'>
          <img :src="info.img2" height='200'>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit('')">审核通过</el-button>
          <el-button @click="reject()">审核不通过</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
</template>
<script>

export default {
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
    submit () {
      this.$emit('submit', this.info)
    },
    reject () {
      this.$emit('reject', this.info)
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style scoped lang='sass'>
.el-dialog
  p
    font-size: 20px
    font-weight: 600
    text-align: center
    margin: 10px auto
  min-width: 990px
  .el-form
    width: 50%
    margin: 0 auto
</style>
