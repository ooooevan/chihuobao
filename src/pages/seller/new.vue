<template>
  <div class="_new">
    <el-form :model="validateForm" ref="validateForm" label-width="100px" class="demo-ruleForm">
      <el-form-item
        label="名称"
        prop="name"
        :rules="[
          { required: true, message: '名称不能为空'}
        ]"
      >
        <el-input type="name" v-model.number="validateForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="价格"
        prop="price"
        :rules="[
          { required: true, message: '价格不能为空'}
        ]"
      >
        <el-input type="price" v-model.number="validateForm.price" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="类型"
        prop="type"
        :rules="[
          { required: true, message: '类型不能为空'}
        ]"
      >
        <el-select v-model="validateForm.type" placeholder="请选择菜品类型">
          <el-option :key='item.value' :label='item.label' :value='item.value' v-for='item in types'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="描述"
        prop="abstract"
        :rules="[
          { required: true, message: '描述不能为空'}
        ]"
      >
        <el-input type="abstract" v-model.number="validateForm.abstract" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="图片"
        prop="imageUrl"
      >
        <el-upload
          class="avatar-uploader"
          :action='uploadUrl'
          name='image'
          :with-credentials="true"
          :show-file-list="false"
          :drag="true"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
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
  import { _addDish } from 'common/javascript/sellerApi'
  import { mapGetters } from 'vuex'
  import ALLAPI from 'common/javascript/apiList'
  const API = ALLAPI.seller.upload

  export default {
    data () {
      return {
        imageUrl: '',
        uploadUrl: API,
        validateForm: {
          price: '',
          abstract: '',
          name: '',
          type: ''
        }
      }
    },
    computed: {
      ...mapGetters('seller',
        [
          'sellerInfo'
        ]
      ),
      ...mapGetters('seller',
        [
          'foodTypeList'
        ]
      ),
      types () {
        return this.foodTypeList.map(item => {
          return {
            label: item.typeDes,
            value: item.foodTypeId
          }
        })
      }
    },
    methods: {
      add () {
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.imageUrl) {
              this.$message({
                type: 'error',
                message: '请上传图片'
              })
              return false
            } else {
              // 上传新品接口
              const imageUrl = this.imageUrl
              const shopId = this.sellerInfo.shopId
              const { name, price, abstract, type } = this.validateForm
              _addDish(shopId, name, price, type, abstract, imageUrl).then(res => {
                if (res.code === 1) {
                  this.$message({
                    type: 'success',
                    message: '添加成功!'
                  })
                  this.$router.push('/seller/menu')
                } else {
                  this.$message({
                    type: 'error',
                    message: '添加失败!'
                  })
                }
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleAvatarSuccess (res, file) {
        // 这里需要修改url
        // this.imageUrl = URL.createObjectURL(file.raw)
        // setTimeout(() => {
        this.imageUrl = res.data.imageUrl
        // }, 2000)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/gif' // 多允许几个后缀
        const isLt5M = file.size / 1024 / 1024 < 5

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!')
        }
        return isJPG && isLt5M
      }
    }
  }
</script>
<style lang='sass'>
  ._new
    box-sizing: border-box
    padding: 20px
    min-height: 500px
    background: #fff
    .el-form
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
      width: 178px
      height: 178px
      line-height: 178px
      text-align: center
    .avatar
      width: 178px
      height: 178px
      display: block

</style>
