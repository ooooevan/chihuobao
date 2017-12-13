<template>
  <div class="info">
    <h1>基本信息</h1>
    <el-form label-position="right" label-width="150px" size='small' :model="info">
      <el-form-item label="名称">
        <el-input v-model="info.shopName" disabled></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="info.shopAbstract"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="info.shopLocation"></el-input>
      </el-form-item>
      <el-form-item label="商标">
        <img :src="info.logo">
      </el-form-item>
      <el-form-item label="公告">
        <el-input v-model="info.shopAnnouncement"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="info.shopPhone"></el-input>
      </el-form-item>
      <el-form-item label="营业时间">
        <el-input v-model="info.shopWorkTime"></el-input>
      </el-form-item>
      <el-form-item label="起送价">
        <el-input v-model="info.shopStartDelivery"></el-input>
      </el-form-item>
      <el-form-item label="配送费">
        <el-input v-model="info.shopDeliveryCost"></el-input>
      </el-form-item>
      <el-form-item label="评价送达时间">
        <el-input v-model="info.deliveryTime" disabled=""></el-input>
      </el-form-item>
      <el-form-item label="评价">
        <el-rate
          disabled
          class='el-rate'
          ref='el-rate'
          v-model='info.level'
          show-score
          text-color='#ff9900'>
        </el-rate>
      </el-form-item>
      <el-form-item label="门面照">
        <el-upload
          class="avatar-uploader"
          :action='uploadUrl'
          name='image'
          :with-credentials="true"
          :show-file-list="false"
          :drag="true"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="info.storesImages" :src="info.storesImages" class="avatar" height='100%'>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商铺照">
        <el-upload
          class="avatar-uploader"
          :action='uploadUrl'
          name='image'
          :with-credentials="true"
          :show-file-list="false"
          :drag="true"
          :on-success="handleAvatarSuccess1"
          :before-upload="beforeAvatarUpload">
          <img v-if="info.detailImages" :src="info.detailImages" class="avatar" height='100%'>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="check">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { _initInfo, _modifyShopInfo } from 'common/javascript/sellerApi'
  import { mapGetters } from 'vuex'
  import ALLAPI from 'common/javascript/apiList'
  const API = ALLAPI.seller.upload

  export default {
    data () {
      return {
        uploadUrl: API,
        info: {
          shopName: '',
          shopId: 1,
          shopAbstract: '',
          shopLocation: '',
          logo: '',
          shopAnnouncement: '',
          shopDeliveryCost: 1,
          shopStartDelivery: 1,
          storesImages: '',
          detailImages: '',
          shopWorkTime: '',
          deliveryTime: '',
          level: 0
        }
      }
    },
    computed: {
      ...mapGetters('seller',
        [
          'sellerInfo'
        ]
      )
    },
    created () {
      this.initInfo()
    },
    methods: {
      initInfo () {
        const shopId = this.sellerInfo.shopId
        _initInfo(shopId).then(res => {
          this.info.shopName = res.data.shopName
          this.info.logo = res.data.logo
          this.info.shopId = res.data.shopId
          this.info.shopAbstract = res.data.shopAbstract
          this.info.shopLocation = res.data.shopLocation
          this.info.shopAnnouncement = res.data.shopAnnouncement
          this.info.shopPhone = res.data.shopPhone
          this.info.shopWorkTime = res.data.shopWorkTime
          this.info.shopDeliveryCost = res.data.shopDeliveryCost
          this.info.shopStartDelivery = res.data.shopStartDelivery
          this.info.storesImages = res.data.storesImages
          this.info.detailImages = res.data.detailImages
          this.info.deliveryTime = res.data.deliveryTime
          this.info.level = res.data.level
        })
      },
      check () {
        this.$confirm('确认修改信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((re) => {
          let { info } = this
          info.shopId = this.sellerInfo.shopId
          _modifyShopInfo(JSON.parse(JSON.stringify(info))).then(res => {
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
      },
      handleAvatarSuccess (res, file) {
        this.info.shopStoresImages = res.data.imageUrl
      },
      handleAvatarSuccess1 (res, file) {
        this.info.shopDetailImages = res.data.imageUrl
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
<style scoped lang='sass'>
.info
  padding: 10px
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
    .el-rate
      transform: translateY(9px)
</style>
