<template>
  <div>
    <p class='title'>店铺申请</p>
    <el-form :model="validateForm" ref="validateForm" label-width="100px" class="demo-ruleForm _el-form">
      <el-form-item
        label="店铺名称"
        prop="name"
      >
        <el-input type="name" v-model.number="validateForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="外卖电话"
        prop="phone"
      >
        <el-input type="phone" v-model.number="validateForm.phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="联系人"
        prop="userName"
      >
        <el-input type="userName" v-model.number="validateForm.userName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="商铺分类" prop="type">
        <el-checkbox-group v-model="validateForm.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label='地址'>
        <el-input
          placeholder='详细地址'
          ref='input'
          auto-complete="false"
          v-model='validateForm.address1'
          class='input-with-cascader'
          valueKey='name'
          popper-class='popper-class'
          :trigger-on-focus='true'
        ><el-cascader slot='prepend'
            :options='cityOptions'
            v-model='validateForm.address0'
            ref='el-cascader'
          ></el-cascader>
        </el-input>
      </el-form-item>
      <el-form-item
        label="logo"
        prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          name='logo'
          :with-credentials="TRUE"
          :show-file-list="false"
          :drag="true"
          :on-success="logoSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="logoUrl" :src="logoUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="商铺照片1"
        prop="imgUrl1">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          name='img1'
          :with-credentials="TRUE"
          :show-file-list="false"
          :drag="true"
          :on-success="img1Success"
          :before-upload="beforeAvatarUpload">
          <img v-if="imgUrl1" :src="imgUrl1" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="商铺照片2"
        prop="img2">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          name='file'
          :with-credentials="TRUE"
          :show-file-list="false"
          :drag="true"
          :on-success="img2Success"
          :before-upload="beforeAvatarUpload">
          <img v-if="imgUrl2" :src="imgUrl2" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('validateForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      logoUrl: '',
      imgUrl1: '',
      imgUrl2: '',
      TRUE: '',
      validateForm: {
        phone: '',
        userName: '',
        name: '',
        type: [],
        address1: '',
        address0: []
      }
    }
  },
  computed: {
    ...mapGetters(
      'user',
      [
        'cityOptions',
        'suggestionsList'
      ])
  },
  methods: {
    submitForm (form) {
      debugger
    },
    logoSuccess (res, file) {
      // 这里需要修改url
      this.logoUrl = URL.createObjectURL(file.raw)
    },
    img1Success (res, file) {
      // 这里需要修改url
      this.imgUrl1 = URL.createObjectURL(file.raw)
    },
    img2Success (res, file) {
      // 这里需要修改url
      this.imgUrl2 = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/gif' // 多允许几个后缀
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang='sass'>
  .title
    font-size: 20px
    text-align: center
    font-weight: 600
    margin: 30px
  .el-form._el-form
    margin: 30px auto 0
    width: 60%
  .avatar-uploader
    .el-upload
      border: 1px dashed #d9d9d9
      border-radius: 6px
      cursor: pointer
      position: relative
      overflow: hidden
      &:hover
        border-color: #409EFF
  .avatar-uploader-icon
    font-size: 28px
    color: #8c939d
    height: 178px
    line-height: 178px
    text-align: center
  .avatar
    height: 178px
    display: block
  .el-input-group__prepend
    padding: 0
    border: none
    .el-cascader
      width: 150px
</style>
