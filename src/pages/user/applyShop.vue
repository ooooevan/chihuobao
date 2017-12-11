<template>
  <div class='applyShop'>
    <p class='title'>店铺申请</p>
    <el-form :model="validateForm" ref="validateForm" label-width="100px" class="demo-ruleForm _el-form">
      <el-form-item
        label="店铺名称"
        prop="name"
        :rules="[
          { required: true, message: '名称不能为空'}
        ]"
      >
        <el-input type="name" v-model="validateForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="简介"
        prop="abstract"
        :rules="[
          { required: true, message: '联系人不能为空'}
        ]"
      >
        <el-input type="abstract" v-model="validateForm.abstract" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="身份证"
        prop="cardId"
        :rules="[
          { required: true, message: '身份证不能为空'}
        ]"
      >
        <el-input type="userId" v-model="validateForm.cardId" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="类型"
        prop="type"
        :rules="[
          { required: true, message: '类型不能为空'}
        ]"
      >
        <el-select v-model="validateForm.type" placeholder="请选择商铺类型">
          <el-option :key='item.value' :label='item.label' :value='item.value' v-for='item in types'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item 
        label='地址'
        prop='address'
        :rules="[
          { required: true, message: '地址不能为空'}
        ]">
        <el-input type="address" v-model="validateForm.address" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="logo"
        prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          :action='uploadUrl'
          name='image'
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
        label="身份证照片"
        prop="cardPic">
        <el-upload
          class="avatar-uploader"
          :action='uploadUrl'
          name='image'
          :with-credentials="TRUE"
          :show-file-list="false"
          :drag="true"
          :on-success="cardPicSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="cardPic" :src="cardPic" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="商铺照片"
        prop="imgUrl">
        <el-upload
          class="avatar-uploader"
          :action='uploadUrl'
          name='image'
          :with-credentials="TRUE"
          :show-file-list="false"
          :drag="true"
          :on-success="img1Success"
          :before-upload="beforeAvatarUpload">
          <img v-if="imgUrl" :src="imgUrl" class="avatar">
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
import { _apply, _initCity } from 'common/javascript/userApi'
import ALLAPI from 'common/javascript/apiList'
const API = ALLAPI.user.upload

export default {
  data () {
    return {
      logoUrl: '',
      imgUrl: '',
      cardPic: '',
      TRUE: '',
      uploadUrl: API,
      longitude: '',
      latitude: '',
      validateForm: {
        abstract: '',
        name: '',
        type: [],
        address: '',
        cardId: ''
      }
    }
  },
  computed: {
    ...mapGetters(
      'user',
      [
        'cityOptions',
        'suggestionsList',
        'userInfo',
        'shopTypeList'
      ]
    ),
    types () {
      return this.shopTypeList.map(item => {
        return {
          label: item.shopType,
          value: item.shopTypeCode
        }
      })
    }
  },
  created () {
    this.initCity()  // 用于获取经纬度
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.imgUrl || !this.logoUrl) {
            this.$message({
              type: 'error',
              message: '请上传图片'
            })
            return false
          }
          const { logoUrl, imgUrl, cardPic, longitude, latitude } = this
          const userId = this.userInfo.userId
          const { name, abstract, cardId, type, address } = this.validateForm
          _apply(userId, name, abstract, cardId, type, address, logoUrl, cardPic, imgUrl, longitude, latitude).then(res => {
            if (res.code === 1) {
              this.$message({
                type: 'success',
                message: '已提交申请!'
              })
              // this.$router.push('/place')
            } else {
              this.$message({
                type: 'error',
                message: '操作失败'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    logoSuccess (res, file) {
      // this.logoUrl = URL.createObjectURL(file.raw)
      this.logoUrl = res.data.imageUrl
    },
    img1Success (res, file) {
      // this.imgUrl = URL.createObjectURL(file.raw)
      this.imgUrl = res.data.imageUrl
    },
    cardPicSuccess (res, file) {
      // this.cardPic = URL.createObjectURL(file.raw)
      this.cardPic = res.data.imageUrl
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/gif' // 多允许几个后缀
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!')
      }
      return isJPG && isLt5M
    },
    initCity () {
      _initCity().then(res => {
        this.longitude = res.point.x
        this.latitude = res.point.y
      })
    }
  }
}
</script>

<style lang='sass'>
.applyShop
  background: #fff
  padding-bottom: 20px
  .title
    font-size: 20px
    text-align: center
    font-weight: 600
    padding: 30px
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
