<template>
  <div class="profile">
    <h1>基本信息</h1>
    <el-form label-position="right" label-width="150px" size='small' :model="info">
      <el-form-item label="用户名">
        <el-input v-model="info.userName"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="info.gender" placeholder="请选择性别">
          <el-option :key='item.value' :label='item.label' :value='item.value' v-for='item in types'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="info.introduction"></el-input>
      </el-form-item>
      <el-form-item label="收货地址">
        <el-cascader
          v-if='!info.acceptAddress'
          class='address'
          :options="cityOptions"
          change-on-select
          v-model='address'
        ></el-cascader>
        <el-input class='acceptAddress' v-model="info.acceptAddress"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action='uploadUrl'
          name='image'
          :with-credentials="TRUE"
          :show-file-list="false"
          :drag="TRUE"
          :on-success="cardPicSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="info.avator" :src="info.avator" class="avatar" width='100'>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="info.phone" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="check">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { _initInfo, _modifyInfo } from 'common/javascript/userApi'
  import { mapGetters } from 'vuex'
  import ALLAPI from 'common/javascript/apiList'
  const API = ALLAPI.user.upload
  export default {
    data () {
      return {
        info: {
          userName: '',
          avator: '',
          gender: '',
          introduction: '',
          phone: '',
          acceptAddress: ''
        },
        uploadUrl: API,
        TRUE: true,
        address: [],
        types: [
          {
            label: '男',
            value: 1
          },
          {
            label: '女',
            value: 0
          }
        ]
      }
    },
    computed: {
      ...mapGetters('user',
        [
          'userInfo',
          'cityOptions'
        ]
      )
    },
    created () {
      this.initInfo()
    },
    methods: {
      cardPicSuccess (res, file) {
        // this.info.avator = URL.createObjectURL(file.raw)
        this.info.avator = res.data.imageUrl
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
      initInfo () {
        const userId = this.userInfo.userId
        _initInfo(userId).then(res => {
          this.info.userName = res.data.userName
          this.info.avator = res.data.avator
          this.info.gender = res.data.gender
          this.info.acceptAddress = res.data.acceptAddress
          this.info.introduction = res.data.introduction
          this.info.phone = res.data.phone
        })
      },
      check () {
        this.$confirm('确认修改信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((re) => {
          let { info, address } = this
          info.userId = this.userInfo.userId
          info.acceptAddress = `${address.join('')}${info.acceptAddress}`
          // 用json转是为了去掉undefined值的键
          _modifyInfo(JSON.parse(JSON.stringify(info))).then(res => {
            if (res.code === 1) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              this.initInfo()
            } else {
              this.$message({
                type: 'error',
                message: '修改失败!'
              })
            }
          })
        }).catch(() => {
          console.log('取消修改信息')
        })
      }
    }
  }
</script>
<style lang='sass'>
  .profile
    padding: 10px
    height: 100%
    box-sizing: border-box
    background: #fff
    h1
      font-size: 17px
      font-weight: 600
      margin: 20px
      text-align: center
    .el-form
      width: 50%
      margin: 0 auto
    .avatar-uploader
      .el-upload-dragger
        width: 100px
        height: 100px
    .acceptAddress, .address
      display: inline-block
    .acceptAddress
      width: 65%
    .address
      width: 30%
</style>
